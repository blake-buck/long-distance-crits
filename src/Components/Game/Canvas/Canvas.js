import React, {Component} from 'react';
import {Stage, Layer, Line} from 'react-konva';
import {connect} from 'react-redux';
import {updateLines, updateStrokeWidths, updateStrokeColors, toggleGmToolsIsOpen, updateGrid, updateTokenXPos, updateTokenYPos, updateSelectedToken, updateScaleX, updateScaleY, updateRotation, updateBackgroundImage} from '../../../ducks/reducer';
import ToolBar from './ToolBar/ToolBar.js';
import Token from './Token/Token.js';
import TransformerComponent from './TransformerComponent/TransformerComponent.js';
import BackgroundImage from './BackgroundImage/BackgroundImage.js';

import firebase from '../../../firebase.js';


//MaterialUI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    stageContainer:{
        overflow:'scroll',
        border:'2px solid black',
        margin:'auto'
    },
    paper:{
        height:'96h',
        maxWidth:'100vw'
    },
    tools:{
        borderTop:'2px solid black'
    }
})

class Canvas extends Component{

    constructor(props){
        super(props);
        this.state={
            room:this.props.gameID,
            username:this.props.username,

            lines:this.props.lines,
            strokeWidths:this.props.strokeWidths,
            strokeColors:this.props.strokeColors,

            currentLine:[],
            isDrawing:false,
            grid:this.props.grid,

            displayGrid:this.props.displayGrid,
            strokeWidth:this.props.strokeWidth,
            strokeColor:this.props.strokeColor,

            tokenXPos:this.props.tokenXPos,
            tokenYPos:this.props.tokenYPos,

            activeTokens:this.props.activeTokens,
            scaleX:this.props.scaleX,
            scaleY:this.props.scaleY,
            rotation:this.props.rotation,
            backgroundImage:this.props.backgroundImage
        }
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
    }

