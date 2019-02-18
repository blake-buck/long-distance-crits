import React,{Component} from 'react';
import {connect} from 'react-redux';
import {updateSaveChecks, updateFailChecks, updateCharSheet} from '../../../../ducks/reducer';

//materialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from'@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Unchecked from '@material-ui/icons/RadioButtonUnchecked';
import Checked from '@material-ui/icons/RadioButtonChecked';


class DeathSaves extends Component{
    constructor(props){
        super(props);
        this.state={
            saveChecks:this.props.saveChecks,
            failChecks:this.props.failChecks,
            saves:this.props.charsheet[0].deathsave_successes,
            fails:this.props.charsheet[0].deathsave_failures
        }
    }

    componentDidMount(){
        var {saveChecks, failChecks, saves, fails} = this.state;
        //console.log(this.props.charsheet);
        console.log("SAVES", saves);
        for(var i=0; i<saves; i++){
            saveChecks[i]=true;
        }
        for(var i=0; i<fails; i++){
            failChecks[i]=true;
        }
        this.props.updateSaveChecks(saveChecks);
        this.props.updateFailChecks(failChecks);
        this.setState({saveChecks, failChecks})
    }
    
    handleSaveChange(e, boolean){
        var {game, charsheet} = this.props;
        var {saveChecks, saves} = this.state;

        saveChecks[+e.target.value]=boolean;
        if(boolean){
            saves++;
        }
        else{
            saves--;
        }
        this.props.updateCharSheet(game, 'deathsave_successes', saves, charsheet);
        this.props.updateSaveChecks(saveChecks);
        this.setState({saveChecks, saves})
    }

    handleFailChange(e, boolean){
        var {game, charsheet} = this.props;
        var {failChecks, fails} = this.state;
        failChecks[+e.target.value]=boolean;
        if(boolean){
            fails++;
        }
        else{
            fails--;
        }
        this.props.updateCharSheet(game, 'deathsave_failures', fails, charsheet);
        this.props.updateFailChecks(failChecks);
        this.setState({failChecks, fails})
    }

    render(){
        var {saveChecks, failChecks}=this.state;
        return(
            <Paper>
                <Grid container>
                    <Grid item xs={12}>
                        <Checkbox checked={saveChecks[0]} value='0' checkedIcon={<Checked />} icon={<Unchecked />} onChange={(e, boolean)=>this.handleSaveChange(e, boolean)}/>
                        <Checkbox checked={saveChecks[1]} value='1' checkedIcon={<Checked />} icon={<Unchecked />} onChange={(e, boolean)=>this.handleSaveChange(e, boolean)}/>
                        <Checkbox checked={saveChecks[2]} value='2' checkedIcon={<Checked />} icon={<Unchecked />} onChange={(e, boolean)=>this.handleSaveChange(e, boolean)}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Checkbox checked={failChecks[0]} value='0' checkedIcon={<Checked />} icon={<Unchecked />} onChange={(e, boolean)=>this.handleFailChange(e, boolean)}/>
                        <Checkbox checked={failChecks[1]} value='1' checkedIcon={<Checked />} icon={<Unchecked />} onChange={(e, boolean)=>this.handleFailChange(e, boolean)}/>
                        <Checkbox checked={failChecks[2]} value='2' checkedIcon={<Checked />} icon={<Unchecked />} onChange={(e, boolean)=>this.handleFailChange(e, boolean)}/>
                    </Grid>
                </Grid>
                <Typography>
                    Death Saving Throws
                </Typography>
            </Paper>
        )
    }

}

const mapStateToProps =(state) => state;

export default connect(mapStateToProps, {updateFailChecks, updateSaveChecks, updateCharSheet})(DeathSaves);