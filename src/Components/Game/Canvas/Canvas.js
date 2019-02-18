import React, {Component} from 'react';
import Konva from 'konva';
import {Stage, Layer, Text, Circle, Rect, Line} from 'react-konva';
import {connect} from 'react-redux';
import {updateLines} from '../../../ducks/reducer';
import io from 'socket.io-client';
import DrawTools from './DrawTools/DrawTools.js';

//MaterialUI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
            room:this.props.gameID,
            username:this.props.username
        }
    }

    componentDidMount(){
        console.log(this.props);

        var {lines}=this.props;
        var {gameID, socket} = this.props;
        
        // socket.emit('canvas connection');
        // socket.on('canvas connection', (newLines)=>{
        //     console.log(newLines)
        // })
        
        socket.on('draw', (newLines) => {
            this.setState({lines:newLines})
        })
        this.setState({lines:lines})
    }

    
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({lines:this.props.lines});
        }
    }

    emitDrawing(){
        var {lines} = this.state;
        var {socket} = this.props;
        socket.emit('draw', lines);
    }

    beginLine(e){
        if(this.props.selectedTool === 'draw'){
            var {isDrawing, currentLine, lines} = this.state;
            //currentLine.push(e.evt.layerX, e.evt.layerY);
            lines.push([e.evt.layerX, e.evt.layerY]);

            this.setState({isDrawing:true})
        }
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
        if(this.props.selectedTool === 'draw'){
            var {currentLine, lines} = this.state;
            //this.props.updateLines(currentLine);
            lines[lines.length-1].push([e.evt.layerX, e.evt.layerY]);
            //lines.push(currentLine);
            this.setState({isDrawing:false, lines})
            this.props.updateLines(this.state.lines);
            this.emitDrawing();
        }
    }

    componentWillUnmount(){
        console.log('UNMOUNTING');
        this.props.updateLines(this.props.lines);
    }


    render(){
        var {lines} = this.state;
        var {classes} = this.props;
        return(
        <Paper>
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
        <DrawTools />
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
        selectedTool:state.selectedTool
    }
};

export default withStyles(styles)(connect(mapStateToProps, {updateLines})(Canvas))