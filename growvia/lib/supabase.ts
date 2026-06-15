import { createClient as createBrowserClient } from './supabase/client';

// For backward compatibility and simple client components
export const supabase = createBrowserClient();
