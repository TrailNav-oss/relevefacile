import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides et ressources",
  description:
    "Guides pratiques pour convertir vos releves bancaires PDF en Excel et CSV. Tutoriels, astuces et bonnes pratiques pour comptables et freelances.",
};

const GUIDES = [
  {
    slug: "comment-convertir-releve-bancaire-pdf-excel",
    title: "Comment convertir un releve bancaire PDF en Excel",
    description: "Guide complet pour transformer vos releves bancaires PDF en fichiers Excel exploitables.",
  },
  {
    slug: "importer-releve-bancaire-dans-excel",
    title: "Importer un releve bancaire dans Excel",
    description: "Tutoriel pas a pas pour importer correctement un fichier CSV ou Excel de releve bancaire.",
  },
  {
    slug: "format-csv-comptabilite-france",
    title: "Le format CSV pour la comptabilite en France",
    description: "Comprendre le format CSV francais : encodage, separateurs, decimales et compatibilite.",
  },
  {
    slug: "releve-bancaire-comptabilite-auto-entrepreneur",
    title: "Releve bancaire et comptabilite auto-entrepreneur",
    description: "Comment utiliser vos releves bancaires pour simplifier votre comptabilite d'auto-entrepreneur.",
  },
  {
    slug: "quel-format-export-choisir-csv-excel-ofx",
    title: "CSV, Excel ou OFX : quel format d'export choisir ?",
    description: "Comparaison des formats d'export pour vos releves bancaires selon votre usage.",
  },
];

export default function GuidesPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Guides et ressources</h1>
      <p className="text-gray-600 mb-10">
        Retrouvez nos guides pratiques pour tirer le meilleur parti de vos releves bancaires au format numerique.
      </p>

      <div className="space-y-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block border rounded-xl p-6 hover:border-brand-400 hover:shadow-sm transition-all"
          >
            <h2 className="text-lg font-bold mb-2 text-brand-700">{guide.title}</h2>
            <p className="text-gray-600 text-sm">{guide.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
