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
import DialogTitle from '@material-ui/core/DialogTitle';

class DrawTools extends Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            submitWidth:this.props.strokeWidth,
            strokeColor:this.props.strokeColor
        }
    }

    

    handleChange(id, e){
        this.setState({[id]:e.target.value})
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
                <DialogTitle>Change stroke width of pencil</DialogTitle>
                <DialogActions>
                    <Input value={this.state.strokeColor} onChange={(e)=>this.handleChange('strokeColor', e)} />
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