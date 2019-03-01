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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from '@material-ui/core/AppBar';
import { FormControl } from '@material-ui/core';
import { auth } from 'firebase';

const styles = theme =>({
    appbar:{
        paddingTop:5,
        paddingBottom:5
    },
    cardContent:{
        backgroundColor:'#3F51B5',
        color:'white'
    },
    container:{
        display:'flex',
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:'3%'
    },
    img:{
        [ theme.breakpoints.down('sm')]:{display:'none'},
        [ theme.breakpoints.up('md')]:
        {
            width:'40%',
            height:'90vh',
            margin:0,
            minHeight:500
        }
    },
    card:{
        height:350,
        [ theme.breakpoints.down('sm')]:{width:'100%'},
        [ theme.breakpoints.up('md')]:{maxWidth:500, width:'30%'}
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

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            confirmPassword:'',
            openDialog:false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(id, e){
        this.setState({[id] : e.target.value});
    }

    submitRegister(e){
        e.preventDefault();
        var {username, password, confirmPassword} = this.state;
        //I should eventually come back and make this more specific, or turn register into a form, that way 
        //username is a required field and doesnt have to be checked here
        if(password !== confirmPassword || username.length===0){
            this.setState({openDialog:true})
        }
        else{
            axios.post('/auth/register',{username, password}).then(()=>{
                this.props.history.push('/creategame');
            })
        }
    }
    closeDialog(){
        this.setState({openDialog:false})
    }

    render(){
        var {username, password, confirmPassword, openDialog} = this.state;
        var {classes} = this.props;
        return(
            <div>
            <AppBar className={classes.appbar}>
                <Typography variant='h6' component='h1' color='inherit'>
                    Long Distance Crits
                </Typography>
            </AppBar>
            <div className={classes.container}>
                <Dialog open={openDialog} onClose={()=>this.closeDialog()}>
                    <DialogContent>
                        <DialogContentText>
                            Passwords must match before you can register
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.closeDialog()}>Close</Button>
                    </DialogActions>
                </Dialog>
                
                <img src='https://firebasestorage.googleapis.com/v0/b/long-distance-crits.appspot.com/o/displayImages%2Fknight.png?alt=media&token=d0435845-2e55-4c87-8c2e-ffc52d2d80af' alt='Knight' className={classes.img}/>
                
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant='h4' component='h2' color='inherit'>
                            Register
                        </Typography>
                    </CardContent>

                    <CardActions >
                    <form onSubmit={(e)=>this.submitRegister(e)} className={classes.cardActions}>
                    <FormControl required>
                        <Input
                            placeholder='Username'
                            defaultValue={username}
                            onChange={(e)=>this.handleChange('username', e)}
                        />
                    </FormControl>
                    <FormControl required>
                        <Input
                            type='password'
                            placeholder='Password'
                            defaultValue={password}
                            className={classes.cardActionsChild}
                            onChange={(e)=>this.handleChange('password', e)}
                        />
                    </FormControl>
                    <FormControl required>
                        <Input
                            type='password'
                            placeholder='Confirm Password'
                            defaultValue={confirmPassword}
                            className={classes.cardActionsChild}
                            onChange={(e)=>this.handleChange('confirmPassword', e)}
                        />
                    </FormControl>
                        <Button type='submit' variant="contained" className={classes.cardActionsChild} >
                            Register
                        </Button>
                        <Button component={Link} to='/'>
                            Already a user?
                        </Button>
                        </form>
                    </CardActions>
                </Card>
            </div>
            </div>
        );
    }

}

Register.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Register);