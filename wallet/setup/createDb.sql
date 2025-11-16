-- I implemented database-level constraints for critical financial rules(non-negative balances, valid transaction types)
-- to ensure data integrity even with concurrent access,
-- while keeping business logic in the application layer.
CREATE SCHEMA IF NOT EXISTS wallet;

CREATE TABLE wallet.players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE wallet.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL UNIQUE REFERENCES wallet.players(id),
    balance BIGINT NOT NULL DEFAULT 0 CHECK (balance >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE wallet.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES wallet.players(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE wallet.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES wallet.players(id),
    session_id UUID NOT NULL REFERENCES wallet.sessions(id),
    type VARCHAR(10) NOT NULL CHECK (type IN ('DEPOSIT', 'WITHDRAW')),
    amount BIGINT NOT NULL CHECK (amount > 0),
    balance_before BIGINT NOT NULL,
    balance_after BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_player_id ON wallet.transactions(player_id);
CREATE INDEX idx_transactions_session_id ON wallet.transactions(session_id);
CREATE INDEX idx_sessions_player_id ON wallet.sessions(player_id);