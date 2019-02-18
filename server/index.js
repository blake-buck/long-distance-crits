require('dotenv').config();
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


//Sockets.io stuff
const http =require('http').createServer(app);
const io = require('socket.io')(http);

io.set('origins', '*:*');

io.on('connection', (socket) => {
	console.log('A USER CONNECTED');
	var roomID='';
	var lines = [];

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
		lines.push(newLines);
		io.in(roomID).emit('draw', newLines);
	})

	socket.on("disconnect", () => {
		console.log("user disconnected");
		lines=[];
	})
});

app.get('/auth/getuser', getUser);
app.get('/auth/logout', logout);
app.post('/auth/register', register);
app.post('/auth/login', login);



app.get('/api/games', findGamesForUser);
app.get('/api/users/:game', getUsersInGame);
app.get('/api/user/:game/charsheet', getCharsheet);

app.get('/api/game/:game', getGameCardInfo);

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

http.listen(5050, ()=>console.log("listening on port 5050"));