import { createClient } from "@/lib/supabase/server";
import { generateCSV } from "@/lib/export/csv";
import { generateExcel } from "@/lib/export/excel";
import { PLANS } from "@/lib/types";
import type { Transaction, Plan } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
  const plan: Plan = (profile?.plan as Plan) || "free";
  const planConfig = PLANS[plan];

  const body = await request.json();
  const { transactions, bankName, format } = body as {
    transactions: Transaction[];
    bankName: string;
    format: "csv" | "excel" | "ofx";
  };

  if (!transactions || !format) {
    return NextResponse.json({ error: "Donnees manquantes." }, { status: 400 });
  }

  // Check format access
  if (!planConfig.formats.includes(format)) {
    return NextResponse.json(
      { error: `Le format ${format.toUpperCase()} necessite le plan Pro ou Cabinet.`, upgrade: true },
      { status: 403 },
    );
  }

  const includeWatermark = planConfig.watermark;

  if (format === "csv") {
    const csv = generateCSV(transactions, includeWatermark);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="releve-${bankName || "export"}.csv"`,
      },
    });
  }

  if (format === "excel") {
    const buffer = await generateExcel(transactions, bankName || "Export", includeWatermark);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="releve-${bankName || "export"}.xlsx"`,
      },
    });
  }

  return NextResponse.json({ error: "Format non supporte." }, { status: 400 });
}
