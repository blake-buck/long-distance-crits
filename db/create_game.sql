INSERT INTO game(title, game_type, hours_played, hash)
    VALUES ($1, 'DND', 0, $2)
    RETURNING game_id;