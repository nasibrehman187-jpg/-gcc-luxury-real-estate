// ============================================================
//  GCC Luxury Real Estate — Supabase Client & API
// ============================================================

import { createClient } from '@supabase/supabase-js';

// Support both standard VITE_ prefixed env and non-prefixed env
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  '';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  '';

// Check if credentials have been populated with real values
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-ref') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

// Initialize client if credentials exist
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Inserts a new viewing inquiry into the Supabase `inquiries` table
 * @param {Object} inquiry
 * @param {string} inquiry.property_name
 * @param {string} inquiry.name
 * @param {string} inquiry.email
 * @param {string} inquiry.phone
 * @param {string} [inquiry.message]
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function submitInquiry({ property_name, name, email, phone, message }) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error(
      'Supabase is not configured yet. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
    );
  }

  // NOTE: We do not chain .select() here.
  // In Supabase / Postgres RLS, chaining .select() forces a RETURNING * clause which requires
  // SELECT permission for the anon role. Since anonymous visitors should only insert inquiries
  // and not read table contents, standard .insert() works securely without RLS select violations.
  const { data, error } = await supabase
    .from('inquiries')
    .insert([
      {
        property_name,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message ? message.trim() : null,
      },
    ]);

  if (error) {
    console.error('Supabase inquiries insert error:', error);
    throw new Error(error.message || 'Failed to submit inquiry. Please try again.');
  }

  return { success: true, data };
}

/**
 * Inserts a new VIP email into the Supabase `private_register` table
 * @param {string} email
 * @returns {Promise<{success: boolean, alreadyRegistered?: boolean, data?: any}>}
 */
export async function submitPrivateRegister(email) {
  const trimmed = email ? email.trim() : '';

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!isSupabaseConfigured() || !supabase) {
    throw new Error(
      'Supabase is not configured yet. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
    );
  }

  const { data, error } = await supabase
    .from('private_register')
    .insert([{ email: trimmed.toLowerCase() }]);

  if (error) {
    // Check if email already registered (PostgreSQL unique violation code 23505)
    if (error.code === '23505') {
      return { success: true, alreadyRegistered: true };
    }
    console.error('Supabase private_register error:', error);
    throw new Error(error.message || 'Unable to join the private register. Please try again.');
  }

  return { success: true, data };
}
