import React,{Component} from 'react';
import {connect} from 'react-redux';
import {toggleGmToolsIsOpen, togglePlayersCanDraw, clearCanvas, toggleDisplayGrid,togglePlayersCanMove, updateTokens, updateActiveTokens, updateTokenXPos, updateTokenYPos,  updateScaleX, updateScaleY, updateRotation, updateLines, updateStrokeColors, updateStrokeWidths, updateBackgroundImage, updateBackgroundImages} from '../../../../../ducks/reducer';
import SetReminder from '../../../SetReminder/SetReminder.js';
import firebase from '../../../../../firebase.js';

//MaterialUI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
    checkBoxes:{
        display:'flex',
        flexDirection:'column'
    },
    fileUploader:{
        border:'2px solid black',
        overflow:'hidden',
        position:'relative'
    },
    fileUploaderInput:{
        cursor: 'inherit',
        display: 'block',
        fontSize: 999,
        filter: 'alpha(opacity=0)',
        minHeight: '100%',
        minWidth: '100%',
        opacity: 0,
        position: 'absolute',
        right: 0,
        textAlign: 'right',
        top: 0,

    },
    closeDrawerButton:{
        [ theme.breakpoints.down('sm')]:{
            display:'block',
        },
        [ theme.breakpoints.up('md')]:{
        display:'none'
        }
    }
})

class GmTools extends Component{
    constructor(props){
        super(props);
        this.state={
            tokensDialogOpen:false,
            backgroundImageDialogOpen:false
        }
    }

    componentDidMount(){
        
    }

    emitCanDraw(){
        var {socket,playersCanDraw} = this.props;
        socket.emit('playersCanDraw', playersCanDraw);
    }

    emitClearBackgroundImage(){
        var {socket, activeTokens, tokenXPos, tokenYPos, scaleX, scaleY, rotation, lines, strokeWidths, strokeColors} = this.props;
        firebase.database().ref(`canvases/${this.props.gameID}`).set({
            activeTokens:activeTokens,
            tokenXPos:tokenXPos,
            tokenYPos:tokenYPos,
            scaleX:scaleX,
            scaleY:scaleY,
            rotation:rotation,
            lines:lines,
            strokeWidths:strokeWidths,
            strokeColors:strokeColors,
            backgroundImage:'null'
        })
        this.props.updateBackgroundImage('null');
        socket.emit('backgroundImage', 'null');
    }

    emitClearCanvas(){
        var {activeTokens, tokenXPos, tokenYPos, scaleX, scaleY, rotation, backgroundImage} = this.props
        firebase.database().ref(`canvases/${this.props.gameID}`).set({
            activeTokens:activeTokens,
            tokenXPos:tokenXPos,
            tokenYPos:tokenYPos,
            scaleX:scaleX,
            scaleY:scaleY,
            rotation:rotation,
            lines:[],
            strokeWidths:[],
            strokeColors:[],
            backgroundImage:backgroundImage
        })
        this.props.updateLines([]);
        this.props.updateStrokeWidths([]);
        this.props.updateStrokeColors([]);
        this.props.socket.emit('draw', [[],[],[]]);
    }

    emitClearTokens(){
        var {lines, strokeWidths, strokeColors, backgroundImage, socket} = this.props
        firebase.database().ref(`canvases/${this.props.gameID}`).set({
            activeTokens:[],
            tokenXPos:[],
            tokenYPos:[],
            scaleX:[],
            scaleY:[],
            rotation:[],
            lines:lines,
            strokeWidths:strokeWidths,
            strokeColors:strokeColors,
            backgroundImage:backgroundImage
        })
        this.props.updateActiveTokens([]);
        this.props.updateTokenXPos([]);
        this.props.updateTokenYPos([]);
        this.props.updateScaleX([]);
        this.props.updateScaleY([]);
        this.props.updateRotation([]);


        socket.emit('activeTokens', []);
    }

    toggleDisplayGrid(){
        var {socket, displayGrid} = this.props;
        
        socket.emit('toggleDisplayGrid', displayGrid);
    }

    emitPlayersCanMove(){
        var {playersCanMove, socket} = this.props;
        socket.emit('playersCanMove', playersCanMove);
    }
    
