import React,{Component} from 'react';
import TinyInputField from './TinyInputField/TinyInputField.js';

//materialUI imports
import Grid from '@material-ui/core/Grid';

class TopRightBar extends Component{

    render(){
        return(
            <Grid container>
                <TinyInputField label='Class & Level' columnTitle='charclass' game={this.props.game} charsheet={this.props.charsheet} type='text' defaultValue={this.props.charsheet.charclass}/>

                <TinyInputField label='Background' columnTitle='background' game={this.props.game} charsheet={this.props.charsheet} type='text' defaultValue={this.props.charsheet.background}/>

                <TinyInputField label='Player Name' columnTitle='playername' game={this.props.game} charsheet={this.props.charsheet} type='text' defaultValue={this.props.charsheet.playername}/>

                <TinyInputField label='Race' columnTitle='race' game={this.props.game} charsheet={this.props.charsheet} type='text' defaultValue={this.props.charsheet.race}/>

                <TinyInputField label='Alignment' columnTitle='alignment' game={this.props.game} charsheet={this.props.charsheet} type='text' defaultValue={this.props.charsheet.alignment}/>

                <TinyInputField label='Experience Points' columnTitle='exp' game={this.props.game} charsheet={this.props.charsheet} type='number' defaultValue={this.props.charsheet.exp}/>
            </Grid>
        )
    }

}

export default TopRightBar;