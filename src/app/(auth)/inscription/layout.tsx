import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creer un compte",
  description: "Inscrivez-vous gratuitement sur ReleveFacile. 3 conversions de releves bancaires PDF offertes chaque mois.",
};

export default function InscriptionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
