SELECT *
FROM game JOIN user_in_game 
ON game.game_id = user_in_game.game_id
WHERE user_in_game.user_id = $1;