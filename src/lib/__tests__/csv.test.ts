import { describe, it, expect } from "vitest";
import { generateCSV } from "@/lib/export/csv";
import type { Transaction } from "@/lib/types";

const SAMPLE_TRANSACTIONS: Transaction[] = [
  { date: "2024-01-05", valueDate: "2024-01-05", label: "CARTE 03/01 CARREFOUR", amount: -45.67, balance: 1234.56 },
  { date: "2024-01-10", label: "VIREMENT DE DUPONT JEAN", amount: 1500.0, balance: 2734.56 },
  { date: "2024-01-15", label: 'PRLV SEPA "EDF"', amount: -89.99, balance: 2644.57 },
];

describe("generateCSV", () => {
  it("should use BOM prefix for Excel FR compatibility", () => {
    const csv = generateCSV(SAMPLE_TRANSACTIONS);
    expect(csv.startsWith("\uFEFF")).toBe(true);
  });

  it("should use semicolon separator", () => {
    const csv = generateCSV(SAMPLE_TRANSACTIONS);
    const lines = csv.split("\r\n");
    expect(lines[0].replace("\uFEFF", "")).toBe("Date;Date valeur;Libelle;Montant;Solde");
  });

  it("should format dates as DD/MM/YYYY", () => {
    const csv = generateCSV(SAMPLE_TRANSACTIONS);
    expect(csv).toContain("05/01/2024");
  });

  it("should use comma as decimal separator", () => {
    const csv = generateCSV(SAMPLE_TRANSACTIONS);
    expect(csv).toContain("-45,67");
    expect(csv).toContain("1500,00");
  });

  it("should escape fields containing semicolons or quotes", () => {
    const csv = generateCSV(SAMPLE_TRANSACTIONS);
    expect(csv).toContain('"PRLV SEPA ""EDF"""');
  });

  it("should add watermark when requested", () => {
    const csv = generateCSV(SAMPLE_TRANSACTIONS, true);
    expect(csv).toContain("Genere avec ReleveFacile.com - Version gratuite");
  });

  it("should end lines with CRLF", () => {
    const csv = generateCSV(SAMPLE_TRANSACTIONS);
    expect(csv).toContain("\r\n");
  });
});
