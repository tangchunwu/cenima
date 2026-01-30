// Runtime-safe Supabase client.
// We intentionally provide a fallback URL/key so the app can run even when Vite env injection fails
// in certain hosted preview environments.
// NOTE: The publishable (anon) key is public by design; security must be enforced with RLS.

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { getSessionId } from "@/lib/sessionUtils";

const FALLBACK_SUPABASE_URL = "https://wslrpjnysjcqtltjhkce.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbHJwam55c2pjcXRsdGpoa2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NTE1MDUsImV4cCI6MjA4NDIyNzUwNX0.Wg-iIO_pa8-_2WBjOm9yitoJ1ZticeXMazZP3Iya7SE";

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

// Get session ID for RLS policies - session_id is passed as custom header
const sessionId = getSessionId();

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'session-id': sessionId
    }
  }
});
