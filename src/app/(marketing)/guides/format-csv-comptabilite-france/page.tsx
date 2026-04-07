import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Le format CSV pour la comptabilite en France",
  description:
    "Tout savoir sur le format CSV francais : encodage UTF-8, separateur point-virgule, virgule decimale. Guide pour comptables et auto-entrepreneurs.",
};

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Le format CSV pour la comptabilite en France",
    author: { "@type": "Organization", name: "ReleveFacile" },
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/guides" className="hover:text-brand-600">Guides</Link>{" > "}
        <span>Format CSV France</span>
      </nav>

      <article className="prose max-w-none">
        <h1>Le format CSV pour la comptabilite en France</h1>

        <p>
          Le format CSV (Comma-Separated Values) est le standard pour l&apos;echange de donnees tabulaires.
          Mais en France, les conventions sont differentes du standard international. Voici ce qu&apos;il faut
          savoir pour eviter les problemes d&apos;import.
        </p>

        <h2>Les specificites du CSV francais</h2>
        <p>
          Contrairement au CSV anglo-saxon qui utilise la virgule comme separateur, le CSV francais utilise
          le <strong>point-virgule</strong> (;). La raison est simple : en France, la virgule est utilisee
          comme separateur decimal (1 234,56 EUR au lieu de 1,234.56 EUR).
        </p>

        <table>
          <thead>
            <tr><th>Parametre</th><th>CSV international</th><th>CSV francais</th></tr>
          </thead>
          <tbody>
            <tr><td>Separateur de colonnes</td><td>Virgule (,)</td><td>Point-virgule (;)</td></tr>
            <tr><td>Separateur decimal</td><td>Point (.)</td><td>Virgule (,)</td></tr>
            <tr><td>Format de date</td><td>YYYY-MM-DD ou MM/DD/YYYY</td><td>JJ/MM/AAAA</td></tr>
            <tr><td>Encodage</td><td>UTF-8</td><td>UTF-8 avec BOM</td></tr>
            <tr><td>Separateur de milliers</td><td>Virgule</td><td>Espace</td></tr>
          </tbody>
        </table>

        <h2>L&apos;importance du BOM UTF-8</h2>
        <p>
          Le BOM (Byte Order Mark) est un caractere invisible place au debut du fichier. Sans le BOM,
          Excel ouvre souvent les fichiers CSV en encodage ANSI au lieu d&apos;UTF-8, ce qui casse les
          accents et les caracteres speciaux. ReleveFacile ajoute automatiquement le BOM a tous ses
          fichiers CSV pour garantir une ouverture correcte dans Excel.
        </p>

        <h2>Compatibilite avec les logiciels comptables</h2>
        <p>Le format CSV francais genere par ReleveFacile est compatible avec :</p>
        <ul>
          <li><strong>Microsoft Excel</strong> — ouverture directe grace au BOM et au point-virgule</li>
          <li><strong>Google Sheets</strong> — import via Fichier &gt; Importer</li>
          <li><strong>LibreOffice Calc</strong> — detection automatique du separateur</li>
          <li><strong>Sage Compta</strong> — import via le module d&apos;import CSV</li>
          <li><strong>EBP Compta</strong> — compatible avec le format point-virgule</li>
          <li><strong>Ciel Compta</strong> — import CSV avec parametrage du separateur</li>
        </ul>

        <h2>Structure du fichier CSV ReleveFacile</h2>
        <p>Chaque fichier CSV exporte par ReleveFacile contient les colonnes suivantes :</p>
        <ul>
          <li><strong>Date</strong> — Format JJ/MM/AAAA</li>
          <li><strong>Libelle</strong> — Description de la transaction</li>
          <li><strong>Montant</strong> — Negatif pour les debits, positif pour les credits</li>
          <li><strong>Categorie</strong> — Debit ou Credit</li>
        </ul>

        <div className="bg-brand-50 rounded-xl p-6 text-center not-prose mt-8">
          <p className="font-bold text-lg mb-2">Obtenez un CSV parfaitement formate</p>
          <Link
            href="/convertir"
            className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
          >
            Convertir un releve PDF
          </Link>
        </div>
      </article>
    </main>
  );
}
