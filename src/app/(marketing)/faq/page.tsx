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
      "ReleveFacile est compatible avec les principales banques francaises : BNP Paribas, Credit Agricole, Societe Generale, LCL, La Banque Postale, Boursorama, et bien d'autres.",
  },
  {
    question: "Mes donnees sont-elles en securite ?",
    answer:
      "Oui. Vos fichiers PDF sont supprimes immediatement apres extraction. Aucune donnee bancaire n'est stockee sur nos serveurs. Nous sommes conformes au RGPD.",
  },
  {
    question: "Quel format d'export est disponible ?",
    answer:
      "Le plan gratuit permet l'export en CSV (format francais). Les plans Pro et Cabinet ajoutent l'export Excel (.xlsx) et OFX.",
  },
  {
    question: "Puis-je utiliser ReleveFacile sans creer de compte ?",
    answer:
      "Vous pouvez voir un apercu des 10 premieres transactions sans compte. Pour telecharger le fichier complet, une inscription gratuite est necessaire.",
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
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
