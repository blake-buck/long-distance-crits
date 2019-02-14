INSERT INTO player(username, hash)
    VALUES ($1, $2);
SELECT * FROM player WHERE username=$1;