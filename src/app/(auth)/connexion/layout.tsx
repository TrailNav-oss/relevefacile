import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous a votre compte ReleveFacile pour convertir vos releves bancaires PDF en Excel et CSV.",
};

export default function ConnexionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
