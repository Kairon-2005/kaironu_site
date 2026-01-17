-- Migration script to update existing messages table to new schema
-- Run this in Vercel Postgres console after backing up your data

-- First, add new columns if they don't exist
ALTER TABLE messages 
ADD COLUMN IF NOT EXISTS type TEXT,
ADD COLUMN IF NOT EXISTS nickname TEXT,
ADD COLUMN IF NOT EXISTS wants_reply BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS email TEXT;

-- Rename old column if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND column_name = 'reply_key_hash') THEN
        ALTER TABLE messages RENAME COLUMN reply_key_hash TO key_hash;
    END IF;
END $$;

-- Migrate data from old schema to new schema
UPDATE messages SET 
    type = CASE 
        WHEN mode = 'public' THEN 'public'
        WHEN mode = 'private' AND reply_preference = 'key' THEN 'private'
        WHEN mode = 'private' AND reply_preference = 'none' THEN 'treehole'
        ELSE 'treehole'
    END,
    nickname = CASE 
        WHEN is_anonymous = false THEN display_name 
        ELSE NULL 
    END,
    wants_reply = CASE 
        WHEN reply_preference = 'key' THEN true
        ELSE false
    END
WHERE type IS NULL;

-- Add constraints for new columns
ALTER TABLE messages ALTER COLUMN type SET NOT NULL;
ALTER TABLE messages ALTER COLUMN wants_reply SET NOT NULL;
ALTER TABLE messages ADD CONSTRAINT check_type CHECK (type IN ('public','treehole','private'));

-- Create replies table if it doesn't exist
CREATE TABLE IF NOT EXISTS replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reply_body TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ
);

-- Migrate existing reply data to replies table
INSERT INTO replies (message_id, reply_body, created_at)
SELECT id, reply_text, COALESCE(replied_at, now())
FROM messages 
WHERE reply_text IS NOT NULL AND reply_text != ''
ON CONFLICT DO NOTHING;

-- Drop old columns (uncomment these lines after verifying data migration)
-- ALTER TABLE messages DROP COLUMN IF EXISTS mode;
-- ALTER TABLE messages DROP COLUMN IF EXISTS reply_preference;
-- ALTER TABLE messages DROP COLUMN IF EXISTS display_name;
-- ALTER TABLE messages DROP COLUMN IF EXISTS is_anonymous;
-- ALTER TABLE messages DROP COLUMN IF EXISTS admin_tags;
-- ALTER TABLE messages DROP COLUMN IF EXISTS reply_text;
-- ALTER TABLE messages DROP COLUMN IF EXISTS replied_at;

-- Create new indexes
CREATE INDEX IF NOT EXISTS idx_messages_type_status ON messages (type, status);
CREATE INDEX IF NOT EXISTS idx_messages_key_hash ON messages (key_hash) WHERE key_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_messages_wants_reply ON messages (wants_reply) WHERE wants_reply = true;
CREATE INDEX IF NOT EXISTS idx_replies_message_id ON replies (message_id);
CREATE INDEX IF NOT EXISTS idx_replies_published ON replies (published, published_at) WHERE published = true;

-- Drop old indexes that may not be needed
-- DROP INDEX IF EXISTS idx_messages_mode_status;
-- DROP INDEX IF EXISTS idx_messages_reply_preference;
-- DROP INDEX IF EXISTS idx_messages_ip_hash_created;