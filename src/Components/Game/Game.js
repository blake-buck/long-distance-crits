import React, {Component} from 'react';
import axios from 'axios';


import Canvas from './Canvas/Canvas.js';
import SetReminder from './SetReminder/SetReminder.js';
import CharSheet from './CharSheet/CharSheet.js';
import Chat from './Chat/Chat.js';

//MaterialUI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme =>({
    tabs:{
        display:'flex',
        justifyContent:'center'
    },
})

class Game extends Component{
    constructor(props){
        super(props);
        this.state ={
            isAuthorized:false,
            isGM:false,
            tabValue:0,
            charsheet:{},
            username:''
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    
    componentDidMount(){
        var room=this.props.match.params.id;
        var {socket} = this.state;    
        axios.get('/auth/getuser').then(results => {
            //POSSIBLE ERROR: if results.data is undefined, this should break my code
            if(results.data.username !== undefined){
                console.log(this.props.match.params.id);
                axios.get(`/api/users/${this.props.match.params.id}`).then(results2 => {
                    results2.data.map((val) => {
                        if(val.user_id === results.data.id && val.is_gm === 'true'){
                            this.setState({isAuthorized:true, isGM:true, username:results.data.username})
                           
                        }
                        else if(val.user_id === results.data.id){
                            this.setState({isAuthorized:true, username:results.data.username})
                        }
                        
                    })
                    
                }) 
            }
            else{
                this.props.history.push('/');
            }
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState !== this.state){
            console.log(prevState, this.state);
        }
    }

    handleChange(id, e){
        this.setState({[id]:e.target.value});
    }

    handleTabChange(event, value){
        this.setState({tabValue:value})
    }

    render(){
        console.log(this.props);
        var {isAuthorized, tabValue} = this.state;
        var chatWidth=3;
        var otherWidth =9;
        if(tabValue===2){
            chatWidth=12;
            otherWidth=12;
        }
        const {classes} = this.props;
        return(
            <div>
                
                {isAuthorized ?
                (
                <div>
                    <Tabs value={tabValue} onChange={this.handleTabChange} className={classes.tabs}>
                        <Tab label='Canvas'/>
                        <Tab label='Set Reminder'/>
                        <Tab label='Char Sheet'/>
                    </Tabs>
                    
                    <Grid container>
                        <Grid item xs={otherWidth}>
                            {tabValue===0 &&  <Canvas username={this.state.username} gameID={this.props.match.params.id} socket={this.state.socket}/>}
                            {tabValue===1 &&  <SetReminder isOpen={true} isGM={this.state.isGM}/>}
                            {tabValue===2 &&  <CharSheet gameID={this.props.match.params.id} charsheet={this.state.charsheet} handleChange={this.handleChange} />}
                        </Grid>
                        <Grid item xs={chatWidth}>
                            <Chat username={this.state.username} gameID={this.props.match.params.id}/>
                        </Grid>
                    </Grid>
                </div>
                )
                :
                (
                <p>You are not authorized to view this element</p>
                )
                }
            </div>
        );
    }

}

Game.propTypes ={
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Game);