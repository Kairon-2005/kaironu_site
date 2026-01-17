-- Messages table for the letterbox system
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  mode TEXT NOT NULL CHECK (mode IN ('public','private')),
  reply_preference TEXT NOT NULL CHECK (reply_preference IN ('none','key')),
  display_name TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT true,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  admin_tags TEXT[] DEFAULT '{}',
  ip_hash TEXT,
  user_agent TEXT,
  reply_key_hash TEXT,
  reply_text TEXT,
  replied_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_mode_status ON messages (mode, status);
CREATE INDEX IF NOT EXISTS idx_messages_reply_preference ON messages (reply_preference);
CREATE INDEX IF NOT EXISTS idx_messages_ip_hash_created ON messages (ip_hash, created_at);