SELECT * FROM wallet.transactions 
WHERE player_id = $1 AND session_id = $2 
ORDER BY created_at DESC;