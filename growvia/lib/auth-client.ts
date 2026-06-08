"use client";

import { createClient } from './supabase/client';

/**
 * Client-side: get the current user session.
 */
export async function getClientUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Client-side: fetch a user's profile from the profiles table.
 */
export async function getClientUserProfile(userId: string) {
  const supabase = createClient();
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
 * Client-side: sign out and redirect to /login.
 */
export async function clientSignOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = '/login';
}
