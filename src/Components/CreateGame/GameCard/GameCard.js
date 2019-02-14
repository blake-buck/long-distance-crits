import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//Material UI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import axios from 'axios';

const styles = themes => ({
    cardContent:{
        textAlign:'left'
    }
})

class GameCard extends Component{

    deleteGame(){
        axios.delete(`/api/${this.props.game_id}`).then( ()=>{
            this.props.componentDidMount();
        })
    }

    
    render(){
        const {classes} = this.props;
        return(
            <Card>
                <CardContent className={classes.cardContent}>
                    <Typography component='p'>
                        Players:
                    </Typography>
                    <Typography component='p'>
                        Hours Played:
                    </Typography>
                    <Button component={Link} to={`/game/${this.props.game_id}`}>
                        Start Game
                    </Button>
                    <Button onClick={()=>this.deleteGame()} color='secondary'>Leave Game</Button>
                </CardContent>
                <CardActions>
                    <TextField defaultValue={this.props.title} variant='outlined'/>
                </CardActions>
            </Card>
        );
    }

}

GameCard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GameCard);