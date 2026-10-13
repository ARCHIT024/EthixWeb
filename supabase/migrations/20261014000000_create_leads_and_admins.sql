-- ==============================================================================
-- Ethixweb Supabase Schema Migration: Leads & Admin Authorization
-- Migration: 20261014000000_create_leads_and_admins.sql
-- Run this in the Supabase Dashboard SQL Editor
-- ==============================================================================

-- 1. Create Enum for Lead Status Pipeline
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lead_status') THEN
        CREATE TYPE lead_status AS ENUM (
            'new',
            'contacted',
            'qualified',
            'won',
            'lost'
        );
    END IF;
END$$;

-- 2. Create Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    business_name TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT,
    service TEXT NOT NULL,
    budget_range TEXT,
    message TEXT,
    preferred_contact TEXT DEFAULT 'whatsapp',
    status lead_status NOT NULL DEFAULT 'new',
    notes TEXT,
    ip_hash TEXT,
    user_agent TEXT,
    source TEXT DEFAULT 'website'
);

-- 3. Create High-Performance Indexes for Leads Filtering & Pagination
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

-- 4. Create Admins Table for Dashboard Authorization
-- Maps directly to Supabase Auth users (auth.users)
CREATE TABLE IF NOT EXISTS public.admins (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Enable Row Level Security (RLS) on Both Tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies on `leads`
-- ZERO PUBLIC INSERT OR SELECT POLICIES.
-- Public submissions are processed server-side via Next.js Route Handlers using SUPABASE_SERVICE_ROLE_KEY.
-- Authenticated admins can query and update leads via the /admin portal.

DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
CREATE POLICY "Admins can view leads" ON public.leads
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admins
            WHERE admins.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
CREATE POLICY "Admins can update leads" ON public.leads
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admins
            WHERE admins.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admins
            WHERE admins.user_id = auth.uid()
        )
    );

-- 7. RLS Policies on `admins`
DROP POLICY IF EXISTS "Admins can view admin list" ON public.admins;
CREATE POLICY "Admins can view admin list" ON public.admins
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admins
            WHERE admins.user_id = auth.uid()
        )
    );

-- ==============================================================================
-- End of Migration
-- ==============================================================================