    uploadToken(e){
        var {tokens} = this.props;
        var file =e.target.files[0];
        var fileType = file.type;
        if(fileType.indexOf('image/') !== -1){
            firebase.storage().ref(`tokens/${this.props.username}/${file.name}`).put(file).then(() =>{
                tokens.push(file.name);
                this.props.updateTokens(tokens);
                firebase.database().ref(`tokens/${this.props.username}`).set({
                    tokens:tokens
                })
            })
        }
    }

    uploadBackgroundImage(e){
        var {backgroundImages} = this.props;
        var file = e.target.files[0];
        var fileType=file.type;
        if(fileType.indexOf('image/') !== -1){
            firebase.storage().ref(`backgroundImages/${this.props.username}/${file.name}`).put(file).then(() =>{
                backgroundImages.push(file.name);
                this.props.updateBackgroundImages(backgroundImages);
                firebase.database().ref(`backgroundImages/${this.props.username}`).set({
                    backgroundImages:backgroundImages
                })
            })
        }
    }

    downloadImage(imageName){
        var {activeTokens, tokenXPos, tokenYPos, scaleX, scaleY, rotation, lines, strokeWidths, strokeColors, socket, backgroundImage} = this.props;
        firebase.storage().ref(`tokens/${this.props.username}/${imageName}`).getDownloadURL().then((url) =>{
            activeTokens.push(url);
            tokenXPos.push(0);
            tokenYPos.push(0);
            scaleX.push(1);
            scaleY.push(1);
            rotation.push(0);

            firebase.database().ref(`canvases/${this.props.gameID}`).set({
                tokenXPos:tokenXPos,
                tokenYPos:tokenYPos,
                scaleX:scaleX,
                scaleY:scaleY,
                rotation:rotation,
                lines:lines,
                strokeWidths:strokeWidths,
                strokeColors:strokeColors,
                activeTokens:activeTokens,
                backgroundImage:backgroundImage
            }).catch(err => console.log('ERROR AT DOWNLOAD IMAGE INTERIOR', err))
                this.props.updateActiveTokens(activeTokens);
                this.props.updateTokenXPos(tokenXPos);
                this.props.updateTokenYPos(tokenYPos);
                this.props.updateScaleX(scaleX);
                this.props.updateScaleY(scaleY);
                this.props.updateRotation(rotation);

                socket.emit('activeTokens', activeTokens);
                socket.emit('token transform', [1, 1, 0, 0, 0, activeTokens.length-1])
            
        }).catch(err => console.log('ERROR AT DOWNLOAD IMAGE EXTERIOR', err))
        
    }

    setBackgroundImage(backgroundImage){
        var {socket, activeTokens, tokenXPos, tokenYPos, scaleX, scaleY, rotation, lines, strokeWidths, strokeColors} = this.props;
        
        firebase.storage().ref(`backgroundImages/${this.props.username}/${backgroundImage}`).getDownloadURL().then((url) =>{
            firebase.database().ref(`canvases/${this.props.gameID}`).set({
                activeTokens:activeTokens,
                tokenXPos:tokenXPos,
                tokenYPos:tokenYPos,
                scaleX:scaleX,
                scaleY:scaleY,
                rotation:rotation,
                lines:lines,
                strokeWidths:strokeWidths,
                strokeColors:strokeColors,
                backgroundImage:url
            })
            this.props.updateBackgroundImage(url);
            socket.emit('backgroundImage', url);
        })
        
    }

