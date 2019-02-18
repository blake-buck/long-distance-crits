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
        display:'flex'
    }
})

class SkillComponent extends Component{

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
                        control={<Checkbox icon={<Unchecked />} checkedIcon={<Checked />} checked={charsheet[0][columnTitle] || charsheet[columnTitle]} />}
                        label={label}
                    />
                    <Input value={value} onChange={(e)=>this.handleChange(e)}/>
                   <button onClick={()=>console.log(this.props.charsheet)}>a;dfjkl</button>
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = state =>state;

SkillComponent.propTypes ={
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapStateToProps, {updateCharSheet})(SkillComponent));