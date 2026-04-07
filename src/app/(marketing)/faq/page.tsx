import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions frequentes",
  description: "Reponses aux questions les plus frequentes sur la conversion de releves bancaires PDF avec ReleveFacile.",
};

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne ReleveFacile ?",
    answer:
      "Deposez simplement votre releve bancaire PDF. Notre outil detecte automatiquement votre banque et extrait toutes les transactions en quelques secondes.",
  },
  {
    question: "Quelles banques sont compatibles ?",
    answer:
      "ReleveFacile est compatible avec les principales banques francaises : BNP Paribas, Credit Agricole, Societe Generale, LCL, La Banque Postale, Boursorama, Caisse d'Epargne, Credit Mutuel, CIC, et Banque Populaire.",
  },
  {
    question: "Mes donnees sont-elles en securite ?",
    answer:
      "Oui. Vos fichiers PDF sont supprimes immediatement apres extraction. Aucune donnee bancaire n'est stockee sur nos serveurs. Le traitement s'effectue sur des serveurs en France et nous sommes conformes au RGPD.",
  },
  {
    question: "Quel format d'export est disponible ?",
    answer:
      "Le plan gratuit permet l'export en CSV (format francais avec separateur point-virgule et encodage UTF-8). Les plans Pro et Cabinet ajoutent l'export Excel (.xlsx) avec mise en forme automatique.",
  },
  {
    question: "Combien de conversions puis-je faire gratuitement ?",
    answer:
      "Le plan gratuit vous permet 3 conversions par mois avec un apercu limite a 10 transactions. Pour des conversions illimitees et l'acces a toutes les transactions, passez au plan Pro a 9,90 EUR/mois.",
  },
  {
    question: "Comment sont geres les releves de plusieurs pages ?",
    answer:
      "ReleveFacile gere automatiquement les releves multi-pages. Toutes les transactions sont extraites et fusionnees dans un seul fichier, quelle que soit la longueur du releve.",
  },
  {
    question: "Puis-je annuler mon abonnement a tout moment ?",
    answer:
      "Oui. Vous pouvez annuler votre abonnement Pro ou Cabinet a tout moment depuis votre espace compte. L'annulation prend effet a la fin de la periode en cours, sans frais supplementaires.",
  },
  {
    question: "Le format CSV est-il compatible avec Excel et les logiciels de comptabilite ?",
    answer:
      "Oui. Le CSV genere utilise le format francais (separateur point-virgule, virgule decimale, encodage UTF-8 avec BOM). Il s'ouvre correctement dans Excel, Google Sheets, et les logiciels comptables francais.",
  },
  {
    question: "Que faire si ma banque n'est pas reconnue ?",
    answer:
      "Si votre banque n'est pas automatiquement detectee, notre parseur generique tentera quand meme d'extraire les transactions. Si le resultat n'est pas satisfaisant, contactez-nous et nous ajouterons le support de votre banque.",
  },
  {
    question: "Combien de temps faut-il pour convertir un releve ?",
    answer:
      "La conversion prend generalement entre 2 et 5 secondes, meme pour les releves de plusieurs pages. Le temps de traitement peut varier legerement selon la taille du fichier.",
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-3xl font-bold mb-8">Questions frequentes</h1>
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, i) => (
          <details key={i} className="border rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer">{item.question}</summary>
            <p className="mt-3 text-gray-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
