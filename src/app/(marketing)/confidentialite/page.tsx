import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialite",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 prose">
      <h1>Politique de confidentialite</h1>
      <p className="text-gray-600">Derniere mise a jour : {new Date().toLocaleDateString("fr-FR")}</p>
      <p>
        ReleveFacile s&apos;engage a proteger vos donnees personnelles conformement au Reglement General sur la
        Protection des Donnees (RGPD).
      </p>
      <h2>Donnees collectees</h2>
      <ul>
        <li>Email et nom lors de l&apos;inscription</li>
        <li>Metadonnees de conversion (banque detectee, nombre de transactions, date)</li>
      </ul>
      <h2>Donnees NON collectees</h2>
      <ul>
        <li>Vos fichiers PDF sont supprimes immediatement apres extraction</li>
        <li>Aucune donnee bancaire (montants, libelles, soldes) n&apos;est stockee</li>
        <li>Aucun numero de compte n&apos;est conserve</li>
      </ul>
      <h2>Hebergement</h2>
      <p>Nos serveurs sont heberges en Union Europeenne.</p>
    </main>
  );
}
