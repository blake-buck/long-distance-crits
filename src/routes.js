import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './Components/Login/Login.js';
import Register from './Components/Register/Register.js';
import CreateGame from './Components/CreateGame/CreateGame.js';
import Game from './Components/Game/Game.js';

//

export default(
    <Switch>
        <Route path='/game/:id' component={Game} />
        <Route path='/creategame' component={CreateGame}/>
        <Route path='/register' component={Register} />
        <Route exact path='/' component={Login} />
    </Switch>
)