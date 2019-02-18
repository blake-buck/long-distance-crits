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

function getUsersInGame(req, res){
	const db = req.app.get('db');
	db.get_users_in_game(req.params.game).then(results => {
		res.json(results);
	})
}
function getCharsheet(req, res){
	const db = req.app.get('db');
	db.get_charsheet(req.session.user.id, req.params.game).then(results => {
		res.json(results);
	}).catch((err)=>console.log('err at get charsheet', err))
}

function getGameCardInfo(req, res){
	const db = req.app.get('db');
	let playerNumber= 0;

	db.get_users_in_game(req.params.game).then(results =>{
		playerNumber = results.length;
		db.get_game_info_for_gamecard(results[0].game_id).then(results2 => {
			
			res.json({
				gameInfo:results2,
				playerNumber:playerNumber
			})
		})

	})
}

function updateCharsheet(req, res){
	const db = req.app.get('db');
	db.get_charsheet(req.session.user.id, req.params.game).then(results => {
		var param = results[0];
		param[req.body.columnTitle]=req.body.value;
		db.update_charsheet(
			req.session.user.id, req.params.game, param.str, param.dex, param.con, param.intel, param.wis, param.cha, param.perception, param.inspiration, param.prof_bonus, param.str_st, param.dex_st, param.con_st, param.int_st, param.wis_st, param.cha_st, param.acrobatics, param.animal_handling, param.arcana, param.athletics, param.deception, param.history, param.insight, param.intimidation, param.investigation, param.medicine, param.nature, param.performance, param.persuasion, param.religion, param.sleight_of_hand, param.stealth, param.survival, param.charclass, param.charlevel, param.race, param.background, param.alignment, param.playername, param.exp, param.ac, param.initiative, param.speed, param.hp_max, param.hp, param.temp_hp, param.hitdice_total, param.hitdice, param.deathsave_successes, param.deathsave_failures, param.attacks_spellcasting,param.equipment, param.copper, param.silver, param.gold, param.platinum, param.personality, param.ideals, param.bonds, param.flaws, param.features_traits, param.languages_proficiencies, param.character_name
			).then(results2 => {
				res.json(results2);
			}).catch(err => console.log("error at update_charsheet", err))
		
	}).catch((err)=>console.log('error at get_charsheet', err));
}

function deleteGame(req, res){
	const db = req.app.get('db');
	db.delete_user_in_game(req.session.user.id, req.params.game).then(results => {
		res.json(results);
	})
}

module.exports ={
    findGamesForUser,
    createGame,
	joinGame,
	getUsersInGame,
	getCharsheet,
	getGameCardInfo,
	updateCharsheet,
	deleteGame
}