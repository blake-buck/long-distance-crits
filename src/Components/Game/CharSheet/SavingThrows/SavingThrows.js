import React, {Component} from 'react';

//materialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from'@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import TextField  from '@material-ui/core/TextField';


const styles = theme => ({
    inputClass:{
        fontSize:'0.5em'
    }
})

class SavingThrows extends Component{
    render(){
        var {classes} = this.props;
        return(
            <Grid item xs={this.props.width} >
              <Paper className={classes.inputClass}>
                <TextField label='Strength' className={classes.inputClass}/>

                <TextField label='Dexterity' className={classes.inputClass}/>

                <TextField label='Constitution' className={classes.inputClass}/>

                <TextField label='Intelligence' className={classes.inputClass}/>

                <TextField label='Wisdom' className={classes.inputClass}/>

                <TextField label='Charisma' className={classes.inputClass}/>

                <Typography component='p'>
                    Saving Throws
                </Typography>


              </Paper>
            </Grid>
        )
    }
}

SavingThrows.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SavingThrows);