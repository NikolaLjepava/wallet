INSERT INTO wallet.wallets (player_id, balance)
VALUES ($1, 0)
RETURNING id, player_id, balance, created_at, updated_at;