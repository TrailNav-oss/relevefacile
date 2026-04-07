export interface Transaction {
  date: string; // ISO 8601 (YYYY-MM-DD)
  valueDate?: string;
  label: string;
  amount: number; // Negative = debit, positive = credit
  balance?: number;
  category?: "debit" | "credit";
}

export interface ParseResult {
  bankSlug: string;
  bankName: string;
  confidence: number;
  account?: {
    holder?: string;
    number?: string;
  };
  period?: {
    from: string;
    to: string;
  };
  transactions: Transaction[];
  pageCount: number;
  transactionCount: number;
}

export interface Bank {
  slug: string;
  name: string;
  bic?: string;
  logo?: string;
  isSupported: boolean;
  seoTitle: string;
  seoDescription: string;
  faq: { question: string; answer: string }[];
}

export type Plan = "free" | "pro" | "cabinet";

export interface PlanConfig {
  name: string;
  price: number; // EUR/month, 0 for free
  conversionsPerMonth: number; // -1 for unlimited
  maxPreviewRows: number; // -1 for unlimited
  formats: ("csv" | "excel" | "ofx")[];
  watermark: boolean;
  batchUpload: boolean;
  apiAccess: boolean;
}

export const PLANS: Record<Plan, PlanConfig> = {
  free: {
    name: "Gratuit",
    price: 0,
    conversionsPerMonth: 3,
    maxPreviewRows: 10,
    formats: ["csv"],
    watermark: true,
    batchUpload: false,
    apiAccess: false,
  },
  pro: {
    name: "Pro",
    price: 9.9,
    conversionsPerMonth: -1,
    maxPreviewRows: -1,
    formats: ["csv", "excel", "ofx"],
    watermark: false,
    batchUpload: false,
    apiAccess: false,
  },
  cabinet: {
    name: "Cabinet",
    price: 29,
    conversionsPerMonth: -1,
    maxPreviewRows: -1,
    formats: ["csv", "excel", "ofx"],
    watermark: false,
    batchUpload: true,
    apiAccess: true,
  },
};
