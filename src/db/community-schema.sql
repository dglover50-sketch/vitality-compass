-- Vitality Compass Community Chat Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/tizubxhimjmwwqwwayyh/sql/new)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Community Member',
  avatar_url TEXT,
  is_subscriber BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Channels
CREATE TABLE IF NOT EXISTS public.channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT '💬',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Messages
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID REFERENCES public.channels(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: anyone can read, only the user can update their own
CREATE POLICY "Profiles are viewable by all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Channels: anyone can read
CREATE POLICY "Channels are viewable by all" ON public.channels FOR SELECT USING (true);

-- Messages: anyone can read, authenticated users can insert
CREATE POLICY "Messages are viewable by all" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable real-time for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Seed default channels
INSERT INTO public.channels (name, description, slug, icon) VALUES
  ('General', 'Welcome! Chat about anything wellness-related', 'general', '💬'),
  ('Meal Prep', 'Share recipes, tips, and meal prep wins', 'meal-prep', '🥗'),
  ('Workout Buddies', 'Accountability partners for movement', 'workout-buddies', '🏋️'),
  ('Mindset & Sleep', 'Meditation, sleep tips, and mental wellness', 'mindset-sleep', '🧠'),
  ('Success Stories', 'Celebrate your wins — big and small', 'success-stories', '🌟')
ON CONFLICT (slug) DO NOTHING;