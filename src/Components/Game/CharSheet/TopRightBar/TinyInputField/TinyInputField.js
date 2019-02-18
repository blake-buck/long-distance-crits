import React,{Component} from 'react';
import {connect} from 'react-redux';
import {updateCharSheet} from '../../../../../ducks/reducer';

//materialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from'@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

const styles = theme => (
    {
    inputClass:{
        fontSize:'1em',
        fontWeight:'bold'
    }
})

class TinyInputField extends Component{

    handleChange(e){
        var {game, columnTitle, type, charsheet}= this.props;
        var input = e.target.value;
        var checker = input.match(/[1-9]/g);

        console.log(checker);

        if(type==='number'){
            if(checker){
                this.props.updateCharSheet(game, columnTitle, Number(checker.join('')), charsheet);
            }
        }
        else if(type==='text'){
            this.props.updateCharSheet(game, columnTitle, input, charsheet);
        }
        this.setState({})
    }

    render(){
        var {classes, charsheet, columnTitle, defaultValue} = this.props;
        var value ='';
        //console.log(this.props);

        if(this.props.charsheet[columnTitle]){
            value = this.props.charsheet[columnTitle];
        }
        else {
            value = defaultValue
        }
        return(
            <Grid item xs={4}>
                <Paper elevation={1}>
                    <Input className={classes.inputClass} value={value} onChange={(e)=>this.handleChange(e)}/>
                    <Typography component='p'>
                        {this.props.label}
                    </Typography>
                </Paper>
            </Grid>
        )
    }

}

TinyInputField.propTypes ={
    classes: PropTypes.object.isRequired
}

const mapStateToProps =(state) => {
    return{
        charsheet:state.charsheet
    }
};

export default withStyles(styles)(connect(mapStateToProps, {updateCharSheet})(TinyInputField));