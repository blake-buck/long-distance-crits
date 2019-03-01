import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import Canvas from './Canvas/Canvas.js';
import SetReminder from './SetReminder/SetReminder.js';
import CharSheet from './CharSheet/CharSheet.js';
import Chat from './Chat/Chat.js';
import QuestLog from './QuestLog/QuestLog.js';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';
import firebase from '../../firebase.js';

import {connect} from 'react-redux';
import {getCharSheet, getQuestLog, updateQuestLog, updateLines, togglePlayersCanDraw, togglePlayersCanMove, toggleDisplayGrid, clearCanvas, updateStrokeWidths, updateStrokeColors, updateTokens, updateActiveTokens, updateScaleX, updateScaleY, updateRotation, updateTokenXPos, updateTokenYPos, updateBackgroundImages, updateBackgroundImage} from '../../ducks/reducer';


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
            username:'',
            questLog:[],
            socket:io(),
            width:0,
            height:0
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    
    componentDidMount(){
        var room=this.props.match.params.id;
        var {socket} = this.state;    
        console.log(this.props.match.params.id, 'IDIDFIDIDIDIDIDIDIDIDIDIDID');
        

        

        axios.get('/auth/getuser').then(results => {
            //POSSIBLE ERROR: if results.data is undefined, this should break my code
            if(results.data.username !== undefined){
                
                axios.get(`/api/users/${this.props.match.params.id}`).then(results2 => {
                    results2.data.map((val) => {
                        if(val.user_id === results.data.id && val.is_gm === 'true'){
                            
                            this.props.getCharSheet(room).then(results3 => {

                                firebase.database().ref(`/tokens/${results.data.username}`).once('value').then((snapshot)=>{    
                                    this.props.updateTokens(snapshot.val().tokens);
                                }).catch(err => console.log(err));

                                firebase.database().ref(`/backgroundImages/${results.data.username}`).once('value').then((snapshot)=>{    
                                    console.log(snapshot.val());
                                    this.props.updateBackgroundImages(snapshot.val().backgroundImages);
                                }).catch(err => console.log(err));

                                axios.get(`/api/game/${room}/questlog`).then(results4 => {
                                    axios.get(`/api/game/${room}/canvas`).then(results5 => {
                                        console.log('I AM THE CANVAS HEIGHT AND WIDTH', results5.data);
                                        this.props.updateQuestLog(results4.data);
                                        this.setState({isAuthorized:true, isGM:true, username:results.data.username, charsheet:results3.value.data[0], questLog:results4.data, width:results5.data[0].canvas_width, height:results5.data[0].canvas_height})
                                    })
                                    
                                })
                                
                            });
                        }
                        else if(val.user_id === results.data.id){
                            this.props.getCharSheet(room).then(results3 => {
                                axios.get(`/api/game/${room}/questlog`).then(results4 => {
                                    axios.get(`/api/game/${room}/canvas`).then(results5 => {
                                        console.log('I AM THE CANVAS HEIGHT AND WIDTH', results5.data);
                                        this.props.updateQuestLog(results4.data);
                                        this.setState({isAuthorized:true, isGM:false, username:results.data.username, charsheet:results3.value.data[0], questLog:results4.data, width:results5.data[0].canvas_width, height:results5.data[0].canvas_height})
                                    })
                                    
                                })
                                
                            })
                            
                        }
                        
                    })
                    
                }) 
            }
            else{
                this.props.history.push('/');
            }
        })

        firebase.database().ref(`/canvases/${this.props.match.params.id}`).once('value').then((snapshot)=>{
            console.log(snapshot.val());
            if(snapshot.val().lines)            this.props.updateLines(snapshot.val().lines);
            if(snapshot.val().strokeWidths)     this.props.updateStrokeWidths(snapshot.val().strokeWidths);
            if(snapshot.val().strokeColors)     this.props.updateStrokeColors(snapshot.val().strokeColors);
            if(snapshot.val().activeTokens)     this.props.updateActiveTokens(snapshot.val().activeTokens);
            if(snapshot.val().scaleX)           this.props.updateScaleX(snapshot.val().scaleX);
            if(snapshot.val().scaleY)           this.props.updateScaleY(snapshot.val().scaleY);
            if(snapshot.val().rotation)         this.props.updateRotation(snapshot.val().rotation);
            if(snapshot.val().tokenXPos)        this.props.updateTokenXPos(snapshot.val().tokenXPos);
            if(snapshot.val().tokenYPos)        this.props.updateTokenYPos(snapshot.val().tokenYPos);
            if(snapshot.val().backgroundImage)  this.props.updateBackgroundImage(snapshot.val().backgroundImage);
            
        }).catch(err => console.log(err));

        socket.on('connect', ()=>{
            console.log('Can i get a connection?');
            socket.emit('room', this.props.match.params.id)
        })
        socket.on('playersCanDraw', (playersCanDraw)=>{
            this.props.togglePlayersCanDraw(!playersCanDraw)
        })

        socket.on('toggleDisplayGrid', (displayGrid) => {
            this.props.toggleDisplayGrid(!displayGrid)
        })

        socket.on('playersCanMove', (playersCanMove) =>{
            this.props.togglePlayersCanMove(!playersCanMove);
        })

        socket.on('activeTokens', (activeTokens) => {
            console.log('RECIEVED ACTIVE TOKENS', activeTokens)
            this.props.updateActiveTokens(activeTokens);
        })

        socket.on('questLog', (questLog) => {
            this.props.updateQuestLog(questLog);
        })

        socket.on('backgroundImage', (backgroundImage) => {
            this.props.updateBackgroundImage(backgroundImage);
        })
    }

    handleChange(id, e){
        this.setState({[id]:e.target.value});
    }

    handleTabChange(event, value){
        this.setState({tabValue:value})
    }

    componentWillUnmount(){
        var {socket} = this.state;
        socket.disconnect();
        
    }

    render(){
        var {isAuthorized, tabValue} = this.state;
        var chatWidth=2;
        var otherWidth =10;
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
                        <Tab label='Quest Log'/>
                        <Tab label='Char Sheet'/>
                    </Tabs>
                    
                    <Grid container>
                        <Grid item xs={12} md={otherWidth} >

                            {tabValue===0 &&  <Canvas username={this.state.username} gameID={this.props.match.params.id} socket={this.state.socket} isGM={this.state.isGM} width={this.state.width} height={this.state.height}/>}

                            {tabValue===1 &&  <QuestLog gameID={this.props.match.params.id} questLog={this.state.questLog} isGM={this.state.isGM} socket={this.state.socket}/>}

                            {tabValue===2 &&  <CharSheet gameID={this.props.match.params.id} charsheet={this.state.charsheet} handleChange={this.handleChange} />}

                        </Grid>

                        <Grid item xs={12} md={chatWidth}>
                            <Chat username={this.state.username} gameID={this.props.match.params.id} socket={this.state.socket}/>
                        </Grid>

                    </Grid>
                </div>
                )
                :
                <LoadingScreen />
                }
            </div>
        );
    }

}

Game.propTypes ={
    classes: PropTypes.object.isRequired
}
const mapStateToProps =(state) => {
    return{
        charsheet:state.charsheet,
        lines:state.lines,
        questLog:state.questLog
    }
};
//
export default withStyles(styles)(connect(mapStateToProps, {getCharSheet, getQuestLog, updateQuestLog, updateLines, togglePlayersCanDraw, togglePlayersCanMove, toggleDisplayGrid, clearCanvas, updateStrokeWidths, updateStrokeColors, updateTokens, updateActiveTokens, updateScaleX, updateScaleY, updateRotation, updateTokenXPos, updateTokenYPos, updateBackgroundImages, updateBackgroundImage})(Game));