import { createServerFn } from "@tanstack/react-start";
import Stripe from "stripe";

// Initialize Stripe — requires STRIPE_SECRET_KEY env var
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY environment variable is not set");
  return new Stripe(key);
}

export const startTrial = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; paymentMethodId: string }) => {
    if (!data.name || data.name.length < 2) throw new Error("Name is required");
    if (!data.email || !data.email.includes("@")) throw new Error("Valid email is required");
    if (!data.paymentMethodId) throw new Error("Payment method is required");
    return data;
  })
  .handler(async ({ data }) => {
    const stripe = getStripe();
    const trialEnd = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days from now

    try {
      // 1. Create a Stripe Customer
      const customer = await stripe.customers.create({
        name: data.name,
        email: data.email,
        payment_method: data.paymentMethodId,
        invoice_settings: {
          default_payment_method: data.paymentMethodId,
        },
      });

      // 2. Create a subscription with 7-day trial
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: "price_1TtpyrDAbDejoGfj0o39EM8l" }], // Monthly Guidance
        trial_end: trialEnd,
        payment_settings: {
          save_default_payment_method: "on_subscription",
        },
        expand: ["latest_invoice.payment_intent"],
      });

      // 3. Store in our database
      const { execSync } = await import("node:child_process");
      const trialEndISO = new Date(trialEnd * 1000).toISOString();

      const insertSQL = `INSERT INTO subscriptions (email, name, stripe_customer_id, stripe_subscription_id, trial_end, status) VALUES ('${data.email.replace(/'/g, "''")}', '${data.name.replace(/'/g, "''")}', '${customer.id}', '${subscription.id}', '${trialEndISO}', 'trialing')`;
      
      // Use the shared team-db tool for the insert
      // Since we're in a server function, we execute SQL directly
      const { exec } = await import("node:child_process");
      exec(`team-db "${insertSQL}"`, (error) => {
        if (error) console.error("DB insert error:", error);
      });

      return {
        success: true,
        trialEnd: trialEndISO,
        daysRemaining: 7,
        subscriptionId: subscription.id,
      };
    } catch (error: any) {
      console.error("Stripe trial creation error:", error);
      throw new Error(error.message || "Failed to create trial subscription");
    }
  });

// Check trial status
export const getTrialStatus = createServerFn({ method: "GET" })
  .validator((data: { email: string }) => {
    if (!data.email) throw new Error("Email is required");
    return data;
  })
  .handler(async ({ data }) => {
    const { execSync } = await import("node:child_process");
    try {
      const result = execSync(
        `team-db "SELECT * FROM subscriptions WHERE email = '${data.email.replace(/'/g, "''")}'"`,
        { encoding: "utf-8" }
      );
      const rows = JSON.parse(result);
      if (rows.length === 0) return { active: false, inTrial: false };

      const sub = rows[0];
      const trialEnd = new Date(sub.trial_end);
      const now = new Date();
      const daysRemaining = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

      return {
        active: true,
        inTrial: daysRemaining > 0 && sub.status === "trialing",
        daysRemaining,
        trialEnd: sub.trial_end,
        status: sub.status,
      };
    } catch {
      return { active: false, inTrial: false };
    }
  });