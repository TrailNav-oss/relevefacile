"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-red-500 mb-4">500</p>
      <h1 className="text-2xl font-bold mb-2">Erreur inattendue</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Une erreur est survenue. Nos equipes ont ete informees. Veuillez reessayer dans quelques instants.
      </p>
      <button
        onClick={reset}
        className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors"
      >
        Reessayer
      </button>
    </main>
  );
}
