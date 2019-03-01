import React, {Component} from 'react';

//materialUI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';

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
                <img src='' alt='1d4' className={classes.dice} />
                </IconButton>
                
                <IconButton onClick={()=>this.rollDice(6)}>
                <img src='' alt='1d6' className={classes.dice}/>
                </IconButton>

                <IconButton onClick={()=>this.rollDice(8)}>
                <img src='' alt='1d8' className={classes.dice}/>
                </IconButton>

                <IconButton onClick={()=>this.rollDice(10)}>
                <img src='' alt='1d10' className={classes.dice} />
                </IconButton>

                <IconButton onClick={()=>this.rollDice(12)}>
                <img src='' alt='1d12' className={classes.dice} />
                </IconButton>
                
                <IconButton onClick={()=>this.rollDice(20)}>
                <img src='' alt='1d20' className={classes.dice} />
                </IconButton>
            </div>
        );
    }

}

Dice.propTypes ={
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(Dice);