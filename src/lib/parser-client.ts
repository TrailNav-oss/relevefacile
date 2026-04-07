import { PARSER_SERVICE_URL, PARSER_API_KEY } from "./config";
import type { ParseResult, Transaction } from "./types";

interface DetectResult {
  bankSlug: string;
  bankName: string;
  confidence: number;
}

// Python API returns snake_case — transform to camelCase for the frontend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformParseResult(raw: any): ParseResult {
  return {
    bankSlug: raw.bank_slug,
    bankName: raw.bank_name,
    confidence: raw.confidence,
    account: raw.account,
    period: raw.period ? { from: raw.period.start, to: raw.period.end } : undefined,
    transactions: raw.transactions.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tx: any): Transaction => ({
        date: tx.date,
        valueDate: tx.value_date,
        label: tx.label,
        amount: tx.amount,
        balance: tx.balance,
        category: tx.category,
      }),
    ),
    pageCount: raw.page_count,
    transactionCount: raw.transaction_count,
  };
}

export async function detectBank(pdfBuffer: Uint8Array): Promise<DetectResult> {
  const formData = new FormData();
  formData.append("file", new File([new Uint8Array(pdfBuffer)], "statement.pdf", { type: "application/pdf" }));

  const response = await fetch(`${PARSER_SERVICE_URL}/detect`, {
    method: "POST",
    headers: { "X-Api-Key": PARSER_API_KEY },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Parser service error: ${response.status} ${response.statusText}`);
  }

  const raw = await response.json();
  return { bankSlug: raw.bank_slug, bankName: raw.bank_name, confidence: raw.confidence };
}

export async function parsePdf(pdfBuffer: Uint8Array, bankSlug?: string): Promise<ParseResult> {
  const formData = new FormData();
  formData.append("file", new File([new Uint8Array(pdfBuffer)], "statement.pdf", { type: "application/pdf" }));
  if (bankSlug) {
    formData.append("bank_slug", bankSlug);
  }

  const response = await fetch(`${PARSER_SERVICE_URL}/parse`, {
    method: "POST",
    headers: { "X-Api-Key": PARSER_API_KEY },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Parser service error: ${response.status} ${response.statusText}`);
  }

  const raw = await response.json();
  return transformParseResult(raw);
}
