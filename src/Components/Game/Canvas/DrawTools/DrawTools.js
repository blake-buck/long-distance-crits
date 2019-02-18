import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateSelectedTool} from '../../../../ducks/reducer';

//materialUI Imports
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Pencil from '@material-ui/icons/Edit';
import Pan from '@material-ui/icons/PanTool';
import { Icon } from '@material-ui/core';

class DrawTools extends Component{
    render(){
        return(
            <Paper>

                <IconButton onClick={()=>this.props.updateSelectedTool('draw')}>
                    <Pencil />
                </IconButton>

                <IconButton onClick={()=>this.props.updateSelectedTool('pan')}>
                    <Pan />
                </IconButton>
                
            </Paper>
        );
    }

}

const mapStateToProps = state =>{
    return{
        selectedTool:state.selectedTool
    }
}

export default connect(mapStateToProps, {updateSelectedTool})(DrawTools);