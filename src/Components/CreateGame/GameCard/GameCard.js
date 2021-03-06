import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoadingScreen from '../..//LoadingScreen/LoadingScreen.js';

//Material UI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import axios from 'axios';

const styles = themes => ({
    cardContent:{
        textAlign:'left',
    }
})

class GameCard extends Component{

    constructor(props){
        super(props);
        this.state={
            gameTitle:'',
            gameType:'',
            playerNumber:0
        }
    }

    //This makes it so that the information displayed on a game card is dynamic by getting information such as gameTitle, type, and player number from the  database
    componentDidMount(){
        axios.get(`/api/game/${this.props.game_id}`).then(results => {
            this.setState({
                gameTitle:results.data.gameInfo[0].title,
                gameType:results.data.gameInfo[0].game_type,
                playerNumber:results.data.playerNumber
            })
        })
    }


    //deleteGame doesnt delete the entire game, it just deletes the current user from the game
    deleteGame(){
        axios.delete(`/api/${this.props.game_id}`).then( ()=>{
            this.props.componentDidMount();
        })
    }

    
    render(){
        const {classes} = this.props;
        return(
            <div>
            {this.state.gameTitle === '' ? <LoadingScreen /> :
            (<Card>
                <CardContent className={classes.cardContent}>
                    <Typography component='h6' variant='h6'>
                        {this.state.gameTitle}
                    </Typography>

                    <Typography component='p'>
                        Game: {this.state.gameType}
                    </Typography>

                    <Typography component='p'>
                        Number of Players: {this.state.playerNumber}
                    </Typography>

                    <Button component={Link} to={`/game/${this.props.game_id}`}>
                        Start Game
                    </Button>
                    <Button onClick={()=>this.deleteGame()} color='secondary'>Leave Game</Button>
                </CardContent>
            </Card>)
            }
            

            </div>
        );
    }

}

GameCard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GameCard);