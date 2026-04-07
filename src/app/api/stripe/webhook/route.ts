import { stripe } from "@/lib/stripe/client";
import { getPlanFromPriceId } from "@/lib/stripe/plans";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

// Use service role for webhook handler (no user session)
function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } },
  );
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      const plan = session.metadata?.plan;

      if (userId && plan && session.subscription) {
        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        const item = subscription.items.data[0];

        await supabase.from("subscriptions").upsert({
          user_id: userId,
          stripe_subscription_id: subscription.id,
          stripe_price_id: item.price.id,
          plan,
          status: "active",
          current_period_start: new Date(item.current_period_start * 1000).toISOString(),
          current_period_end: new Date(item.current_period_end * 1000).toISOString(),
        }, { onConflict: "stripe_subscription_id" });

        await supabase.from("profiles").update({ plan }).eq("id", userId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const subItem = subscription.items.data[0];
      const priceId = subItem.price.id;
      const plan = getPlanFromPriceId(priceId);

      await supabase
        .from("subscriptions")
        .update({
          stripe_price_id: priceId,
          plan,
          status: subscription.status === "active" ? "active" : subscription.status === "past_due" ? "past_due" : "canceled",
          current_period_start: new Date(subItem.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subItem.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id);

      // Update profile plan
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      if (sub) {
        await supabase.from("profiles").update({ plan }).eq("id", sub.user_id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      const { data: sub } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      await supabase
        .from("subscriptions")
        .update({ status: "canceled", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", subscription.id);

      if (sub) {
        await supabase.from("profiles").update({ plan: "free" }).eq("id", sub.user_id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
