import type { Transaction } from "@/lib/types";

function formatDateFR(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function formatAmountFR(amount: number): string {
  return amount.toFixed(2).replace(".", ",");
}

function escapeCSV(value: string): string {
  if (value.includes(";") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function generateCSV(transactions: Transaction[], includeWatermark: boolean = false): string {
  const BOM = "\uFEFF";
  const SEP = ";";
  const lines: string[] = [];

  if (includeWatermark) {
    lines.push(`${escapeCSV("Genere avec ReleveFacile.com - Version gratuite")}${SEP}${SEP}${SEP}${SEP}`);
    lines.push(`${SEP}${SEP}${SEP}${SEP}`);
  }

  // Header
  lines.push(["Date", "Date valeur", "Libelle", "Montant", "Solde"].join(SEP));

  // Data rows
  for (const tx of transactions) {
    lines.push(
      [
        formatDateFR(tx.date),
        tx.valueDate ? formatDateFR(tx.valueDate) : "",
        escapeCSV(tx.label),
        formatAmountFR(tx.amount),
        tx.balance !== undefined ? formatAmountFR(tx.balance) : "",
      ].join(SEP),
    );
  }

  return BOM + lines.join("\r\n") + "\r\n";
}
