import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="font-bold text-brand-600 mb-2">ReleveFacile</p>
            <p className="text-gray-500">Convertissez vos releves bancaires PDF en Excel et CSV.</p>
          </div>
          <div>
            <p className="font-medium mb-2">Produit</p>
            <Link href="/tarifs" className="block text-gray-500 hover:text-gray-700 mb-1">
              Tarifs
            </Link>
            <Link href="/banques" className="block text-gray-500 hover:text-gray-700 mb-1">
              Banques compatibles
            </Link>
            <Link href="/faq" className="block text-gray-500 hover:text-gray-700 mb-1">
              FAQ
            </Link>
            <Link href="/guides" className="block text-gray-500 hover:text-gray-700 mb-1">
              Guides
            </Link>
          </div>
          <div>
            <p className="font-medium mb-2">Legal</p>
            <Link href="/confidentialite" className="block text-gray-500 hover:text-gray-700 mb-1">
              Confidentialite
            </Link>
            <Link href="/cgu" className="block text-gray-500 hover:text-gray-700 mb-1">
              CGU
            </Link>
          </div>
          <div>
            <p className="font-medium mb-2">Contact</p>
            <a href="mailto:contact@relevefacile.com" className="text-gray-500 hover:text-gray-700">
              contact@relevefacile.com
            </a>
          </div>
        </div>
        <div className="border-t mt-6 pt-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} ReleveFacile. Tous droits reserves.
        </div>
      </div>
    </footer>
  );
}
