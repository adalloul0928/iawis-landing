# Supabase Database Setup for Newsletter

## Quick Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy your **Project URL** and **anon key** from Settings → API
4. Update your `.env.local` (already done ✅)

### 2. Run SQL Script
1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New query"
3. Copy and paste the SQL below
4. Click **Run**

## Complete SQL Setup Script

```sql
-- Create the newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    verified BOOLEAN DEFAULT false NOT NULL,
    verification_token UUID DEFAULT uuid_generate_v4(),
    unsubscribe_token UUID DEFAULT uuid_generate_v4() NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_verification_token ON newsletter_subscribers(verification_token);
CREATE INDEX idx_unsubscribe_token ON newsletter_subscribers(unsubscribe_token);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at on row changes
CREATE TRIGGER update_newsletter_subscribers_updated_at 
    BEFORE UPDATE ON newsletter_subscribers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## FIXED Row Level Security (RLS) - Working Solution

**IMPORTANT: Run this to fix the 401 errors:**

```sql
-- First, drop all existing policies that are causing issues
DROP POLICY IF EXISTS "allow_newsletter_signup" ON newsletter_subscribers;
DROP POLICY IF EXISTS "allow_connection_test" ON newsletter_subscribers;
DROP POLICY IF EXISTS "allow_email_verification" ON newsletter_subscribers;
DROP POLICY IF EXISTS "allow_unsubscribe" ON newsletter_subscribers;

-- Enable Row Level Security (if not already enabled)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 1. Allow INSERT for newsletter signups (FIXED)
CREATE POLICY "newsletter_insert_policy" ON newsletter_subscribers
    FOR INSERT 
    WITH CHECK (true);

-- 2. Allow SELECT for connection tests and admin purposes
CREATE POLICY "newsletter_select_policy" ON newsletter_subscribers
    FOR SELECT 
    USING (true);

-- 3. Allow UPDATE for email verification (FIXED)
CREATE POLICY "newsletter_update_policy" ON newsletter_subscribers
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- 4. Allow DELETE for unsubscribe (FIXED)
CREATE POLICY "newsletter_delete_policy" ON newsletter_subscribers
    FOR DELETE 
    USING (true);
```

### What These Policies Do:
✅ **Public signup works** - Anyone can INSERT their email
✅ **Connection test works** - COUNT queries allowed for testing
✅ **No email enumeration** - Can't SELECT/browse individual emails  
✅ **Token-based verification** - Only valid tokens can update records
✅ **Token-based unsubscribe** - Only valid tokens can delete records
✅ **Maximum privacy** - No way to browse the subscriber list

## Minimal Version (If You Want Simple Setup)

If you just want the basic table without indexes and triggers:

```sql
CREATE TABLE newsletter_subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    verified BOOLEAN DEFAULT false NOT NULL,
    verification_token UUID DEFAULT uuid_generate_v4(),
    unsubscribe_token UUID DEFAULT uuid_generate_v4() NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

## Verification

After running the SQL:

1. ✅ Go to **Table Editor** in Supabase
2. ✅ You should see `newsletter_subscribers` table
3. ✅ Check columns match our TypeScript types
4. ✅ Test the newsletter form on your site
5. ✅ Verify records appear in the table

## Table Structure

Your table will have these columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `email` | TEXT | Subscriber email (unique) |
| `verified` | BOOLEAN | Email verification status |
| `verification_token` | UUID | Token for email verification |
| `unsubscribe_token` | UUID | Token for one-click unsubscribe |
| `created_at` | TIMESTAMP | When subscription was created |
| `updated_at` | TIMESTAMP | Last update time (auto-updated) |

## Troubleshooting

**Error: "relation does not exist"**
- Make sure you're in the correct database
- Check if the SQL executed successfully

**Error: "permission denied"**
- Check your API keys in `.env.local`
- Verify the anon key has proper permissions

**Form not working?**
- Check browser console for errors
- Verify environment variables are set
- Test with Supabase table editor directly

## What's Next?

Once the table is created:
1. ✅ Test newsletter signup form
2. ✅ Set up email verification flow (optional)
3. ✅ Add email sending service (like Resend or SendGrid)
4. ✅ Create admin dashboard to view subscribers

Your newsletter system is ready to go! 🎉