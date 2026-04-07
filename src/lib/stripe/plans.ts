import type { Plan } from "@/lib/types";

export const STRIPE_PRICES: Record<Exclude<Plan, "free">, string> = {
  pro: process.env.STRIPE_PRICE_PRO || "",
  cabinet: process.env.STRIPE_PRICE_CABINET || "",
};

export function getPlanFromPriceId(priceId: string): Plan {
  if (priceId === STRIPE_PRICES.pro) return "pro";
  if (priceId === STRIPE_PRICES.cabinet) return "cabinet";
  return "free";
}
