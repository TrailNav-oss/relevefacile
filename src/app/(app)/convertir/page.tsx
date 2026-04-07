"use client";

import { UploadZone } from "@/components/conversion/UploadZone";
import { TransactionPreview } from "@/components/conversion/TransactionPreview";
import { ExportOptions } from "@/components/conversion/ExportOptions";
import { createClient } from "@/lib/supabase/client";
import type { ParseResult, Plan } from "@/lib/types";
import { PLANS } from "@/lib/types";
import { useEffect, useState } from "react";

const PROGRESS_STEPS = [
  "Analyse du PDF...",
  "Detection de la banque...",
  "Extraction des transactions...",
  "Preparation du fichier...",
];

export default function ConvertPage() {
  const [result, setResult] = useState<ParseResult | null>(null);
  const [plan, setPlan] = useState<Plan>("free");
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
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

  useEffect(() => {
    if (!loading) return;
    setProgressStep(0);
    const intervals = [800, 1500, 2500];
    const timers = intervals.map((delay, i) => setTimeout(() => setProgressStep(i + 1), delay));
    return () => timers.forEach(clearTimeout);
  }, [loading]);

  async function handleFileSelected(file: File) {
    setLoading(true);
    setError(null);
    setResult(null);
    setExported(false);

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
        return;
      }

      setResult(data);
    } catch {
      setError("Erreur de connexion au serveur. Verifiez votre connexion et reessayez.");
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
      setExported(true);
    } catch {
      setError("Erreur lors du telechargement.");
    } finally {
      setExporting(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError(null);
    setExported(false);
  }

  const planConfig = PLANS[plan];

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Convertir un releve bancaire</h1>

      <UploadZone onFileSelected={handleFileSelected} loading={loading} />

      {/* Progress steps during loading */}
      {loading && (
        <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
          <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <span>{PROGRESS_STEPS[progressStep] || PROGRESS_STEPS[PROGRESS_STEPS.length - 1]}</span>
        </div>
      )}

      {/* Demo link */}
      {!result && !loading && (
        <p className="mt-3 text-center text-sm text-gray-400">
          Pas de releve sous la main ?{" "}
          <button
            type="button"
            onClick={async () => {
              const res = await fetch("/demo/releve-demo-bnp.pdf");
              const blob = await res.blob();
              const file = new File([blob], "releve-demo-bnp.pdf", { type: "application/pdf" });
              handleFileSelected(file);
            }}
            className="text-brand-600 hover:underline font-medium"
          >
            Essayez avec un releve de demonstration
          </button>
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
          {error.includes("Pro") && (
            <a href="/tarifs" className="ml-2 underline font-medium">
              Voir les tarifs
            </a>
          )}
          {error.includes("indisponible") && (
            <button onClick={() => setError(null)} className="ml-2 underline font-medium">
              Fermer
            </button>
          )}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Banque</p>
              <p className="font-bold text-sm">{result.bankName}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Transactions</p>
              <p className="font-bold text-sm">{result.transactionCount}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Total debits</p>
              <p className="font-bold text-sm text-red-600">
                {result.transactions
                  .filter((t) => t.amount < 0)
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString("fr-FR", { minimumFractionDigits: 2 })} EUR
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Total credits</p>
              <p className="font-bold text-sm text-green-600">
                +{result.transactions
                  .filter((t) => t.amount > 0)
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString("fr-FR", { minimumFractionDigits: 2 })} EUR
              </p>
            </div>
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

          {/* Post-export CTA */}
          {exported && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-700 font-medium mb-2">Fichier telecharge avec succes !</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                  Convertir un autre releve
                </button>
                {plan === "free" && (
                  <a
                    href="/tarifs"
                    className="px-4 py-2 border border-brand-600 text-brand-600 rounded-lg text-sm font-medium hover:bg-brand-50 transition-colors"
                  >
                    Passer au Pro — conversions illimitees
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
