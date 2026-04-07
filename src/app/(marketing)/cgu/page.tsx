import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions generales d'utilisation",
  description:
    "Conditions generales d'utilisation de ReleveFacile, service de conversion de releves bancaires PDF en Excel et CSV.",
};

export default function CGUPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 prose">
      <h1>Conditions generales d&apos;utilisation</h1>
      <p className="text-gray-600">Derniere mise a jour : {new Date().toLocaleDateString("fr-FR")}</p>
      <p>En utilisant ReleveFacile, vous acceptez les presentes conditions.</p>
      <h2>Description du service</h2>
      <p>
        ReleveFacile est un service de conversion de releves bancaires PDF en fichiers Excel et CSV.
      </p>
      <h2>Limitation de responsabilite</h2>
      <p>
        ReleveFacile fournit une extraction automatique qui peut contenir des erreurs. L&apos;utilisateur est
        responsable de verifier l&apos;exactitude des donnees extraites.
      </p>
    </main>
  );
}
