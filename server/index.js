require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const {register, login, getUser} = require('./controllers/authController.js');
const {findGamesForUser, createGame, joinGame} = require('./controllers/gameController.js');

const auth = require('./middleware/auth.js');

const app = express();

const smtpTransport = nodemailer.createTransport({
	service:'gmail',
	host:'smtp.gmail.com',
	auth:{
		user:process.env.GMAIL_AUTH_USERNAME,
		pass:process.env.GMAIL_AUTH_PASSWORD
	}
})

app.use(json());

app.use(
	session({
		secret:process.env.SESSION_SECRET,
		resave:false,
		saveUninitialized:false,
		cookie:{
			maxAge:1000*60*60*24
		}
	})
)

massive(process.env.CONNECTION_STRING).then(db => {
	app.set('db', db);
}).catch(err=>console.log(err));


//Sockets.io stuff
const http =require('http').createServer(app);
const io = require('socket.io')(http);

io.set('origins', '*:*');

io.on('connection', (socket) => {
	//console.log('A USER CONNECTED');
	var roomID='';
	var lines = [];

	socket.on('room', (room)=>{
		console.log(room);
		roomID=room;
		socket.join(room);
		console.log(lines);
		io.in(roomID).emit('canvas connection', lines);
	});

	socket.on('chat message', (message) => {
		io.in(roomID).emit('chat message', message);
	})

	/*
	socket.on('canvas connection', () => {
		io.in(roomID).emit('canvas connection', lines);
	})
	*/

	socket.on('draw', (newLines) => {
		console.log('drawing');
		lines.push(newLines);
		console.log(lines);
		io.in(roomID).emit('draw', newLines);
	})

	socket.on("disconnect", () => console.log("user disconnected"));

});

app.get('/auth/getuser', getUser);
app.get('/auth/logout', (req, res) => {
	req.session.destroy();
	res.json(req.session);
})
app.post('/auth/register', register);
app.post('/auth/login', login);



app.get('/api/games', findGamesForUser);
app.get('/api/users/:game', (req, res) => {
	const db = req.app.get('db');
	db.get_users_in_game(req.params.game).then(results => {
		res.json(results);
	})
})
app.get('/api/user/:game/charsheet', (req, res) => {
	const db = req.app.get('db');
	db.get_charsheet(req.session.user.id, req.params.game).then(results => {
		res.json(results);
	}).catch((err)=>console.log('err at get charsheet', err))
})

app.post('/api/game', createGame);
app.post('/api/useringame', joinGame);

app.put('/api/user/:game/charsheet', (req, res) => {
	const db = req.app.get('db');
	db.get_charsheet(req.session.user.id, req.params.game).then(results => {
		var param = results[0];
		param[req.body.columnTitle]=req.body.value;
		db.update_charsheet(
			req.session.user.id, req.params.game, param.str, param.dex, param.con, param.intel, param.wis, param.cha, param.perception, param.inspiration, param.prof_bonus, param.str_st, param.dex_st, param.con_st, param.int_st, param.wis_st, param.cha_st, param.acrobatics, param.animal_handling, param.arcana, param.athletics, param.deception, param.history, param.insight, param.intimidation, param.investigation, param.medicine, param.nature, param.performance, param.persuasion, param.religion, param.sleight_of_hand, param.stealth, param.survival, param.charclass, param.charlevel, param.race, param.background, param.alignment, param.playername, param.exp, param.ac, param.initiative, param.speed, param.hp_max, param.hp, param.temp_hp, param.hitdice_total, param.hitdice, param.deathsave_successes, param.deathsave_failures, param.attacks_spellcasting,param.equipment, param.copper, param.silver, param.gold, param.platinum, param.personality, param.ideals, param.bonds, param.flaws, param.features_traits, param.languages_proficiencies
			).then(results2 => {
				res.json(results2);
			}).catch(err => console.log("error at update_charsheet", err))
		
	}).catch((err)=>console.log('error at get_charsheet', err));
	
})

app.delete('/api/:game', (req, res) => {
	const db = req.app.get('db');
	db.delete_user_in_game(req.session.user.id, req.params.game).then(results => {
		res.json(results);
	})
})



app.post('/email/reminder', (req, res) => {
	
	
	var mailOption ={
		from:		process.env.GMAIL_AUTH_USERNAME,
		to:			req.body.recipients,
		subject:	'Automatic Long-Distance-Crit reminder',
		text:		`Just a friendly reminder that you have a game starting on ${req.body.dateTime}`
	}

	smtpTransport.sendMail(mailOption, (error, info) =>{
		if(error){
			console.log("Email did not send");
			res.json(error);
		}
		else{
			console.log("Email successfully sent");
			res.json('Email sent: ' + info.response);
		}
	})
	
})

http.listen(5050, ()=>console.log("listening on port 5050"));