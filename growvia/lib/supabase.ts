import { createClient as createBrowserClient } from './supabase/client';

// For backward compatibility and simple client components
type BrowserClient = ReturnType<typeof createBrowserClient>;

let browserClient: BrowserClient | null = null;

function getSupabaseClient() {
  if (!browserClient) {
    browserClient = createBrowserClient();
  }

  return browserClient;
}

export const supabase = new Proxy({} as BrowserClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabaseClient(), prop, receiver);
  },
});
