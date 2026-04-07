"use client";

import type { ParseResult } from "@/lib/types";

interface TransactionPreviewProps {
  result: ParseResult;
  maxRows?: number;
  showWatermark?: boolean;
}

function formatDateFR(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function formatAmountFR(amount: number | null | undefined): string {
  if (amount == null) return "";
  return amount.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " EUR";
}

export function TransactionPreview({ result, maxRows = -1, showWatermark }: TransactionPreviewProps) {
  const transactions = maxRows > 0 ? result.transactions.slice(0, maxRows) : result.transactions;
  const truncated = maxRows > 0 && result.transactions.length > maxRows;

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Header info */}
      <div className="bg-gray-50 px-4 py-3 flex flex-wrap gap-4 text-sm">
        <span className="font-medium">{result.bankName}</span>
        {result.period && (
          <span className="text-gray-500">
            {formatDateFR(result.period.from)} &rarr; {formatDateFR(result.period.to)}
          </span>
        )}
        <span className="text-gray-500">{result.transactionCount} transactions</span>
        <span className="text-gray-500">{result.pageCount} pages</span>
      </div>

      {showWatermark && truncated && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-xs text-yellow-700">
          Version gratuite &mdash; {maxRows} transactions affichees sur {result.transactionCount}.{" "}
          <a href="/tarifs" className="underline font-medium">
            Passer au Pro
          </a>{" "}
          pour tout voir.
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-600 text-white text-left">
              <th className="px-4 py-2 font-medium">Date</th>
              <th className="px-4 py-2 font-medium">Libelle</th>
              <th className="px-4 py-2 font-medium text-right">Debit</th>
              <th className="px-4 py-2 font-medium text-right">Credit</th>
              <th className="px-4 py-2 font-medium text-right">Solde</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2 whitespace-nowrap">{formatDateFR(tx.date)}</td>
                <td className="px-4 py-2 max-w-xs truncate">{tx.label}</td>
                <td className="px-4 py-2 text-right text-red-600 whitespace-nowrap">
                  {tx.amount < 0 ? formatAmountFR(Math.abs(tx.amount)) : ""}
                </td>
                <td className="px-4 py-2 text-right text-green-600 whitespace-nowrap">
                  {tx.amount >= 0 ? formatAmountFR(tx.amount) : ""}
                </td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  {tx.balance !== undefined ? formatAmountFR(tx.balance) : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {truncated && (
        <div className="bg-gray-100 px-4 py-3 text-center text-sm text-gray-500">
          ... et {result.transactionCount - maxRows} transactions supplementaires.{" "}
          <a href="/tarifs" className="text-brand-600 font-medium hover:underline">
            Passez au Pro
          </a>{" "}
          pour tout exporter.
        </div>
      )}
    </div>
  );
}
