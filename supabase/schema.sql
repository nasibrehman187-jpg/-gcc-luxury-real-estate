-- ============================================================
-- GCC Luxury Real Estate — Database Schema & RLS Policies
-- Paste and Run in: Supabase Dashboard -> SQL Editor -> New Query
-- ============================================================

-- ============================================================
-- 1. Table: `inquiries` (Property Viewing Requests)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  property_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Allow public insert to inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public inserts" ON public.inquiries;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.inquiries;
DROP POLICY IF EXISTS "Allow authenticated read to inquiries" ON public.inquiries;

-- Policy: Allow public / anon visitors to insert viewing inquiries
CREATE POLICY "Allow public inserts"
  ON public.inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow authenticated dashboard admins to read inquiries
CREATE POLICY "Allow authenticated read to inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Grants
GRANT ALL ON TABLE public.inquiries TO postgres;
GRANT INSERT ON TABLE public.inquiries TO anon, authenticated, public;
GRANT ALL ON TABLE public.inquiries TO authenticated, service_role;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_property_name ON public.inquiries (property_name);


-- ============================================================
-- 2. Table: `private_register` (VIP Off-Market Email List)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.private_register (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT NOT NULL UNIQUE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.private_register ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Allow public insert to private_register" ON public.private_register;
DROP POLICY IF EXISTS "Allow public inserts" ON public.private_register;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.private_register;
DROP POLICY IF EXISTS "Allow authenticated read to private_register" ON public.private_register;

-- Policy: Allow public / anon visitors to join private register
CREATE POLICY "Allow public inserts"
  ON public.private_register
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow authenticated dashboard admins to view registered VIP emails
CREATE POLICY "Allow authenticated read to private_register"
  ON public.private_register
  FOR SELECT
  TO authenticated
  USING (true);

-- Grants
GRANT ALL ON TABLE public.private_register TO postgres;
GRANT INSERT ON TABLE public.private_register TO anon, authenticated, public;
GRANT ALL ON TABLE public.private_register TO authenticated, service_role;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_private_register_created_at ON public.private_register (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_private_register_email ON public.private_register (email);
