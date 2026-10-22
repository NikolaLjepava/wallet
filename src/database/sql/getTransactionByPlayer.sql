SELECT * FROM wallet.transactions 
WHERE player_id = $1 
ORDER BY created_at DESC;