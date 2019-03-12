import React,{Component} from 'react';
import SkillComponent from'./SkillComponent/SkillComponent.js';

//MaterialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    grid:{
        textAlign:'center'
    }
})

class Skills extends Component{
    render(){
        const {charsheet, classes} = this.props;
        return(
            <Paper>
                <Grid container className={classes.grid}>
                    <SkillComponent label='Acrobatics' columnTitle='acrobatics' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Animal Handling' columnTitle='animal_handling' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Arcana' columnTitle='arcana' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Athletics' columnTitle='athletics' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Deception' columnTitle='deception' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='History' columnTitle='history' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Insight' columnTitle='insight' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Intimidation' columnTitle='intimidation' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Investigation' columnTitle='investigation' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Medicine' columnTitle='medicine' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Nature' columnTitle='nature' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Perception' columnTitle='perception' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Performance' columnTitle='performance' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Persuasion' columnTitle='persuasion' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Religion' columnTitle='religion' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Sleight of Hand' columnTitle='sleight_of_hand' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Stealth' columnTitle='stealth' charsheet={charsheet} game={this.props.game}/>
                    <SkillComponent label='Survival' columnTitle='survival' charsheet={charsheet} game={this.props.game}/>
                    
                    <Grid item xs={12}>
                        <Typography component='p'>
                            Skills
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Paper>
        )
    }
}

Skills.propTypes = {
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(Skills);