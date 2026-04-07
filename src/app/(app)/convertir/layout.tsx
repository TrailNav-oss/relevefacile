import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertir un releve bancaire",
  description:
    "Uploadez votre releve bancaire PDF et convertissez-le en Excel ou CSV en quelques secondes. Compatible avec toutes les banques francaises.",
};

export default function ConvertirLayout({ children }: { children: React.ReactNode }) {
  return children;
}
