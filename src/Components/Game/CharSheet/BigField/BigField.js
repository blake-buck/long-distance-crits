import React, {Component} from 'react';

//materialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from'@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


const styles = theme => ({
    overflow:{
        overflow:'auto'
    }
})

class BigField extends Component{
    constructor(props){
        super(props);
        this.state={
            defaultValue:this.props.defaultValue
        }
        this.render = this.render.bind(this);
    }

    componentDidMount(){
        this.setState({defaultValue:this.props.defaultValue})
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props){
            this.setState({defaultValue:this.props.defaultValue})
        }
    }

    handleChange(id, e){
        var {game, columnTitle}= this.props;
        axios.put(`/api/user/${this.props.game}/charsheet`, {columnTitle, value:e.target.value})
        this.setState({[id]:e.target.value});
    }

    render(){
        var {classes} = this.props;
        var {defaultValue} = this.state
        return(
            <Grid item xs={this.props.desktopWidth} >
              <Paper>
                <Input multiline fullWidth rows={this.props.rows} className={classes.overflow} value={defaultValue} onChange={(e)=>{this.handleChange('defaultValue', e);  }}/>

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

export default withStyles(styles)(BigField);