-- Conversion logs: metadata ONLY (RGPD compliant)
-- NO bank data, NO transaction content, NO amounts, NO account numbers

CREATE TABLE conversion_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  bank_slug TEXT NOT NULL,
  page_count INT NOT NULL DEFAULT 0,
  transaction_count INT NOT NULL DEFAULT 0,
  export_format TEXT NOT NULL CHECK (export_format IN ('csv', 'excel', 'ofx')),
  processing_time_ms INT,
  source TEXT NOT NULL DEFAULT 'web' CHECK (source IN ('web', 'api')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversion_logs_user ON conversion_logs(user_id);
CREATE INDEX idx_conversion_logs_created ON conversion_logs(created_at);

ALTER TABLE conversion_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_logs"
  ON conversion_logs FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "users_insert_own_logs"
  ON conversion_logs FOR INSERT
  WITH CHECK (user_id = auth.uid());
