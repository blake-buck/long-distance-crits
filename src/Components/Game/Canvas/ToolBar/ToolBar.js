import React,{Component} from 'react';
import GmTools from './GmTools/GmTools.js';
import DrawTools from './DrawTools/DrawTools.js';
import Dice from './Dice/Dice.js';
import {toggleGmToolsIsOpen} from '../../../../ducks/reducer.js';
import {connect} from 'react-redux';


//materialUI imports 
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    toolbar:{
        display:'flex',
        alignItems:'center'
    }
})

class ToolBar extends Component{

    render(){
        var {gmToolsIsOpen, classes, isGM} = this.props;
        return(
            <Paper>
                <GmTools socket={this.props.socket} username={this.props.username} gameID={this.props.gameID} width={this.props.width} height={this.props.height}/>
                <Grid container className={classes.toolbar} >
                <Grid item xs={3}>
                    {isGM ?<Button onClick={()=>this.props.toggleGmToolsIsOpen(!gmToolsIsOpen)}>Open GM Tools</Button> : <div /> }
                </Grid>

                <Grid item xs={6}>
                    <Dice socket={this.props.socket} username={this.props.username}/>
                </Grid>

                <Grid item xs={3}>
                    <DrawTools />
                </Grid>
                </Grid>
            </Paper>
        )
    }
}

ToolBar.propTypes={
    classes: PropTypes.object.isRequired
}

const mapStateToProps =(state) => {
    return{
        gmToolsIsOpen:state.gmToolsIsOpen
    }
};

export default withStyles(styles)(connect(mapStateToProps,{toggleGmToolsIsOpen})(ToolBar));