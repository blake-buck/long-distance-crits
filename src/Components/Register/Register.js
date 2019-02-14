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

const styles = theme =>({
    card:{
        height:350,
        [ theme.breakpoints.down('sm')]:{width:'100%'},
        [ theme.breakpoints.up('md')]:{maxWidth:500}
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

    submitRegister(){
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
                <Dialog open={openDialog} onClose={()=>this.closeDialog()}>
                    <DialogContent>
                        <DialogContentText>
                            Passwords must match before you can register AND/OR Username must be filled out
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.closeDialog()}>Close</Button>
                    </DialogActions>
                </Dialog>

                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h4' component='h2'>
                            Register
                        </Typography>
                    </CardContent>

                    <CardActions className={classes.cardActions}>
                        <Input
                            placeholder='Username'
                            defaultValue={username}
                            onChange={(e)=>this.handleChange('username', e)}
                        />
                        <Input
                            type='password'
                            placeholder='Password'
                            defaultValue={password}
                            className={classes.cardActionsChild}
                            onChange={(e)=>this.handleChange('password', e)}
                        />
                        <Input
                            type='password'
                            placeholder='Confirm Password'
                            defaultValue={confirmPassword}
                            className={classes.cardActionsChild}
                            onChange={(e)=>this.handleChange('confirmPassword', e)}
                        />
                        <Button variant="contained" className={classes.cardActionsChild} onClick={()=>this.submitRegister()} >
                            Register
                        </Button>
                        <Button component={Link} to='/'>
                            Already a user?
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }

}

Register.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Register);