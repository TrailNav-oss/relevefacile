import { createClient } from "@/lib/supabase/server";
import { PLANS } from "@/lib/types";
import type { Plan } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mon compte",
};

export default async function ComptePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name, plan, conversions_this_month, conversions_reset_at")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  const plan = profile.plan as Plan;
  const planConfig = PLANS[plan];

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Mon compte</h1>

      <div className="space-y-6">
        <section className="border rounded-xl p-5">
          <h2 className="font-medium mb-3">Profil</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Email :</span> {profile.email}
            </p>
            {profile.full_name && (
              <p>
                <span className="text-gray-500">Nom :</span> {profile.full_name}
              </p>
            )}
          </div>
        </section>

        <section className="border rounded-xl p-5">
          <h2 className="font-medium mb-3">Abonnement</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Plan actuel :</span>{" "}
              <span className="font-medium">{planConfig.name}</span>
              {plan !== "free" && <span className="ml-2 text-brand-600">{planConfig.price.toFixed(2).replace(".", ",")} EUR/mois</span>}
            </p>
            <p>
              <span className="text-gray-500">Conversions ce mois :</span> {profile.conversions_this_month}
              {planConfig.conversionsPerMonth > 0 && ` / ${planConfig.conversionsPerMonth}`}
            </p>
            <p>
              <span className="text-gray-500">Renouvellement :</span>{" "}
              {new Date(profile.conversions_reset_at).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            {plan === "free" ? (
              <Link
                href="/tarifs"
                className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
              >
                Passer au Pro
              </Link>
            ) : (
              <form action="/api/stripe/portal" method="POST">
                <button
                  type="submit"
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Gerer l&apos;abonnement
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
