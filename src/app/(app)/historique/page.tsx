import { createClient } from "@/lib/supabase/server";
import { BANKS } from "@/data/banks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historique des conversions",
};

export default async function HistoriquePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: logs } = await supabase
    .from("conversion_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Historique des conversions</h1>

      {!logs || logs.length === 0 ? (
        <p className="text-gray-500">Aucune conversion pour le moment.</p>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Banque</th>
                <th className="px-4 py-2 font-medium text-right">Transactions</th>
                <th className="px-4 py-2 font-medium text-right">Pages</th>
                <th className="px-4 py-2 font-medium">Format</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={log.id} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-2">{BANKS[log.bank_slug]?.name || log.bank_slug}</td>
                  <td className="px-4 py-2 text-right">{log.transaction_count}</td>
                  <td className="px-4 py-2 text-right">{log.page_count}</td>
                  <td className="px-4 py-2 uppercase text-xs font-medium">{log.export_format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
