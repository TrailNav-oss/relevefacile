export function TestModeBanner() {
  const isTestMode = process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_");
  if (!isTestMode) return null;

  return (
    <div className="bg-yellow-400 text-yellow-900 text-center text-sm py-1.5 px-4 font-medium">
      Mode test — les paiements ne sont pas reels. Carte : 4242 4242 4242 4242, date future, CVC quelconque.
    </div>
  );
}
