-- ============================================================
-- GCC Luxury Real Estate — Private Register Migration
-- Run this in Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Run
-- ============================================================

-- 1. Create table `private_register`
CREATE TABLE IF NOT EXISTS public.private_register (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT NOT NULL UNIQUE
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.private_register ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Allow public insert to private_register" ON public.private_register;
DROP POLICY IF EXISTS "Allow public inserts" ON public.private_register;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.private_register;
DROP POLICY IF EXISTS "Allow authenticated read to private_register" ON public.private_register;

-- 4. Policy: Allow anyone to insert their email to private register
CREATE POLICY "Allow public inserts"
  ON public.private_register
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 5. Policy: Allow authenticated dashboard admins to view registered emails
CREATE POLICY "Allow authenticated read to private_register"
  ON public.private_register
  FOR SELECT
  TO authenticated
  USING (true);

-- 6. Permissions / Grants
GRANT ALL ON TABLE public.private_register TO postgres;
GRANT INSERT ON TABLE public.private_register TO anon, authenticated, public;
GRANT ALL ON TABLE public.private_register TO authenticated, service_role;

-- 7. Indexes
CREATE INDEX IF NOT EXISTS idx_private_register_created_at ON public.private_register (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_private_register_email ON public.private_register (email);
