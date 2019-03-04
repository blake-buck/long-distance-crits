import React, {Component} from 'react';

//materialUI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const styles = theme =>({
    dice:{
        width:36,
        height:36
    }
})



class Dice extends Component{
    rollDice(numberOfSides){
        var total = Math.floor(Math.random()*numberOfSides)+1;
        this.props.socket.emit('chat message', `!${this.props.username} rolled 1d${numberOfSides}`);
        this.props.socket.emit('chat message', `!${total}`);
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <IconButton onClick={()=>this.rollDice(4)}>
                <img src='https://firebasestorage.googleapis.com/v0/b/long-distance-crits.appspot.com/o/displayImages%2Fdice%2F1d4.png?alt=media&token=0cc08061-0fdd-4a30-a816-745804bd6c4c' alt='1d4' className={classes.dice} />
                </IconButton>
                
                <IconButton onClick={()=>this.rollDice(6)}>
                <img src='https://firebasestorage.googleapis.com/v0/b/long-distance-crits.appspot.com/o/displayImages%2Fdice%2F1d6.png?alt=media&token=b307919e-3abc-418b-a301-7ae838a0eb78' alt='1d6' className={classes.dice}/>
                </IconButton>

                <IconButton onClick={()=>this.rollDice(8)}>
                <img src='https://firebasestorage.googleapis.com/v0/b/long-distance-crits.appspot.com/o/displayImages%2Fdice%2F1d8.png?alt=media&token=0163518e-233d-48d3-91fa-0b630b3348bd' alt='1d8' className={classes.dice}/>
                </IconButton>

                <IconButton onClick={()=>this.rollDice(10)}>
                <img src='https://firebasestorage.googleapis.com/v0/b/long-distance-crits.appspot.com/o/displayImages%2Fdice%2F1d10.png?alt=media&token=6267c106-843f-4245-b7d4-08d3ada07880' alt='1d10' className={classes.dice} />
                </IconButton>

                <IconButton onClick={()=>this.rollDice(12)}>
                <img src='https://firebasestorage.googleapis.com/v0/b/long-distance-crits.appspot.com/o/displayImages%2Fdice%2F1d12.png?alt=media&token=b406cde6-bd1b-4a53-a964-3a135545a53e' alt='1d12' className={classes.dice} />
                </IconButton>
                
                <IconButton onClick={()=>this.rollDice(20)}>
                <img src='https://firebasestorage.googleapis.com/v0/b/long-distance-crits.appspot.com/o/displayImages%2Fdice%2F1d20.png?alt=media&token=fc414178-f5ff-4d37-acc4-3452dea1f418' alt='1d20' className={classes.dice} />
                </IconButton>
            </div>
        );
    }

}

Dice.propTypes ={
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(Dice);