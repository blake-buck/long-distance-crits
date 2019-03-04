import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCharSheet} from '../../../../ducks/reducer'

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
        fontSize:'3.5em',
    }
})

class SmallField extends Component{

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){

        }
    }

    handleChange(id, e){
        var {game, columnTitle, type, charsheet}= this.props;
        var input = e.target.value;
        var checker = input.match(/[1-9]/g);

        if(type==='number'){
            if(checker){
                this.props.updateCharSheet(game, columnTitle, input, charsheet);
            }
        }
        else if(type==='text'){
            this.props.updateCharSheet(game, columnTitle, input, charsheet);
        }
        this.setState({})
    }

    render(){
        var {classes, columnTitle} = this.props;
        var value='';

        if(this.props.charsheet[columnTitle]){
            value = this.props.charsheet[columnTitle];
        }
        else if(this.props.charsheet[0][columnTitle] && this.props.charsheet[columnTitle] !== ''){
            value= this.props.charsheet[0][columnTitle]
        }
        else {
            value = ''
        }

        return(
            <Grid item xs={this.props.desktopWidth} >
              <Paper>
                <Input className={classes.inputClass} value={value} type={this.props.type} onChange={(e)=>this.handleChange('defaultValue', e)}/>

                <Typography component='p'>
                    {this.props.label}
                </Typography>


              </Paper>
            </Grid>
        )
    }
}

SmallField.propTypes ={
    classes: PropTypes.object.isRequired
}

const mapStateToProps =(state) => {
    return{
        charsheet:state.charsheet
    }
};

export default withStyles(styles)(connect(mapStateToProps, {updateCharSheet})(SmallField));