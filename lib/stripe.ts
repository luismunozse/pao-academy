import Stripe from 'stripe';

// Use a dummy key for build time, actual key will be checked at runtime
const secretKey = process.env.STRIPE_SECRET_KEY || 'sk_dummy_key_for_build';

export const stripe = new Stripe(secretKey, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

export const isStripeConfigured = () => {
  return !!process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_dummy_key_for_build';
};

export const getStripeJs = async () => {
  const { loadStripe } = await import('@stripe/stripe-js');
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
};
