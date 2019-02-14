const bcrypt = require('bcryptjs');

function findGamesForUser(req, res){
	const db = req.app.get('db');
	db.find_games_for_user(req.session.user.id).then(results =>{
		res.json(results);
	})
}

function createGame(req, res){
	const db = req.app.get('db');

	bcrypt.hash(req.body.createGamePassword, 12).then(hashedPassword => {
		db.create_game(req.body.createGameTitle, hashedPassword).then(results => {
			db.add_user_into_game(results[0].game_id, req.session.user.id, 'true').then(results2 =>{
				db.create_charsheet(req.session.user.id, results[0].game_id).then(results3 => {
					res.json(results2);
				})
			})
		})
	})
	
}

function joinGame(req, res){
	const db = req.app.get('db');

	db.find_game(req.body.title).then((results) => {
		if(results[0] && results[0].title === req.body.title ){
			bcrypt.compare(req.body.password, results[0].hash).then(isAuthorized => {
				if(isAuthorized){
					db.add_user_into_game(results[0].game_id, req.session.user.id, 'false').then(results2 => {
						db.create_charsheet(req.session.user.id, results[0].game_id).then(results3 => {
							res.json(results2);
						})
					})
				}
				else{
					res.json("Incorrect password");
				}
			})
		}
	})

}

module.exports ={
    findGamesForUser,
    createGame,
    joinGame
}