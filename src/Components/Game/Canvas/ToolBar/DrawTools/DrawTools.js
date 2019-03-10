import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateSelectedTool, updateStrokeWidth, updateStrokeColor} from '../../../../../ducks/reducer';

//materialUI Imports
import IconButton from '@material-ui/core/IconButton';
import Pencil from '@material-ui/icons/Edit';
import Pan from '@material-ui/icons/PanTool';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/lab/Slider';

//<Input value={this.state.strokeColor} onChange={(e)=>this.handleChange('strokeColor', e)} />

class DrawTools extends Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            submitWidth:this.props.strokeWidth,
            strokeColor:this.props.strokeColor,
            r:0,
            g:0,
            b:0
        }
    }

    componentDidMount(){
        var {strokeColor} = this.state;
        var strokeColorArray = strokeColor.split('');
        strokeColorArray.splice(0, 4);
        strokeColorArray.pop();

        var seperatedColors =['','',''];
        var count =0;
        strokeColorArray.map((val) => {
            if(val !== ','){
                seperatedColors[count] += val;
            }
            else{
                seperatedColors[count] = +(seperatedColors[count])
                count++;
            }
        })
        this.setState({r:seperatedColors[0],g:seperatedColors[1], b:seperatedColors[2]})
    }

    

    handleChange(id, e){
        this.setState({[id]:e.target.value})
    }

    changeStrokeColor(rgb, e, value){
        var {strokeColor} = this.state;
        var strokeColorArray = strokeColor.split('');
        strokeColorArray.splice(0, 4);
        strokeColorArray.pop();

        var seperatedColors =['','',''];
        var count =0;
        strokeColorArray.map((val) => {
            if(val !== ','){
                seperatedColors[count] += val;
            }
            else{
                seperatedColors[count] = +(seperatedColors[count])
                count++;
            }
        })
        seperatedColors[2]= +(seperatedColors[2]);

        if(rgb === 'r'){
            seperatedColors[0]=Math.floor(value)
        }
        else if(rgb === 'g'){
            seperatedColors[1]=Math.floor(value)
        }
        else if(rgb === 'b'){
            seperatedColors[2]=Math.floor(value)
        }
        
        this.setState({strokeColor:`rgb(${seperatedColors.join()})`, r:seperatedColors[0], g:seperatedColors[1], b:seperatedColors[2]})
        
        
        // this.setState({strokeColor:`rgb(${r},${g},${b})`})
    }

    submitChange(){
        if(this.state.submitWidth > 0){
            this.props.updateStrokeWidth(+(this.state.submitWidth));
            this.props.updateStrokeWidth(+(this.state.submitWidth));
            

            this.props.updateStrokeColor(this.state.strokeColor);
            this.props.updateStrokeColor(this.state.strokeColor);
            this.setState({open:false})
        }
    }
    openWidthDialog(){
        this.setState({open:true})
    }

    render(){
        
        return(
            <div>
            <Dialog open={this.state.open}>
                <DialogTitle>Change stroke color/width of pencil</DialogTitle>

                <DialogContent style={{overflow:'hidden'}}>
                    <div style={{
                        width:50,
                        height:50,
                        backgroundColor:this.state.strokeColor
                    }}></div>
                    <p>R</p>
                    <Slider value={+(this.state.r)} min={0} max={255} onChange={(e, value)=>this.changeStrokeColor('r', e, value)} />
                    <p>G</p>
                    <Slider value={+(this.state.g)} min={0} max={255} onChange={(e, value)=>this.changeStrokeColor('g', e, value)}/>
                    <p>B</p>
                    <Slider value={+(this.state.b)} min={0} max={255} onChange={(e, value)=>this.changeStrokeColor('b', e, value)}/>
                </DialogContent>

                <DialogActions>
                    
                    <span>Stroke Width</span>
                    <Input value={this.state.submitWidth} onChange={(e)=>this.handleChange('submitWidth', e)} />
                    <Button onClick={()=>this.submitChange()}>Submit</Button>
                </DialogActions>
            </Dialog>

            
                <IconButton onClick={()=>{this.openWidthDialog(); this.props.updateSelectedTool('draw')}}>
                    <Pencil />
                </IconButton>

                <IconButton onClick={()=>this.props.updateSelectedTool('pan')}>
                    <Pan />
                </IconButton>

                
                
            
            </div>
        );
    }

}

const mapStateToProps = state =>{
    return{
        selectedTool:state.selectedTool,
        strokeWidth:state.strokeWidth,
        strokeColor:state.strokeColor
    }
}

export default connect(mapStateToProps, {updateSelectedTool, updateStrokeWidth, updateStrokeColor})(DrawTools);