    componentDidMount(){

        var {socket}=this.props;
        var {tokenXPos, tokenYPos, scaleX, scaleY, rotation, lines, strokeWidths, strokeColors, activeTokens, backgroundImage} = this.state;
        
        //This will become dynamic when GMs are allowed to set height and width of canvas, as well as grid size
        var grid=[];
        for(var i=this.props.width; i>=0; i-=70){
            grid.push([i, 0, i, this.props.height]);
        }
        for(var j=this.props.height; j>=0; j-=70){
            grid.push([0, j, this.props.width, j]);
        }
        
        this.props.updateGrid(grid);
        
        socket.on('draw', (newLines) => {
            this.props.updateLines(newLines[0]);
            this.props.updateStrokeWidths(newLines[1]);
            this.props.updateStrokeColors(newLines[2]);
            this.setState({lines:newLines[0], strokeWidths:newLines[1], strokeColors:newLines[2]})
        })

        socket.on('token drag', (position) => {
            tokenXPos[position[2]]=position[0];
            tokenYPos[position[2]]=position[1];
            firebase.database().ref(`canvases/${this.props.gameID}`).set({
                activeTokens:this.state.activeTokens,
                scaleX:scaleX,
                scaleY:scaleY,
                rotation:rotation,
                tokenXPos:tokenXPos,
                tokenYPos:tokenYPos,
                lines:lines,
                strokeWidths:strokeWidths,
                strokeColors:strokeColors,
                backgroundImage:backgroundImage
            })
            this.props.updateTokenXPos(tokenXPos);
            this.props.updateTokenYPos(tokenYPos);
            this.setState({tokenXPos, tokenYPos});
        })

        socket.on('token transform', (transform) => {
            scaleX[transform[5]]=transform[0];
            scaleY[transform[5]]=transform[1];
            rotation[transform[5]]=transform[2];
            tokenXPos[transform[5]]=transform[3];
            tokenYPos[transform[5]]=transform[4];
            firebase.database().ref(`canvases/${this.props.gameID}`).set({
                activeTokens:this.state.activeTokens,
                scaleX:scaleX,
                scaleY:scaleY,
                rotation:rotation,
                tokenXPos:tokenXPos,
                tokenYPos:tokenYPos,
                lines:lines,
                strokeWidths:strokeWidths,
                strokeColors:strokeColors,
                backgroundImage:backgroundImage
            })
            this.props.updateScaleX(scaleX);
            this.props.updateScaleY(scaleY);
            this.props.updateRotation(rotation);
            this.props.updateTokenXPos(tokenXPos);
            this.props.updateTokenYPos(tokenYPos);
            this.setState({scaleX, scaleY, tokenXPos, tokenYPos, rotation});
        })

        //this.setState({lines:lines})
    }

    
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({lines:this.props.lines, strokeWidth:this.props.strokeWidth, strokeColor:this.props.strokeColor, activeTokens:this.props.activeTokens, tokenXPos:this.props.tokenXPos, tokenYPos:this.props.tokenYPos, scaleX:this.props.scaleX,
            scaleY:this.props.scaleY, rotation:this.props.rotation, backgroundImage:this.props.backgroundImage});
        }
    }

    emitDrawing(){
        var {scaleX, scaleY, rotation, tokenXPos, tokenYPos, lines, strokeWidths, strokeColors, activeTokens, backgroundImage} = this.state;
        var {socket} = this.props;
        var newLines = [lines,strokeWidths, strokeColors]
        firebase.database().ref(`canvases/${this.props.gameID}`).set({
            activeTokens:activeTokens,
            scaleX:scaleX,
            scaleY:scaleY,
            rotation:rotation,
            tokenXPos:tokenXPos,
            tokenYPos:tokenYPos,
            lines:lines,
            strokeWidths:strokeWidths,
            strokeColors:strokeColors,
            backgroundImage:backgroundImage
        })
        socket.emit('draw', newLines);
    }

    onDragEnd(e, position){
        var {socket} = this.props;
        
        socket.emit('token drag', [e.target.x(), e.target.y(), position]);
    }

    onTransformEnd(e, position){
        var {socket} = this.props;
        socket.emit('token transform', [e.target.scaleX(), e.target.scaleY(), e.target.rotation(), e.target.x(), e.target.y(), position]);
        
    }

    beginLine(e){
        if(this.props.selectedTool === 'draw' && (this.props.playersCanDraw||this.props.isGM)){
            var {lines, strokeWidths, strokeColors} = this.state;
            //currentLine.push(e.evt.layerX, e.evt.layerY);
            strokeWidths.push(this.props.strokeWidth);
            strokeColors.push(this.props.strokeColor);
            lines.push([e.evt.layerX, e.evt.layerY]);
            this.props.updateLines(lines);
            this.props.updateStrokeWidths(strokeWidths);
            this.props.updateStrokeColors(strokeColors);
            this.setState({isDrawing:true, strokeWidths, strokeColors})
        }
    }

    drawLine(e){
        if(this.props.selectedTool === 'draw' && (this.props.playersCanDraw||this.props.isGM)){
            var {isDrawing, currentLine, lines, strokeWidths, strokeColors } = this.state;
            if(isDrawing){
                currentLine.push(e.evt.layerX, e.evt.layerY);
                lines[lines.length-1].push(e.evt.layerX, e.evt.layerY)
                strokeWidths.push(this.props.strokeWidth);
                strokeColors.push(this.props.strokeColor);
                lines.push(currentLine);
                this.props.updateLines(lines);
                this.props.updateStrokeWidths(strokeWidths);
                this.props.updateStrokeColors(strokeColors);
                
                this.setState({isDrawing:true, lines, currentLine:[], strokeWidths, strokeColors})
            }
        }   
    }

    endLine(e){
        if(this.props.selectedTool === 'draw' && (this.props.playersCanDraw||this.props.isGM)){
            
                var {lines, strokeWidths, strokeColors} = this.state;
               
                lines[lines.length-1].push(e.evt.layerX, e.evt.layerY);
                
                this.props.updateLines(lines);
                this.setState({isDrawing:false, lines, strokeWidths, strokeColors})
                
                this.emitDrawing();
            
        }
    }

    componentWillUnmount(){
        this.props.updateLines(this.props.lines);
    }

    


    render(){
        var {lines, tokenXPos, tokenYPos} = this.state;
        var {classes, strokeWidths, strokeColors, grid, displayGrid, activeTokens, scaleX, scaleY, rotation} = this.props;
        
        return(
        <Paper className={classes.paper}>
        
        <div >
            <Stage style={{maxWidth:this.props.width, maxHeight:this.props.maxHeight}} width={this.props.width} height={this.props.height} onMouseDown={(e)=>this.beginLine(e)} onMouseMove={(e)=>this.drawLine(e)} onMouseUp={(e)=>this.endLine(e)} className={classes.stageContainer}>
                <Layer>

                    <BackgroundImage canvasWidth={this.props.width} canvasHeight={this.props.height} src={this.state.backgroundImage} />

                    {
                    lines.map((val, i) => {
                        return(<Line points={val} key={i} stroke={strokeColors[i]} strokeWidth={strokeWidths[i]} lineCap= 'round'lineJoin= 'round'/>)
                    })
                    }

                    {
                    displayGrid ? grid.map((val, i) => {
                        return(<Line key={i} points={val} stroke='black' strokeWidth={1} lineCap='round' lineJoin='round'/>)
                    }) : <Line />
                    }

                    

                    {
                        activeTokens.map((val, i) => {
                           
                            return(
                                <Token 
                                key={i} src={val} draggable={this.props.selectedTool === 'pan' && (this.props.playersCanMove || this.props.isGM)}
                                onDragEnd={this.onDragEnd} onTransformEnd={this.onTransformEnd} position={i} tokenXPos={tokenXPos[i]}
                                tokenYPos={tokenYPos[i]} onClick={this.props.updateSelectedToken}
                                scaleX={scaleX[i]} scaleY={scaleY[i]} rotation={rotation[i]}

                                />
                            )
                        })

                    }
                    <TransformerComponent selectedPosition={this.props.selectedToken}/>
                </Layer>
            </Stage> 
                 
        </div>
        
        <ToolBar isGM={this.props.isGM} socket={this.props.socket} username={this.props.username} gameID={this.props.gameID} width={this.props.width} height={this.props.height}/>
        
        </Paper>
        );
    }

}

Canvas.propTypes ={
    classes: PropTypes.object.isRequired
}

const mapStateToProps =(state) => {
    return{
        lines:state.lines,
        selectedTool:state.selectedTool,
        strokeWidth:state.strokeWidth,
        strokeWidths:state.strokeWidths,
        strokeColor:state.strokeColor,
        strokeColors:state.strokeColors,
        gmToolsIsOpen:state.gmToolsIsOpen,
        playersCanDraw:state.playersCanDraw,
        playersCanMove:state.playersCanMove,
        grid:state.grid,
        displayGrid:state.displayGrid,
        activeTokens:state.activeTokens,
        tokenXPos:state.tokenXPos,
        tokenYPos:state.tokenYPos,
        selectedToken:state.selectedToken,
        scaleX:state.scaleX,
        scaleY:state.scaleY,
        rotation:state.rotation,
        backgroundImage:state.backgroundImage
    }
};

export default withStyles(styles)(connect(mapStateToProps, {updateLines, updateStrokeWidths, updateStrokeColors, toggleGmToolsIsOpen, updateGrid, updateTokenXPos, updateTokenYPos, updateSelectedToken, updateScaleX, updateScaleY, updateRotation, updateBackgroundImage})(Canvas))