    render(){
        const {gmToolsIsOpen, playersCanDraw, playersCanMove, displayGrid, tokens, backgroundImages, classes} = this.props;
        var {tokensDialogOpen, backgroundImageDialogOpen} = this.state;
        return(
            <div>
            <Drawer anchor='left' open={gmToolsIsOpen} onClose={()=>this.props.toggleGmToolsIsOpen(!gmToolsIsOpen)}>
                <Paper>
                    <div className={classes.checkBoxes}>
                    <FormControlLabel
                        label='Players can draw'
                        control={
                            <Checkbox checked={playersCanDraw} onChange={()=>{this.props.togglePlayersCanDraw(!playersCanDraw); this.emitCanDraw() }}/>
                        }
                    />
                    <FormControlLabel
                        label='Players can move'
                        control={
                            <Checkbox checked={playersCanMove} onChange={()=>{this.emitPlayersCanMove()}} />
                        }
                    />
                    <FormControlLabel
                        label='Display Grid'
                        control={
                            <Checkbox checked={displayGrid} onChange={()=>{this.toggleDisplayGrid()}}/>
                        }
                    />
                    <InputLabel>
                    Upload Token
                    <Input type='file' onChange={(e)=>this.uploadToken(e)} className='fileUploaderInput'/>
                    </InputLabel>
                    
                    <InputLabel>
                    Upload Background
                    <Input type='file' onChange={(e)=>this.uploadBackgroundImage(e)} placeholder='Upload Background' />
                    </InputLabel>
                    
                    <Button  onClick={()=>this.setState({tokensDialogOpen:true})}>Add Token</Button>
                    <Button  onClick={()=>this.setState({backgroundImageDialogOpen:true})}>Add Background</Button>
                    
                    <Button onClick={()=>this.emitClearBackgroundImage()}>Clear Background</Button>
                    <Button  onClick={()=>this.emitClearCanvas()}>Clear Drawings</Button>
                    <Button  onClick={()=>this.emitClearTokens()}>Clear Tokens</Button>

                    
                    </div>
                    
                <SetReminder />
                <Button className={classes.closeDrawerButton} onClick={()=>this.props.toggleGmToolsIsOpen(false)}>Close Drawer</Button>

                </Paper>
            </Drawer>

            <Dialog open={tokensDialogOpen}>
                <DialogTitle>Add Token to Canvas</DialogTitle>
                <DialogContent>
                    Select a token you previously uploaded and add it to the canvas.
                </DialogContent>
                {
                tokens.map((val, i) => {
                    return(
                        <Button key={i} fullWidth onClick={()=>this.downloadImage(val)}>{val}</Button>
                    )
                })
                }
                <DialogActions>
                    <Button fullWidth color='secondary' onClick={()=>this.setState({tokensDialogOpen:false})}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={backgroundImageDialogOpen}>
                <DialogTitle>Set Canvas Background</DialogTitle>
                <DialogContent>
                    Select a background you previously uploaded and set it as the background of the canvas.
                </DialogContent>
                {
                    backgroundImages.map((val, i) => {
                        return(
                            <Button key={i} fullWidth onClick={()=>this.setBackgroundImage(val)}>{val}</Button>
                        )
                    })
                }
                <DialogActions>
                <Button fullWidth color='secondary' onClick={()=>this.setState({backgroundImageDialogOpen:false})}>Cancel</Button>
                </DialogActions>
            </Dialog>

            </div>
        )
    }
}

GmTools.propTypes ={
    classes: PropTypes.object.isRequired
}

const mapStateToProps =(state) => {
    return{
        lines:state.lines,
        strokeWidths:state.strokeWidths,
        strokeColors:state.strokeColors,

        gmToolsIsOpen:state.gmToolsIsOpen,
        playersCanDraw:state.playersCanDraw,
        colors:state.colors,
        widths:state.widths,
        displayGrid:state.displayGrid,
        playersCanMove:state.playersCanMove,
        tokens:state.tokens,
        activeTokens:state.activeTokens,
        tokenXPos:state.tokenXPos, 
        tokenYPos:state.tokenYPos,
        scaleX:state.scaleX,
        scaleY:state.scaleY,
        rotation:state.rotation,
        backgroundImages:state.backgroundImages,
        backgroundImage:state.backgroundImage
    }
};

export default withStyles(styles)(connect(mapStateToProps, {toggleGmToolsIsOpen, togglePlayersCanDraw, clearCanvas, toggleDisplayGrid, togglePlayersCanMove, updateTokens, updateActiveTokens,updateTokenXPos, updateTokenYPos,  updateScaleX, updateScaleY, updateRotation, updateLines, updateStrokeColors, updateStrokeWidths, updateBackgroundImage, updateBackgroundImages})(GmTools));