INSERT INTO wallet.players (username)
VALUES ($1)
RETURNING id, username, created_at;