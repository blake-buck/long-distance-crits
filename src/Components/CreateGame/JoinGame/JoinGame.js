import React, {Component} from 'react';
import axios from 'axios';

//Material UI imports

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

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

                    <Input placeholder={'Title'} fullWidth defaultValue={title} onChange={(e)=>this.handleChange('title', e)}/>
                    <Input placeholder={'Password'} fullWidth defaultValue={password} onChange={(e)=>this.handleChange('password', e)}/>

                    <DialogActions>    
                        <Button fullWidth onClick={()=>{this.toggleDialog()}}>Cancel</Button>
                        <Button fullWidth onClick={()=>{this.joinGame(); this.toggleDialog();}}>Join</Button>
                    </DialogActions>
                    
                </Dialog>

                <Button color='inherit' onClick={()=>this.toggleDialog()}>Join Game</Button>
            </div>
        )
    }
}

export default JoinGame;