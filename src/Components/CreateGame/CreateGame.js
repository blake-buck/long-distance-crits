import React, {Component} from 'react';
import axios from 'axios';
import CreateGameButton from './CreateGameButton/CreateGameButton.js';
import GameCard from './GameCard/GameCard.js';
import JoinGame from './JoinGame/JoinGame.js';
import {Redirect, Link} from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';

//Material UI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const styles = theme =>({
    paper:{
        marginTop:'5%',
        display:'flex',
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column',
            marginTop:'8%'
        },
        [theme.breakpoints.up('md')]:{
            flexWrap:'wrap',
            flexDirection:'row'
        }
        
        
    },
    toolbar:{
        display:'flex',
        justifyContent:'space-between'
    }
})

class CreateGame extends Component{
    constructor(props){
        super(props);
        this.state={
            player_id:0,
            username:"",
            games:[],
            isLoggedIn:false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        axios.get('/auth/getuser').then(results => {
            //If the user successfully logs in they are given a cookie containing their username
            //This checks to see if the user has a username, if they dont they are booted back to the 
            //login page, if they do it gets all the games the user is part of and adds them to state
            if(results.data.username !==undefined){     

                axios.get('/api/games').then(games => {
                    this.setState({
                        username:results.data.username,
                        player_id:results.data.id,
                        games:games.data,
                        isLoggedIn:true
                    })
                })

            }
            else{
                this.props.history.push('/');
            }
        })
    }

    //This logs out the user using req.session.destroy
    logout(){
        axios.get('/auth/logout');
    }    

    render(){
        const {classes} = this.props;
        var {isLoggedIn, createGameTitle, createGamePassword} = this.state;
        return(
            
            <div>
                
                
                {isLoggedIn ? 
                    (<div>
                    
                    <AppBar className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <Typography color='inherit'>
                            {`Welcome, ${this.state.username}`}
                            </Typography>
                            <JoinGame componentDidMount={this.componentDidMount}/>
                            <Button color='inherit' component={Link} to='/' onClick={()=>{this.logout()}}>
                                Logout
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Paper className={classes.paper}>
                        <CreateGameButton componentDidMount={this.componentDidMount} />
                        {
                           this.state.games.map((val) => {
                               return(<GameCard key={val.game_id} game_id={val.game_id} title={val.title} componentDidMount={this.componentDidMount}/>)
                           }) 
                        }
                    </Paper>
                </div>)  
                
                :
                 <LoadingScreen />}
            </div>

        );
    }

}

CreateGame.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CreateGame);