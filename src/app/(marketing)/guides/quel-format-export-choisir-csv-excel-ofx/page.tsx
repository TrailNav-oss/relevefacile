import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CSV, Excel ou OFX : quel format d'export choisir ?",
  description:
    "Comparaison detaillee des formats CSV, Excel et OFX pour l'export de releves bancaires. Avantages, inconvenients et cas d'usage pour chaque format.",
};

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "CSV, Excel ou OFX : quel format d'export choisir ?",
    author: { "@type": "Organization", name: "ReleveFacile" },
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/guides" className="hover:text-brand-600">Guides</Link>{" > "}
        <span>Quel format choisir</span>
      </nav>

      <article className="prose max-w-none">
        <h1>CSV, Excel ou OFX : quel format d&apos;export choisir ?</h1>

        <p>
          ReleveFacile propose plusieurs formats d&apos;export pour vos releves bancaires. Chacun a ses
          avantages selon votre usage. Voici un comparatif pour vous aider a choisir.
        </p>

        <h2>CSV — Le format universel</h2>
        <p><strong>Disponible sur le plan Gratuit.</strong></p>
        <p>
          Le CSV (Comma-Separated Values) est un format texte simple et universel. Il s&apos;ouvre dans
          n&apos;importe quel tableur et peut etre importe dans la quasi-totalite des logiciels comptables.
        </p>
        <p><strong>Avantages :</strong></p>
        <ul>
          <li>Compatible avec tous les logiciels (Excel, Sheets, Calc, logiciels comptables)</li>
          <li>Fichier leger et facile a manipuler</li>
          <li>Format francais (point-virgule, virgule decimale, UTF-8 BOM)</li>
          <li>Disponible sur le plan gratuit</li>
        </ul>
        <p><strong>Inconvenients :</strong></p>
        <ul>
          <li>Pas de mise en forme (pas de couleurs, pas de gras)</li>
          <li>Peut necessiter un parametrage a l&apos;ouverture dans certains logiciels</li>
        </ul>
        <p><strong>Ideal pour :</strong> Import dans un logiciel comptable, traitement automatise, archivage.</p>

        <h2>Excel (.xlsx) — Le format enrichi</h2>
        <p><strong>Disponible sur les plans Pro et Cabinet.</strong></p>
        <p>
          Le format Excel genere un classeur .xlsx avec une mise en forme professionnelle : en-tetes en gras,
          alternance de couleurs (zebra), colonnes dimensionnees et montants au format EUR.
        </p>
        <p><strong>Avantages :</strong></p>
        <ul>
          <li>Ouverture instantanee dans Excel sans parametrage</li>
          <li>Mise en forme professionnelle pre-appliquee</li>
          <li>Pret pour l&apos;impression ou l&apos;envoi a un client/comptable</li>
          <li>Formules et calculs possibles directement</li>
        </ul>
        <p><strong>Inconvenients :</strong></p>
        <ul>
          <li>Format proprietaire Microsoft (bien que supporte par la plupart des tableurs)</li>
          <li>Fichier plus lourd que le CSV</li>
        </ul>
        <p><strong>Ideal pour :</strong> Consultation rapide, envoi a un comptable, analyse manuelle dans Excel.</p>

        <h2>OFX — Le format comptable</h2>
        <p><strong>Bientot disponible sur les plans Pro et Cabinet.</strong></p>
        <p>
          L&apos;OFX (Open Financial Exchange) est un format XML specialise pour les donnees bancaires.
          Il est reconnu nativement par les logiciels de comptabilite et de gestion financiere.
        </p>
        <p><strong>Avantages :</strong></p>
        <ul>
          <li>Import natif dans les logiciels comptables (Sage, EBP, Ciel, QuickBooks)</li>
          <li>Rapprochement bancaire automatise</li>
          <li>Format standardise pour les donnees financieres</li>
        </ul>
        <p><strong>Ideal pour :</strong> Comptables et cabinets utilisant des logiciels de comptabilite professionnels.</p>

        <h2>Resume</h2>
        <table>
          <thead>
            <tr><th>Format</th><th>Plan</th><th>Usage principal</th></tr>
          </thead>
          <tbody>
            <tr><td>CSV</td><td>Gratuit</td><td>Usage general, import logiciel</td></tr>
            <tr><td>Excel</td><td>Pro</td><td>Consultation, analyse, envoi</td></tr>
            <tr><td>OFX</td><td>Pro (bientot)</td><td>Logiciels comptables pro</td></tr>
          </tbody>
        </table>

        <div className="bg-brand-50 rounded-xl p-6 text-center not-prose mt-8">
          <p className="font-bold text-lg mb-2">Essayez les differents formats</p>
          <Link
            href="/tarifs"
            className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
          >
            Voir les tarifs
          </Link>
        </div>
      </article>
    </main>
  );
}
