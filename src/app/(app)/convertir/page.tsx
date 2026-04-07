"use client";

import { UploadZone } from "@/components/conversion/UploadZone";
import { TransactionPreview } from "@/components/conversion/TransactionPreview";
import { ExportOptions } from "@/components/conversion/ExportOptions";
import { createClient } from "@/lib/supabase/client";
import type { ParseResult, Plan } from "@/lib/types";
import { PLANS } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ConvertPage() {
  const [result, setResult] = useState<ParseResult | null>(null);
  const [plan, setPlan] = useState<Plan>("free");
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", data.user.id)
          .single();
        if (profile) setPlan(profile.plan as Plan);
      }
    });
  }, []);

  async function handleFileSelected(file: File) {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de la conversion.");
        if (data.upgrade) {
          setError(data.error + " Passez au Pro pour continuer.");
        }
        return;
      }

      setResult(data);
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  async function handleExport(format: "csv" | "excel" | "ofx") {
    if (!result) return;
    setExporting(true);

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactions: result.transactions,
          bankName: result.bankSlug,
          format,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Erreur lors de l'export.");
        return;
      }

      // Download file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ext = format === "excel" ? "xlsx" : format;
      a.download = `releve-${result.bankSlug}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("Erreur lors du telechargement.");
    } finally {
      setExporting(false);
    }
  }

  const planConfig = PLANS[plan];

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Convertir un releve bancaire</h1>

      <UploadZone onFileSelected={handleFileSelected} loading={loading} />

      {error && (
        <div className="mt-4 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
          {error.includes("Pro") && (
            <a href="/tarifs" className="ml-2 underline font-medium">
              Voir les tarifs
            </a>
          )}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Resultat</h2>
            <span className="text-sm text-gray-500">
              Confiance de detection : {Math.round(result.confidence * 100)}%
            </span>
          </div>

          <TransactionPreview
            result={result}
            maxRows={planConfig.maxPreviewRows}
            showWatermark={planConfig.watermark}
          />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <ExportOptions plan={plan} onExport={handleExport} loading={exporting} />
            <p className="text-xs text-gray-400">
              Votre fichier PDF a ete supprime de nos serveurs immediatement apres l&apos;extraction.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
