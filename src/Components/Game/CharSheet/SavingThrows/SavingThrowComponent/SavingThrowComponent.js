import React,{Component} from 'react';
import {connect} from 'react-redux';
import {updateCharSheet} from '../../../../../ducks/reducer.js';

//MaterialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Unchecked from '@material-ui/icons/RadioButtonUnchecked';
import Checked from '@material-ui/icons/RadioButtonChecked';
import Input from '@material-ui/core/Input';
import FormControlLabel from'@material-ui/core/FormControlLabel';

const styles = theme => ({
    itemPaper:{
        display:'flex',
        height:30
    },
    checkButton:{
        width:15,
        height:15
    },
    fonts:{
        fontSize:'1.5em'
    }
})

class SavingThrowComponent extends Component{

    constructor(props){
        super(props);
    }

    handleChange(e){
        var {game, columnTitle, charsheet} = this.props;
        this.props.updateCharSheet(game, columnTitle, e.target.value, charsheet);
        this.setState({})
     }

    render(){
        const {classes, label,charsheet, columnTitle} = this.props;
        var value ='';

        if(this.props.charsheet[columnTitle]){
            value = this.props.charsheet[columnTitle];
        }
        else {
            value = this.props.charsheet[0][columnTitle];
        }

        return(
            <Grid item>
                <Paper className={classes.itemPaper}>
                    
                    <FormControlLabel
                        classes={{
                            label:classes.fonts
                        }}
                        
                        control={<Checkbox icon={<Unchecked className={classes.checkButton}/>} checkedIcon={<Checked className={classes.checkButton}/>} checked={charsheet[0][columnTitle] || charsheet[columnTitle]} />}
                        label={label}
                    />
                    <Input className={classes.fonts} value={value} onChange={(e)=>this.handleChange(e)}/>
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = state =>state;

SavingThrowComponent.propTypes ={
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapStateToProps, {updateCharSheet})(SavingThrowComponent));