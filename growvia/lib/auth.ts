import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

/**
 * Get the currently authenticated user (server-side only).
 * Returns null if not authenticated.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Fetch a user's profile from the profiles table (server-side only).
 * Returns null if not found or on error.
 */
export async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

/**
 * Sign out the current user and redirect to /login (server-side only).
 * Call this from a Server Action.
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
