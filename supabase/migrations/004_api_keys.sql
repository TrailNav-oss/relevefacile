-- API keys for Cabinet plan REST API access

CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Default',
  key_hash TEXT NOT NULL,           -- SHA-256 hash, never store plaintext
  key_prefix TEXT NOT NULL,         -- First 8 chars for display: "rf_live_abc..."
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ           -- NULL = active, set = revoked
);

CREATE INDEX idx_api_keys_user ON api_keys(user_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_manage_own_keys"
  ON api_keys FOR ALL
  USING (user_id = auth.uid());
