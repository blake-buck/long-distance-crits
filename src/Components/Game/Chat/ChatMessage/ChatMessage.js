import React, {Component} from 'react';


//Material UI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    paper:{
        
    }
})

class ChatMessage extends Component{
    constructor(props){
        super(props);
        this.state={
            message:"",
            username:""
        }
    }

    componentDidMount(){
        this.setState({message:this.props.message, username:this.props.username});
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({message:this.props.message, username:this.props.username});
        }
    }

    render(){
        var {classes} = this.props;
        var {message, username} = this.state;
        return(
            <Paper className={classes.paper}>
                <Avatar>{message.charAt(0)}</Avatar>
                <Typography component='p'>{message.substring(1, message.length)}</Typography>
            </Paper>
        );
    }

}

ChatMessage.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatMessage);