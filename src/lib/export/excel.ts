import ExcelJS from "exceljs";
import type { Transaction } from "@/lib/types";

export async function generateExcel(
  transactions: Transaction[],
  bankName: string,
  includeWatermark: boolean = false,
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ReleveFacile.com";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Transactions");

  // Watermark row for free tier
  if (includeWatermark) {
    const wmRow = sheet.addRow(["Genere avec ReleveFacile.com - Version gratuite"]);
    wmRow.font = { italic: true, color: { argb: "FF999999" } };
    sheet.addRow([]);
  }

  // Header
  const headerRow = sheet.addRow(["Date", "Date valeur", "Libelle", "Debit", "Credit", "Solde"]);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF2563EB" },
  };
  headerRow.alignment = { horizontal: "center" };

  // Data rows
  transactions.forEach((tx, index) => {
    const row = sheet.addRow([
      tx.date,
      tx.valueDate || "",
      tx.label,
      tx.amount < 0 ? Math.abs(tx.amount) : "",
      tx.amount >= 0 ? tx.amount : "",
      tx.balance ?? "",
    ]);

    // Zebra striping
    if (index % 2 === 1) {
      row.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF3F4F6" },
      };
    }

    // Number format for amount columns
    const debitCell = row.getCell(4);
    const creditCell = row.getCell(5);
    const balanceCell = row.getCell(6);
    const euroFormat = '#,##0.00 "EUR"';
    debitCell.numFmt = euroFormat;
    creditCell.numFmt = euroFormat;
    balanceCell.numFmt = euroFormat;
  });

  // Auto-width columns
  sheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell?.({ includeEmpty: false }, (cell) => {
      const cellLength = cell.value ? String(cell.value).length : 0;
      maxLength = Math.max(maxLength, cellLength);
    });
    column.width = Math.min(maxLength + 2, 40);
  });

  // Bank name in footer
  sheet.headerFooter.oddFooter = `&L${bankName}&RReleveFacile.com`;

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
