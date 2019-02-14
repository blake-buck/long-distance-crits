const bcrypt = require('bcryptjs');

function register(req, res, next){
    const db = req.app.get('db');
    const {username, password} = req.body;
    
    db.find_player(username).then(results =>{
        if(results[0] && results[0].username){
            res.status(409).json("Username already exists");
        }
        else{
            bcrypt.hash(password, 12).then(hashedPassword => {
                db.create_player(username, hashedPassword).then(results2 => {
                    req.session.user ={
                        id: results2[0].player_id,
                        username:username
                    }
                    res.json(req.session.user);
                }).catch(err => console.log("error creating player", err))
                
            })
            
        }

    }).catch(err => console.log("error finding player", err))

}

function login(req, res){
    const db = req.app.get('db');
    const {username, password}=req.body;

    db.find_player(username).then(results => {
        if(results[0] && results[0].username){
            bcrypt.compare(password, results[0].hash).then(isAuthorized => {
                if(isAuthorized){
                    req.session.user ={
                        id: results[0].player_id,
                        username: username
                    }
                    res.json(req.session.user);
                }
                else{
                    res.json("Incorrect password")
                }
            }).catch(err => console.log("err at bcrypt.compare", err))
           
        }
        else{
            res.status(404).json("No such user");
        }
    }).catch(err => console.log("err at /auth/login", err))
}

function getUser(req, res) {
    res.status(200).json(req.session.user);
}

module.exports ={
    register,
    login, 
    getUser
}