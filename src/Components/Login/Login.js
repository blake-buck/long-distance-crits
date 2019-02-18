import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//Material UI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';

//styles are declared here
const styles = theme =>({
    container:{
        display:'flex',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        [ theme.breakpoints.down('sm')]:{display:'none'},
        [ theme.breakpoints.up('md')]:
        {
            width:'60%',
            height:'90vh',
            margin:0
        }
    },
    card:{
        height:300,
        [ theme.breakpoints.down('sm')]:{width:'100%'},
        [ theme.breakpoints.up('md')]:{maxWidth:500, width:'30%'}
    },
    cardActions:{
        display:'flex',
        flexDirection:'column', 
        alignItems:'center',
    },
    cardActionsChild:{
        marginTop: theme.spacing.unit *3
    }

})


class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            username:"",
            password:"",
            inputContent:"",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(id, e){
        this.setState({[id] : e.target.value});
    }

    submitLogin(){
        var {username, password} = this.state;
        axios.post('/auth/login', {username, password}).then((results)=>{
            //if the user enters in the correct information they are pushed to the create game component
            this.props.history.push(`/creategame`);
        })
    }

    render(){
        var {username, password} = this.state;
        const {classes} = this.props;

        //The knight img will eventually be replaced with AWS/Firebase
        return(
            <div className={classes.container}>
                
                <img src='https://openclipart.org/download/169898/1336369712.svg' alt='Knight' className={classes.img}/>

                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h4' component='h2'>
                            Login
                        </Typography>
                    </CardContent>

                    <CardActions className={classes.cardActions}>
                        <Input
                            placeholder='Username'
                            defaultValue={username}
                            onChange={(e)=>this.handleChange('username', e)}

                        />
                        <Input
                            placeholder='Password'
                            defaultValue={password}
                            className={classes.cardActionsChild}
                            onChange={(e)=>this.handleChange('password', e)}
                        />
                        <Button
                         variant="contained" 
                         onClick={()=>this.submitLogin()}
                         className={classes.cardActionsChild}
                         >
                            Login
                        </Button>
                        <Button component={Link} to='/register'>
                            Not a user?
                        </Button>
                    </CardActions>
                    
                </Card>
                
            </div>
            
        );
    }

}

Login.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);