require('dotenv').config();
const path = require('path');
const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const {register, login, getUser, logout} = require('./controllers/authController.js');
const {findGamesForUser, createGame, joinGame, getUsersInGame, getCharsheet, getGameCardInfo, updateCharsheet, deleteGame} = require('./controllers/gameController.js');

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

app.use( express.static( `${__dirname}/../build` ) );


//Sockets.io stuff



app.post('/auth/register', register);
app.post('/auth/login', login);

app.get('/auth/getusercookie', (req, res) => {
	console.log('getting User', req.session)
	// res.status(200).json(req.session.user);
	res.json(req.session.user);
});


app.get('/auth/logout', logout);


app.get('/api/gamescount', (req, res) => {
	const db = req.app.get('db');

	db.get_game_count().then(results => {
		console.log('gamescount', results);
		res.json(results);
	})
})
app.get('/api/games', findGamesForUser);
app.get('/api/users/:game', getUsersInGame);
app.get('/api/user/:game/charsheet', getCharsheet);

app.get('/api/game/:game/questlog', (req, res) => {
	const db = req.app.get('db');
	
	db.get_questlog(req.params.game).then(results => {
		console.log('results:', results)
		res.json(results);
	})
})

app.get('/api/game/:game', getGameCardInfo);

app.get('/api/game/:game/canvas', (req, res) => {
	const db = req.app.get('db');
	db.get_game_canvas_dimensions(req.params.game).then(results => {
		res.json(results);
	})
})

app.post('/api/game/:game/quest', (req, res) => {
	const db = req.app.get('db');
	db.get_questlog_id(req.params.game).then(results => {
		console.log(results[0].questlog_id);
		db.create_quest(results[0].questlog_id, req.body.title, req.body.description, req.body.objectives).then(results2 =>{
			res.json(results2);
		}).catch(err => console.log('error at create_quest', err))
	}).catch( err => console.log('error at get_questlog_id', err))
	
})
app.post('/api/game/:game/quest/delete', (req, res) => {
	const db = req.app.get('db');
	db.delete_quest(req.body.quest_id).then(results => {
		res.json('deleted quest');
	})
})
app.put('/api/game/:game/quest', (req, res) => {
	const db = req.app.get('db');
	db.update_quest(req.body.quest_id, req.body.title, req.body.description, req.body.objectives).then(results => {
		res.json('updated quest');
	})
})


app.post('/api/game', createGame);
app.post('/api/useringame', joinGame);

app.put('/api/user/:game/charsheet', updateCharsheet);

app.delete('/api/:game', deleteGame);

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

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const http =require('http').createServer(app);
const io = require('socket.io')(http);

io.set('origins', '*:*');

io.on('connection', (socket) => {
	console.log('A USER CONNECTED');
	var roomID='';
	var lines  = [];
	var widths = [];
	var colors = [];

	socket.on('room', (room)=>{
		roomID=room;
		socket.join(room);
	});

	socket.on('chat message', (message) => {
		io.in(roomID).emit('chat message', message);
	})

	
	socket.on('canvas connection', () => {
		console.log(lines);
		io.in(roomID).emit('canvas connection', lines);
	})
	

	socket.on('draw', (newLines) => {
		lines.push(newLines[0]);
		widths.push(newLines[1]);
		colors.push(newLines[2]);

		io.in(roomID).emit('draw', newLines);
	})

	socket.on('playersCanDraw', (playersCanDraw) => {
		io.in(roomID).emit('playersCanDraw', playersCanDraw);
	})

	socket.on('toggleDisplayGrid', (displayGrid) => {
		io.in(roomID).emit('toggleDisplayGrid', displayGrid);
	})

	socket.on('playersCanMove', (playersCanMove) => {
		io.in(roomID).emit('playersCanMove', playersCanMove);
	})

	socket.on('token drag', (position) => {
		io.in(roomID).emit('token drag', position);
	})

	socket.on('token transform', (transform) => {
		io.in(roomID).emit('token transform', transform);
	})

	socket.on('activeTokens', (activeTokens) => {
		io.in(roomID).emit('activeTokens', activeTokens);
	})

	socket.on('questLog', (questLog) => {
		io.in(roomID).emit('questLog', questLog);
	})

	socket.on('backgroundImage', (backgroundImage) => {
		io.in(roomID).emit('backgroundImage', backgroundImage);
	})

	socket.on("disconnect", () => {
		console.log("user disconnected");
		lines=[];
	})
});


http.listen(5050, ()=>console.log("listening on port 5050"));