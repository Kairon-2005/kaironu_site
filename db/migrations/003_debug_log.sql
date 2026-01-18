-- Temporary debug log table for diagnosing message API errors
-- This table should be removed after debugging is complete

CREATE TABLE IF NOT EXISTS debug_log (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  error_type TEXT,
  message_type TEXT,
  error_message TEXT,
  payload TEXT
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_debug_log_created_at ON debug_log (created_at DESC);
