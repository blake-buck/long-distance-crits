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


const styles = theme => ({
    card:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    }
})



class CreateGameButton extends Component{
    
    constructor(props){
        super(props);
        this.state ={
            createGameOpen:false,
            createGameTitle:"New Game",
            createGamePassword:"",
        }
    }

    createGame(){
        var {createGameTitle, createGamePassword} = this.state;
        axios.post('/api/game', {createGameTitle, createGamePassword}).then((results) => {
            this.props.componentDidMount();
            this.setState({createGameTitle:"New Game", createGamePassword:""})
        })
    }    

    handleChange(id, e){
        this.setState({[id]:e.target.value});
    }

    openCreateGameDialog(){
        var {createGameOpen} = this.state;
        console.log("firing opneCreateGameDialog");
        this.setState({createGameOpen:!createGameOpen});
    }

    render(){
        const {classes} = this.props;
        const {createGameOpen, createGameTitle, createGamePassword} = this.state;
        return(
            <div>
            <Dialog open={createGameOpen}>
                <DialogTitle>
                    Create Game
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a Title and Password to your game. Password can't be changed after creation so make sure you can remember it!   
                     </DialogContentText>
                </DialogContent>
                <DialogActions>
                        <Input placeholder={'Title'} defaultValue={createGameTitle} onChange={(e)=>this.handleChange('createGameTitle', e)}/>
                        <Input placeholder={'Password'} defaultValue={createGamePassword} onChange={(e)=>this.handleChange('createGamePassword', e)}/>
                        <Button onClick={()=>{this.openCreateGameDialog()}}>Cancel</Button>
                        <Button onClick={()=>{this.createGame(); this.openCreateGameDialog();}}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Card className={classes.card}>
                <CardActions>
                    <Button color='primary' variant='contained' onClick={()=>{this.openCreateGameDialog()}}>
                        <AddIcon />
                    </Button>
                </CardActions>
                <CardContent>
                    <Typography component='p'>
                        Create Game
                    </Typography>
                </CardContent>
            </Card>
            </div>
        );
    }

}

CreateGameButton.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CreateGameButton);