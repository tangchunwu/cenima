// Runtime-safe Supabase client.
// We intentionally provide a fallback URL/key so the app can run even when Vite env injection fails
// in certain hosted preview environments.
// NOTE: The publishable (anon) key is public by design; security must be enforced with RLS.

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const FALLBACK_SUPABASE_URL = "https://huneabopgpnqmuxxakgy.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bmVhYm9wZ3BucW11eHhha2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2ODE1MzUsImV4cCI6MjA4NDI1NzUzNX0.yqdztZceofDzyJcymVYC_vHNYrLI2B-i7HFUfJqIZWE";

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  FALLBACK_SUPABASE_URL;

const SUPABASE_PUBLISHABLE_KEY =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  FALLBACK_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL) {
  // This should never happen due to fallback, but keep a clear runtime hint.
  // Avoid logging keys.
  // eslint-disable-next-line no-console
  console.error("Supabase URL missing. Check VITE_SUPABASE_URL.");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
