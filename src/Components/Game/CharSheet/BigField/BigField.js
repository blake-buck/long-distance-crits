import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCharSheet} from '../../../../ducks/reducer';

//materialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from'@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    overflow:{
        overflow:'auto'
    }
})

class BigField extends Component{
    

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            
        }
    }

    handleChange(e){
       var {game, columnTitle, charsheet} = this.props;
       var input = e.target.value;

       this.props.updateCharSheet(game, columnTitle, input, charsheet);
       this.setState({})
    }

    render(){
        var {classes, charsheet, columnTitle} = this.props;
        var value='';
        
        if(charsheet[columnTitle]){
            value = charsheet[columnTitle];
        }
        else if(charsheet[0][columnTitle] && charsheet[columnTitle] !== ''){
            value= charsheet[0][columnTitle]
        }
        else {
            value = ''
        }

        return(
            <Grid item xs={this.props.desktopWidth} >
              <Paper>
                <Input multiline fullWidth rows={this.props.rows} className={classes.overflow} value={value} onChange={(e)=>this.handleChange(e)}/>

                <Typography component='p'>
                    {this.props.label}
                </Typography>


              </Paper>
            </Grid>
        )
    }
}

BigField.propTypes ={
    classes: PropTypes.object.isRequired
}
const mapStateToProps =(state) => {
    return{
        charsheet:state.charsheet
    }
};
//
export default withStyles(styles)(connect(mapStateToProps, {updateCharSheet})(BigField));