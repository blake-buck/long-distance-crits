import React, {Component} from 'react';
import axios from 'axios';

//Material UI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import ButtonBase from '@material-ui/core/ButtonBase';


const styles = theme => ({
    card:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:60,
        paddingRight:60,
        paddingBottom:25
    },
    cardActions:{
        display:'flex',
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column'
        },
        [theme.breakpoints.up('md')]:{
            flexDirection:'row'
        }
    }
})

//<Button color='primary' variant='contained' onClick={()=>{this.openCreateGameDialog()}}>
                       // <AddIcon />
                  //  </Button>

//CreateGame creates a new game and adds it to the database
class CreateGameButton extends Component{
    
    constructor(props){
        super(props);
        this.state ={
            createGameOpen:false,
            createGameTitle:"New Game",
            createGamePassword:"",
            width:'',
            height:''
        }
    }

    createGame(){
        var {createGameTitle, createGamePassword, width, height} = this.state;
            
        axios.post('/api/game', {createGameTitle, createGamePassword, width, height}).then((results2) => {     
            this.props.componentDidMount();
            this.setState({createGameTitle:"New Game", createGamePassword:""})
        })
        
        
    }    

    handleChange(id, e){
        this.setState({[id]:e.target.value});
    }

    openCreateGameDialog(){
        var {createGameOpen} = this.state;
        this.setState({createGameOpen:!createGameOpen});
    }

    render(){
        const {classes} = this.props;
        const {createGameOpen, createGameTitle, createGamePassword, width, height} = this.state;
        return(
            <div>
            <Dialog open={createGameOpen}>
                <DialogTitle>
                    Create Game
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a Title and Password to your game, set the height and width of your canvas. Password can't be changed after creation so make sure you can remember it!   
                     </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.cardActions}>
                        <Input fullWidth placeholder={'Title'} defaultValue={createGameTitle} onChange={(e)=>this.handleChange('createGameTitle', e)}/>
                        <Input fullWidth placeholder={'Password'} defaultValue={createGamePassword} onChange={(e)=>this.handleChange('createGamePassword', e)}/>
                        <Input fullWidth placeholder={'Width'} defaultValue={width} onChange={(e)=>this.handleChange('width', e)} />
                        <Input fullWidth placeholder={'Height'} defaultValue={height} onChange={(e)=>this.handleChange('height', e)} />
                        <Button onClick={()=>{this.createGame(); this.openCreateGameDialog();}}>Submit</Button>
                        <Button onClick={()=>{this.openCreateGameDialog()}} color='secondary'>Cancel</Button>
                </DialogActions>
            </Dialog>

            <ButtonBase  onClick={()=>{this.openCreateGameDialog()}}>
            <Card>
                <CardActions className={classes.card}>   
                    <Typography component='h1' variant='h1'>
                        +
                    </Typography>     
                    <Typography component='p'>
                        Create Game
                    </Typography>
                </CardActions>
            </Card>
            </ButtonBase>

            </div>
        );
    }

}

CreateGameButton.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CreateGameButton);