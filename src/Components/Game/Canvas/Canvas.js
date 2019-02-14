import React, {Component} from 'react';
import Konva from 'konva';
import {Stage, Layer, Text, Circle, Rect, Line} from 'react-konva';
import io from 'socket.io-client';

//MaterialUI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    stageContainer:{
        border:'2px solid black',
        maxWidth:700,
        maxHeight:700,
        overflow:'auto'
    }
})

class Canvas extends Component{

    constructor(props){
        super(props);
        this.state={
            lines:[],
            currentLine:[],
            isDrawing:false,
            socket:io(),
            room:this.props.gameID,
            username:this.props.username
        }
    }

    componentDidMount(){
        var {socket, room, lines} = this.state;

        socket.on('connect', ()=>{
            console.log('room');
            socket.emit('room', room)
            
        })

        socket.on('canvas connection', (lines)=>{
            this.setState({lines:lines});
        })

        socket.on('draw', (newLines) => {
            this.setState({lines:newLines});
        })
    }

    emitDrawing(){
        var {socket, lines} = this.state;
        socket.emit('draw', lines);
    }

    beginLine(e){
        var {isDrawing, currentLine, lines} = this.state;
        currentLine.push(e.evt.layerX, e.evt.layerY);
        lines.push([e.evt.layerX, e.evt.layerY]);
        this.setState({isDrawing:true, lines})
    }

    drawLine(e){
        var {isDrawing, currentLine, lines} = this.state;
        if(isDrawing){
            currentLine.push(e.evt.layerX, e.evt.layerY);
            lines[lines.length-1].push(e.evt.layerX, e.evt.layerY)
            lines.push(currentLine);
            this.setState({isDrawing:true, lines, currentLine:[]})
        }
    }

    endLine(e){
        var {currentLine, lines} = this.state;
        
        //lines[lines.length-1].push([e.evt.layerX, e.evt.layerY]);
        lines.push(currentLine);
        this.emitDrawing();
        this.setState({isDrawing:false, lines})
    }


    render(){
        var {lines} = this.state;
        var {classes} = this.props;
        return(
        
        <div className={classes.stageContainer}>
            <Stage width={700} height={700} onMouseDown={(e)=>this.beginLine(e)} onMouseMove={(e)=>this.drawLine(e)} onMouseUp={(e)=>this.endLine(e)}>
                <Layer>
                    {
                    lines.map((val, i) => {
                        return(<Line points={val} key={i} stroke='red' strokeWidth={15} lineCap= 'round'lineJoin= 'round'/>)
                    })
                    }
                </Layer>
            </Stage>        
        </div>
        );
    }

}

Canvas.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Canvas);