-- Messages table for the digital doppler message system
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  type TEXT NOT NULL CHECK (type IN ('public','treehole','private')),
  body TEXT NOT NULL,
  nickname TEXT,
  wants_reply BOOLEAN NOT NULL DEFAULT false,
  email TEXT,
  key_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  admin_notes TEXT,
  ip_hash TEXT,
  user_agent TEXT
);

-- Replies table for storing admin responses
CREATE TABLE IF NOT EXISTS replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reply_body TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_type_status ON messages (type, status);
CREATE INDEX IF NOT EXISTS idx_messages_key_hash ON messages (key_hash) WHERE key_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_messages_wants_reply ON messages (wants_reply) WHERE wants_reply = true;
CREATE INDEX IF NOT EXISTS idx_replies_message_id ON replies (message_id);
CREATE INDEX IF NOT EXISTS idx_replies_published ON replies (published, published_at) WHERE published = true;