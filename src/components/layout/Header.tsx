"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand-600">
          ReleveFacile
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/banques" className="text-gray-600 hover:text-gray-900">
            Banques
          </Link>
          <Link href="/tarifs" className="text-gray-600 hover:text-gray-900">
            Tarifs
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
          {user ? (
            <>
              <Link href="/convertir" className="text-gray-600 hover:text-gray-900">
                Convertir
              </Link>
              <Link href="/historique" className="text-gray-600 hover:text-gray-900">
                Historique
              </Link>
              <Link href="/compte" className="text-gray-600 hover:text-gray-900">
                Compte
              </Link>
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900">
                Deconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/connexion" className="text-gray-600 hover:text-gray-900">
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="bg-brand-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
              >
                Essai gratuit
              </Link>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t px-4 py-3 space-y-2 bg-white">
          <Link href="/banques" className="block py-1 text-gray-600" onClick={() => setMenuOpen(false)}>
            Banques
          </Link>
          <Link href="/tarifs" className="block py-1 text-gray-600" onClick={() => setMenuOpen(false)}>
            Tarifs
          </Link>
          <Link href="/faq" className="block py-1 text-gray-600" onClick={() => setMenuOpen(false)}>
            FAQ
          </Link>
          {user ? (
            <>
              <Link href="/convertir" className="block py-1 text-gray-600" onClick={() => setMenuOpen(false)}>
                Convertir
              </Link>
              <Link href="/compte" className="block py-1 text-gray-600" onClick={() => setMenuOpen(false)}>
                Compte
              </Link>
              <button onClick={handleLogout} className="block py-1 text-gray-500">
                Deconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/connexion" className="block py-1 text-gray-600" onClick={() => setMenuOpen(false)}>
                Connexion
              </Link>
              <Link href="/inscription" className="block py-1 text-brand-600 font-medium" onClick={() => setMenuOpen(false)}>
                Essai gratuit
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
