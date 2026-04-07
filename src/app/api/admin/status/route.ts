import { PARSER_SERVICE_URL } from "@/lib/config";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Simple auth: require admin key in header
  const adminKey = request.headers.get("x-admin-key");
  if (!adminKey || adminKey !== process.env.PARSER_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checks: Record<string, unknown> = {};

  // 1. Parser health
  try {
    const start = Date.now();
    const res = await fetch(`${PARSER_SERVICE_URL}/health`, { signal: AbortSignal.timeout(10000) });
    checks.parser = {
      status: res.ok ? "ok" : "error",
      httpStatus: res.status,
      latencyMs: Date.now() - start,
      url: PARSER_SERVICE_URL,
    };
  } catch (err) {
    checks.parser = {
      status: "down",
      error: err instanceof Error ? err.message : "unknown",
      url: PARSER_SERVICE_URL,
    };
  }

  // 2. Supabase health + stats
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    try {
      const supabase = createServerClient(supabaseUrl, serviceKey, {
        cookies: { getAll: () => [], setAll: () => {} },
      });

      // User count
      const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });

      // Conversions today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: conversionsToday } = await supabase
        .from("conversion_logs")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString());

      // Errors today (bank_slug = 'error')
      const { count: errorsToday } = await supabase
        .from("conversion_logs")
        .select("*", { count: "exact", head: true })
        .eq("bank_slug", "error")
        .gte("created_at", today.toISOString());

      // Conversions this month
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const { count: conversionsMonth } = await supabase
        .from("conversion_logs")
        .select("*", { count: "exact", head: true })
        .gte("created_at", monthStart.toISOString());

      // Recent errors (last 10)
      const { data: recentErrors } = await supabase
        .from("conversion_logs")
        .select("created_at, processing_time_ms")
        .eq("bank_slug", "error")
        .order("created_at", { ascending: false })
        .limit(10);

      checks.supabase = { status: "ok" };
      checks.stats = {
        users: userCount,
        conversionsToday,
        errorsToday,
        conversionsMonth,
        errorRate: conversionsToday ? `${Math.round(((errorsToday || 0) / (conversionsToday || 1)) * 100)}%` : "N/A",
        recentErrors,
      };
    } catch (err) {
      checks.supabase = { status: "error", error: err instanceof Error ? err.message : "unknown" };
    }
  } else {
    checks.supabase = { status: "not_configured" };
  }

  // 3. Env vars check
  checks.config = {
    parserUrl: !!PARSER_SERVICE_URL && PARSER_SERVICE_URL !== "http://localhost:8000",
    supabaseUrl: !!supabaseUrl,
    supabaseServiceKey: !!serviceKey,
    stripeKey: !!process.env.STRIPE_SECRET_KEY,
    sentryDsn: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    demoMode: process.env.DEMO_MODE === "true",
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || null,
  };

  const allOk = checks.parser && (checks.parser as { status: string }).status === "ok" &&
    checks.supabase && (checks.supabase as { status: string }).status === "ok";

  return NextResponse.json({
    status: allOk ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    checks,
  });
}
