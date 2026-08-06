-- Vitality Compass Database Schema
-- Run this after DATABASE_URL is connected

-- Email signups / waitlist
CREATE TABLE IF NOT EXISTS signups (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Users (registered members)
CREATE TABLE IF NOT EXISTS users (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email           TEXT NOT NULL UNIQUE,
  name            TEXT,
  password_hash   TEXT,
  onboarding_done BOOLEAN NOT NULL DEFAULT false,
  stripe_customer_id TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assessment responses (one per user per completion)
CREATE TABLE IF NOT EXISTS assessments (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Onboarding answers (stored as JSON for flexibility)
  onboarding_data JSONB,
  -- 20 assessment question responses: { q1: 4, q2: 3, ... }
  question_scores JSONB NOT NULL,
  -- Computed results
  category        TEXT NOT NULL CHECK (category IN ('Beginner', 'Maintainer', 'Optimizer')),
  pillar_scores   JSONB NOT NULL,
  priority_pillars TEXT[],
  plan_recommended TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subscriptions / memberships
CREATE TABLE IF NOT EXISTS subscriptions (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id           TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  plan_type         TEXT NOT NULL CHECK (plan_type IN ('monthly', 'annual', 'health_audit')),
  status            TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end   TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tips delivery log (for tracking which tips a user has seen)
CREATE TABLE IF NOT EXISTS tips_delivered (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tip_id     TEXT NOT NULL,
  pillar     TEXT NOT NULL,
  delivered_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_assessments_user ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
