"use client";

import type { Plan } from "@/lib/types";
import { PLANS } from "@/lib/types";

interface ExportOptionsProps {
  plan: Plan;
  onExport: (format: "csv" | "excel" | "ofx") => void;
  loading?: boolean;
}

export function ExportOptions({ plan, onExport, loading }: ExportOptionsProps) {
  const planConfig = PLANS[plan];

  return (
    <div className="flex flex-wrap gap-3">
      {(["csv", "excel", "ofx"] as const).map((format) => {
        const available = planConfig.formats.includes(format);
        const label = format === "csv" ? "CSV" : format === "excel" ? "Excel (.xlsx)" : "OFX";

        return (
          <button
            key={format}
            onClick={() => onExport(format)}
            disabled={!available || loading}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              available
                ? "bg-brand-600 text-white hover:bg-brand-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            } disabled:opacity-50`}
          >
            {loading ? "..." : available ? `Telecharger ${label}` : `${label} (Pro)`}
          </button>
        );
      })}
    </div>
  );
}
