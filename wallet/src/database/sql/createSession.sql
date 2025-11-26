INSERT INTO wallet.sessions (player_id)
VALUES ($1)
RETURNING id, player_id, created_at;