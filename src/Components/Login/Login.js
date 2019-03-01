//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BEFORE PUSHING ANYTHING MORE TO GITHUB, MAKE SURE firebase.js DOESNT NEED TO BE IN THE .gitignore
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import firebase from '../../firebase.js';

//Material UI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import AppBar  from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

//styles are declared here
const styles = theme =>({
    toolbar:{
        [ theme.breakpoints.down('sm')]:{
            display:'flex',
            justifyContent:'center',
        },
        [ theme.breakpoints.up('md')]:{
        display:'flex',
        justifyContent:'space-between',
        paddingTop:'.5vh',
        paddingBottom:'.5vh'
        }
    },
    cardContent:{
        backgroundColor:'#3F51B5',
        color:'white',
        [ theme.breakpoints.down('sm')]:{
            backgroundColor:'white',
            color:'black'
        },
        
    },
    container:{
        display:'flex',
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:'8vh',
        
    },
    img:{
        [ theme.breakpoints.down('sm')]:{display:'none'},
        [ theme.breakpoints.up('md')]:
        {
            width:'40%',
            height:'90vh',
            margin:0,
            marginTop:'1%'
        },
        [ theme.breakpoints.up('lg')]:
        {
            width:'40%',
            height:'90vh',
            margin:0,
            minHeight:500,
            marginTop:'1%'
        }
    },
    diceIcon:{
        height:'7vh',
        [ theme.breakpoints.down('sm')]:{display:'none'},
    },
    card:{
        
        [ theme.breakpoints.down('sm')]:{width:'100%', height:'100vh'},
        [ theme.breakpoints.up('md')]:{maxWidth:500, width:'30%', height:300}
    },
    cardActions:{
        display:'flex',
        flexDirection:'column', 
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto'
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
            displayD20URL:'',
            knightURL:''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        firebase.storage().ref(`displayImages/displayd20.png`).getDownloadURL().then((url) =>{
            this.setState({displayD20URL:url})
        })
        firebase.storage().ref(`displayImages/knight.png`).getDownloadURL().then((url) =>{
            this.setState({knightURL:url})
        })
    }

    handleChange(id, e){
        this.setState({[id] : e.target.value});
    }

    submitLogin(e){
        e.preventDefault();
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
            <AppBar>
                <Toolbar className={classes.toolbar}>
                
                <img src={this.state.displayD20URL} alt='1d20' className={classes.diceIcon} />

                <Typography variant='h5' component='h3' color='inherit'>
                    Long Distance Crits
                </Typography>
                </Toolbar>
            </AppBar>

                <img src={this.state.knightURL} alt='knight' className={classes.img} />

                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant='h4' component='h2' color='inherit'>
                            Login
                        </Typography>
                    </CardContent>

                    <CardActions >
                        <form onSubmit={(e)=>this.submitLogin(e)} className={classes.cardActions}>
                            <FormControl required>
                            <Input
                                placeholder='Username'
                                defaultValue={username}
                                onChange={(e)=>this.handleChange('username', e)}

                            />
                            </FormControl>
                            <FormControl required>
                            <Input
                                placeholder='Password'
                                defaultValue={password}
                                className={classes.cardActionsChild}
                                onChange={(e)=>this.handleChange('password', e)}
                            />
                            </FormControl>
                        <Button
                         type='submit'
                         variant="contained" 
                         className={classes.cardActionsChild}
                         >
                            Login
                        </Button>
                        <Button component={Link} to='/register'>
                            Not a user?
                        </Button>
                        </form>
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