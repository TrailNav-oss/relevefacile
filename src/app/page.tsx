import { SUPPORTED_BANKS } from "@/data/banks";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-brand-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Convertissez vos releves bancaires PDF en Excel</h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Extraction automatique de vos transactions. Compatible avec toutes les banques francaises.
        </p>
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 text-foreground">
          <p className="text-lg font-medium mb-4">Deposez votre releve PDF ici</p>
          <div className="border-2 border-dashed border-brand-300 rounded-xl p-12 text-gray-500 cursor-pointer hover:border-brand-500 transition-colors">
            Glissez-deposez votre fichier PDF ou cliquez pour parcourir
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Compatible avec vos banques</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
          {SUPPORTED_BANKS.slice(0, 8).map((bank) => (
            <div key={bank.slug} className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
              {bank.name}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl mb-3">&#9889;</div>
            <h3 className="font-bold text-lg mb-2">Rapide</h3>
            <p className="text-gray-600">Conversion en moins de 5 secondes, meme pour les releves de 10+ pages.</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">&#127467;&#127479;</div>
            <h3 className="font-bold text-lg mb-2">Format francais</h3>
            <p className="text-gray-600">Virgule decimale, point-virgule, dates DD/MM/YYYY. Pret pour Excel FR.</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">&#128274;</div>
            <h3 className="font-bold text-lg mb-2">Securise</h3>
            <p className="text-gray-600">Vos PDFs sont supprimes immediatement apres extraction. Conforme RGPD.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
