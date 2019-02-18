import React, {Component} from 'react';
import FeaturesTraits from './FeaturesTraits/FeaturesTraits.js';
import BigField from './BigField/BigField.js';
import SmallField from './SmallField/SmallField.js';
import SavingThrows from './SavingThrows/SavingThrows.js';
import TopRightBar from './TopRightBar/TopRightBar.js'
import DeathSaves from './DeathSaves/DeathSaves.js';
import Skills from './Skills/Skills.js';

import {connect} from 'react-redux';
import {getCharSheet} from '../../../ducks/reducer';

//materialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from'@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const styles = theme => ({
    root:{
        flexGrow:1
    },
    paper:{
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    smHeight:{
        paddingTop: theme.spacing.unit*3, 
        paddingBottom: theme.spacing.unit*3
    },
    medHeight:{
        paddingTop: theme.spacing.unit*5, 
        paddingBottom: theme.spacing.unit*5
    },
    bigHeight:{
        paddingTop: theme.spacing.unit*8, 
        paddingBottom: theme.spacing.unit*8
    },
    vbigHeight:{
        paddingTop: theme.spacing.unit*13, 
        paddingBottom: theme.spacing.unit*13 
    },
    skillsHeight:{
        paddingTop: theme.spacing.unit*24,
        paddingBottom: theme.spacing.unit*24
    },
    attacksHeight:{
        paddingTop:theme.spacing.unit*11,
        paddingBottom:theme.spacing.unit*11
    },
    equipmentHeight:{
        paddingTop:theme.spacing.unit*31,
        paddingBottom:theme.spacing.unit*32
    },
    languageHeight:{
        paddingTop:theme.spacing.unit*14,
        paddingBottom:theme.spacing.unit*14
    }
})

class CharSheet extends Component{

