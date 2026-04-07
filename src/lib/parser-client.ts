import { PARSER_SERVICE_URL, PARSER_API_KEY } from "./config";
import type { ParseResult } from "./types";

interface DetectResult {
  bankSlug: string;
  bankName: string;
  confidence: number;
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

  return response.json();
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

  return response.json();
}
