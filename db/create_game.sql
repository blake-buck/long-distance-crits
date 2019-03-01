INSERT INTO game(title, game_type, hours_played, hash, canvas_width, canvas_height)
    VALUES ($1, 'DND', 0, $2, $3, $4)
    RETURNING game_id;