    constructor(props){
        super(props);
        this.state ={
            charsheet:this.props.charsheet[0]
        }
        this.render = this.render.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            
        }
    }

    render(){
        const {classes} = this.props;
        var {charsheet} = this.state;
        return(
            <div className={classes.root}>
                <Grid container spacing={16}>

                    <SmallField label='Character Name' desktopWidth={3} defaultValue={charsheet.character_name} type='text' game={this.props.gameID} columnTitle='character_name' charsheet={charsheet} />

                    <Grid item xs={9}>
                        <TopRightBar game={this.props.gameID} charsheet={charsheet} />
                    </Grid>

                    <Grid item xs={3} sm={2} md={1}>
                    <Grid container spacing={32}>

                    <SmallField label='Strength' desktopWidth={12} defaultValue={charsheet.str} type='number' game={this.props.gameID} columnTitle='str' charsheet={charsheet} />

                    <SmallField label='Dexterity' desktopWidth={12} defaultValue={charsheet.dex} type='number' game={this.props.gameID} columnTitle='dex' charsheet={charsheet} />

                    <SmallField label='Constitution' desktopWidth={12} defaultValue={charsheet.con} type='number' game={this.props.gameID} columnTitle='con' charsheet={charsheet} />

                    <SmallField label='Intelligence' desktopWidth={12} defaultValue={charsheet.int} type='number' game={this.props.gameID} columnTitle='intel' charsheet={charsheet} />

                    <SmallField label='Wisdom' desktopWidth={12} defaultValue={charsheet.wis} type='number' game={this.props.gameID} columnTitle='wis' charsheet={charsheet} />

                    <SmallField label='Charisma' desktopWidth={12} defaultValue={charsheet.cha} type='number' game={this.props.gameID} columnTitle='cha' charsheet={charsheet} />

                    </Grid>
                    </Grid>

                    <Grid item xs={9} sm={4} md={2}>
                    <Grid container spacing={16}>
                        <SmallField label='Inspiration' defaultValue={charsheet.inspiration} desktopWidth={12} type='number' game={this.props.gameID} columnTitle='inspiration' charsheet={charsheet} />
                        <SmallField label='Perception' desktopWidth={12} defaultValue={charsheet.perception} type='number' game={this.props.gameID} columnTitle='perception' charsheet={charsheet} />

                        <SavingThrows/>

                        <Grid item xs={12}>
                            <Skills charsheet={charsheet} game={this.props.gameID}/>
                        </Grid>

                    </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                    <Grid container spacing={8}>

                        <SmallField label='Armor Class' desktopWidth={4} defaultValue={charsheet.ac} type='number' game={this.props.gameID} columnTitle='ac' charsheet={charsheet} />

                        <SmallField label='Initiative' desktopWidth={4} defaultValue={charsheet.initiative} type='number' game={this.props.gameID} columnTitle='initiative' charsheet={charsheet} />

                        <SmallField label='Speed' desktopWidth={4} defaultValue={charsheet.speed} type='number' game={this.props.gameID} columnTitle='speed' charsheet={charsheet} />

                        <SmallField label='Max Hitpoints' desktopWidth={12} defaultValue={charsheet.hp_max} type='number' game={this.props.gameID} columnTitle='hp_max' charsheet={charsheet}  />

                        <SmallField label='Current Hitpoints' desktopWidth={12} defaultValue={charsheet.hp} type='number' game={this.props.gameID} columnTitle='hp' charsheet={charsheet}  />

                        <SmallField label='Temporary Hit Points' desktopWidth={12} defaultValue={charsheet.temp_hp} type='number' game={this.props.gameID} columnTitle='temp_hp' charsheet={charsheet} />


                        <SmallField label='Hit Dice' desktopWidth={6} defaultValue={charsheet.hitdice} type='number' game={this.props.gameID} columnTitle='hitdice' charsheet={charsheet} />

                        <Grid item xs={6}>
                            <DeathSaves charsheet={charsheet} game={this.props.gameID} />
                        </Grid>

                        <BigField label='Attacks & Spellcasting' rows={8} desktopWidth={12} defaultValue={charsheet.attacks_spellcasting} columnTitle='attacks_spellcasting' game={this.props.gameID} charsheet={charsheet}/>

                    </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                    <Grid container spacing={8}>

                        
                        <BigField label='Features & Traits' rows={9} desktopWidth={12} defaultValue={charsheet.features_traits} columnTitle='features_traits' game={this.props.gameID} charsheet={charsheet}/>

                        <BigField label='Equipment' rows={25} desktopWidth={12} defaultValue={charsheet.equipment} columnTitle='equipment' game={this.props.gameID} charsheet={charsheet}/>
                        

                        
                    </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                    <Grid container spacing={16}>

                        <BigField label='Personality Traits' rows={5} desktopWidth={12} defaultValue={charsheet.personality} columnTitle='personality' game={this.props.gameID} charsheet={charsheet}/>

                        <BigField label='Ideals' rows={3} desktopWidth={12} defaultValue={charsheet.ideals} columnTitle='ideals' game={this.props.gameID} charsheet={charsheet}/>

                        <BigField label='Bonds' rows={3} desktopWidth={12} defaultValue={charsheet.bonds} columnTitle='bonds' game={this.props.gameID} charsheet={charsheet}/>

                        <BigField label='Flaws' rows={3} desktopWidth={12} defaultValue={charsheet.flaws} columnTitle='flaws' game={this.props.gameID} charsheet={charsheet}/>

                        <BigField label='Other Proficiencies & Languages' rows={8} desktopWidth={12} defaultValue={charsheet.languages_proficiencies} columnTitle='languages_proficiencies' game={this.props.gameID} charsheet={charsheet}/>

                    </Grid>
                    </Grid>

                </Grid>
            </div>
        );
    }

}

CharSheet.propTypes={
    classes: PropTypes.object.isRequired
}
const mapStateToProps =(state) => {
    return{
        charsheet:state.charsheet
    }
};
//
export default withStyles(styles)(connect(mapStateToProps, {getCharSheet})(CharSheet));