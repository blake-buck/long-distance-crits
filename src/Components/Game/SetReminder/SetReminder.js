import React, {Component} from 'react';

//materialUI imports
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

class SetReminder extends Component{
    constructor(props){
        super(props);
        
        this.state={
            isOpen:false,
            recipients:'',
            reminderDate:'',
            reminderTime:''
        }
    }



    sendEmail(){
        
        var {recipients, reminderDate, reminderTime} = this.state;
        
        axios.post('/email/reminder', {recipients, dateTime:reminderDate +" "+ reminderTime}).then(results => {
            this.setState({isOpen:false, recipients:"", });
        })
    }

    handleChange(id, e){
        this.setState({[id]:e.target.value});
    }

    render(){
        return(
            <div>
            <Dialog open={this.state.isOpen}>
                <DialogTitle>Set a Game Reminder</DialogTitle>
                <DialogContent>
                    Automatically remind your players when your next game starts via an automated email. Seperate multiple emails with a comma. Double check spelling before clicking submit!
                </DialogContent>
                <DialogContent>
                    <Input type='date' onChange={(e)=>this.handleChange('reminderDate', e)}/>
                    <Input type='time' onChange={(e)=>this.handleChange('reminderTime', e)}/>
                    Date and time in email
                </DialogContent>
                <DialogActions>
                    <Input fullWidth={true} placeholder='Player Emails' onChange={(e)=>this.handleChange('recipients', e)} />
                    <Button onClick={()=>this.setState({isOpen:false})}>Cancel</Button>
                    <Button onClick={()=>this.sendEmail()}>Submit</Button>
                </DialogActions>
            </Dialog>
            
            <Button fullWidth onClick={()=>this.setState({isOpen:true})}>Set Reminder</Button>
            
            </div>
        );
    }

}

export default SetReminder;