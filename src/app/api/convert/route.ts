import { createClient } from "@/lib/supabase/server";
import { parsePdf } from "@/lib/parser-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const startTime = Date.now();

  // Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  // Get user profile for quota check
  const { data: profile } = await supabase.from("profiles").select("plan, conversions_this_month, conversions_reset_at").eq("id", user.id).single();

  if (!profile) {
    return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  }

  // Reset monthly counter if needed
  const now = new Date();
  if (new Date(profile.conversions_reset_at) <= now) {
    await supabase
      .from("profiles")
      .update({
        conversions_this_month: 0,
        conversions_reset_at: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(),
      })
      .eq("id", user.id);
    profile.conversions_this_month = 0;
  }

  // Quota check for free plan (skipped in demo mode)
  const demoMode = process.env.DEMO_MODE === "true";
  if (!demoMode && profile.plan === "free" && profile.conversions_this_month >= 3) {
    return NextResponse.json(
      { error: "Quota mensuel atteint (3 conversions). Passez au Pro pour des conversions illimitees.", upgrade: true },
      { status: 429 },
    );
  }

  // Extract PDF from form data
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file || file.type !== "application/pdf") {
    return NextResponse.json({ error: "Fichier PDF requis." }, { status: 400 });
  }

  // Size check (10 MB max)
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)." }, { status: 400 });
  }

  try {
    const buffer = new Uint8Array(await file.arrayBuffer());
    const result = await parsePdf(buffer);

    const processingTime = Date.now() - startTime;

    // Increment conversion counter
    await supabase
      .from("profiles")
      .update({ conversions_this_month: profile.conversions_this_month + 1 })
      .eq("id", user.id);

    // Log conversion metadata (NO bank data stored — RGPD)
    await supabase.from("conversion_logs").insert({
      user_id: user.id,
      bank_slug: result.bankSlug,
      page_count: result.pageCount,
      transaction_count: result.transactionCount,
      export_format: "csv",
      processing_time_ms: processingTime,
      source: "web",
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Conversion error:", err);
    const message = err instanceof Error ? err.message : "";
    if (message.includes("unreachable") || message.includes("502") || message.includes("503")) {
      return NextResponse.json(
        { error: "Le service d'analyse est temporairement indisponible. Reessayez dans quelques instants." },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Erreur lors de l'analyse du PDF. Verifiez que le fichier est un releve bancaire valide." },
      { status: 500 },
    );
  }
}
