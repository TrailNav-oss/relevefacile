import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-600 mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">Page introuvable</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        La page que vous recherchez n&apos;existe pas ou a ete deplacee.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/convertir"
          className="border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Convertir un releve
        </Link>
      </div>
    </main>
  );
}
