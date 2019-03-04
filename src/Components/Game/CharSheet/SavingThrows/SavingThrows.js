import React, {Component} from 'react';
import SavingThrowComponent from './SavingThrowComponent/SavingThrowComponent.js';

//materialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from'@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
    inputClass:{
        fontSize:'0.5em'
    }
})

class SavingThrows extends Component{
    render(){
        var {classes, charsheet} = this.props;
        return(
            <Grid item xs={this.props.width} >
              <Paper className={classes.inputClass}>
              <SavingThrowComponent label='Strength' columnTitle='str_st' charsheet={charsheet} game={this.props.game}/>
              <SavingThrowComponent label='Dexterity' columnTitle='dex_st' charsheet={charsheet} game={this.props.game}/>
              <SavingThrowComponent label='Constitution' columnTitle='con_st' charsheet={charsheet} game={this.props.game}/>
              <SavingThrowComponent label='Intelligence' columnTitle='int_st' charsheet={charsheet} game={this.props.game}/>
              <SavingThrowComponent label='Wisdom' columnTitle='wis_st' charsheet={charsheet} game={this.props.game}/>
              <SavingThrowComponent label='Charisma' columnTitle='cha_st' charsheet={charsheet} game={this.props.game}/>
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