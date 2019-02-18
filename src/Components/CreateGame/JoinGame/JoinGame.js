import React, {Component} from 'react';
import axios from 'axios';

//Material UI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

//This component allows a user to join another game -- I will need to update it so that it requires the game key as well because otherwise it is possible to have two games with the same title and password that a user can join
class JoinGame extends Component{

    constructor(props){
        super(props);
        this.state ={
            title:"",
            password:"",
            dialogOpen:false
        }
    }

    handleChange(id, e){
        this.setState({[id]:e.target.value});
    }

    //This toggles whether the dialog is open or not
    toggleDialog(){
        var {dialogOpen} = this.state;
        this.setState({dialogOpen:!dialogOpen});
    }

    //If the game does not exist nothing happens, otherwise it adds a gamecard after a short delay
    joinGame(){
        var {title, password} = this.state;
        axios.post('/api/useringame', {title, password}).then(results =>{
            this.props.componentDidMount();
        })
    }

    render(){
        var {title, password, dialogOpen} = this.state;
        return(
            <div>
                 <Dialog open={dialogOpen}>

                    <DialogTitle>
                        Join a game
                    </DialogTitle>

                    <DialogActions>
                            <Input placeholder={'Title'} defaultValue={title} onChange={(e)=>this.handleChange('title', e)}/>
                            <Input placeholder={'Password'} defaultValue={password} onChange={(e)=>this.handleChange('password', e)}/>
                            <Button onClick={()=>{this.toggleDialog()}}>Cancel</Button>
                            <Button onClick={()=>{this.joinGame(); this.toggleDialog();}}>Join</Button>
                    </DialogActions>
                    
                </Dialog>

                <Button color='inherit' onClick={()=>this.toggleDialog()}>Join Game</Button>
            </div>
        )
    }
}

export default JoinGame;