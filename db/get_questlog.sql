SELECT *
FROM quest JOIN questlog 
ON quest.questlog_id = questlog.questlog_id
WHERE questlog.game = $1;