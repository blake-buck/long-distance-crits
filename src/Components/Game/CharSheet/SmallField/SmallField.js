import React, {Component} from 'react';
import axios from 'axios';
//materialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from'@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    inputClass:{
        fontSize:'3.5em',
    }
})

class SmallField extends Component{
    constructor(props){
        super(props);
        this.state ={
            defaultValue:this.props.defaultValue
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({defaultValue:this.props.defaultValue})
        }
    }

    handleChange(id, e){
        var {game, columnTitle, type}= this.props;
        var input = e.target.value;
        var checker = input.match(/[1-9]/g);

        if(type==='number'){
            if(checker){
                axios.put(`/api/user/${this.props.game}/charsheet`, {columnTitle, value:checker.join("")})
                this.setState({[id]:e.target.value});
            }
        }
        else if(type==='text'){
            axios.put(`/api/user/${this.props.game}/charsheet`, {columnTitle, value:input})
            this.setState({[id]:e.target.value});
        }
    }

    render(){
        var {classes} = this.props;
        return(
            <Grid item xs={this.props.desktopWidth} >
              <Paper>
                <Input className={classes.inputClass} value={this.state.defaultValue} type={this.props.type} onChange={(e)=>this.handleChange('defaultValue', e)}/>

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

export default withStyles(styles)(SmallField);