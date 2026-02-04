/*
  # Webinar Registration System

  1. New Tables
    - `webinar_registrations`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required, unique)
      - `phone` (text, required)
      - `created_at` (timestamp)
      - `utm_source` (text, optional - for tracking)
      - `utm_campaign` (text, optional - for tracking)

  2. Security
    - Enable RLS on `webinar_registrations` table
    - Add policy for public inserts (anyone can register)
    - Add policy for authenticated admin reads only
*/

CREATE TABLE IF NOT EXISTS webinar_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  utm_source text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to register (insert)
CREATE POLICY "Anyone can register for webinar"
  ON webinar_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view registrations (for admin dashboard later)
CREATE POLICY "Authenticated users can view registrations"
  ON webinar_registrations
  FOR SELECT
  TO authenticated
  USING (true);
