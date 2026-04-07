import { PARSER_SERVICE_URL } from "@/lib/config";
import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, string> = { frontend: "ok" };

  try {
    const res = await fetch(`${PARSER_SERVICE_URL}/health`, { signal: AbortSignal.timeout(5000) });
    checks.parser = res.ok ? "ok" : `error (${res.status})`;
  } catch {
    checks.parser = "unreachable";
  }

  const allOk = Object.values(checks).every((v) => v === "ok");
  return NextResponse.json({ status: allOk ? "ok" : "degraded", checks }, { status: allOk ? 200 : 503 });
}
