import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateQuestLog} from '../../../ducks/reducer';

//materialUI imports
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Clear from '@material-ui/icons/Clear';

const styles = theme =>({
    questTitle:{
        fontSize:'2em'
    },
    questObjectives:{
        fontSize:'1.3em'
    }, 
    questPaper:{
        height:'96vh',
        maxHeight:'96vh'
    }
})

class QuestLog extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedQuest:0,
            title:'',
            description:'',
            objectives:'',
            quest_id:'',
            questLog:this.props.questLog
        }
    }

    componentDidMount(){
        var {questLog} = this.props;
        if(questLog[0]){
            this.setState({
                questLog:questLog, 
                title:questLog[0].title,
                description:questLog[0].description,
                objectives:questLog[0].objectives,
                quest_id:questLog[0].quest_id
            })
        } 
    }
    
    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.setState({questLog:this.props.questLog})
        }
    }

    selectQuest(i){
        var {questLog} = this.state;
        this.setState(
            {selectedQuest:i, 
            title:questLog[i].title,
            description:questLog[i].description,
            objectives:questLog[i].objectives,
            quest_id:questLog[i].quest_id
        });
    }

    deleteQuest(quest_id){
        var {questLog} = this.state;
        var {socket} = this.props;
        questLog.map((val,i) => {
            if(val.quest_id === quest_id){
                questLog.splice(i, 1);
            }
        })
        axios.post(`/api/game/${this.props.gameID}/quest/delete`,{quest_id:quest_id});
        this.props.updateQuestLog(questLog);
        socket.emit('questLog', questLog);
        this.setState({questLog, title:'', description:'', objectives:''})
    }

    createQuest(){
        var {questLog} = this.state;
        var {socket} = this.props;
        axios.post(`/api/game/${this.props.gameID}/quest`, {title:'New Quest', description:'Description', objectives:'Objectives'}).then((results) => {
            questLog.push(results.data[0])
            this.props.updateQuestLog(questLog);
            this.setState({questLog})
            socket.emit('questLog', questLog);
            this.componentDidUpdate();
        });

    }

    handleChange(id, e){
        var {quest_id, questLog, selectedQuest} = this.state;
        var {socket} = this.props;
        
        questLog[selectedQuest][id]=e.target.value

        var title = questLog[selectedQuest].title;
        var description = questLog[selectedQuest].description;
        var objectives = questLog[selectedQuest].objectives;
        axios.put(`/api/game/${this.props.gameID}/quest`, {quest_id, title, description, objectives}).then(()=>{
            
        });
        this.props.updateQuestLog(questLog);
        this.setState({[id]:e.target.value, questLog});
        socket.emit('questLog', questLog);
        
    }


    render(){
        var {classes} = this.props;
        var {questLog, quest_id} = this.state;

        return(
            <Grid container spacing={16}>

                <Grid item xs={12} md={4}>
                <Paper>
                    {questLog.map((val, i) => {
                        return(
                            <Paper key={i}>
                                <ButtonBase onClick={()=>this.selectQuest(i)}>
                                    <Typography component='h4' variant='h6'>
                                        {val.title}
                                    </Typography>
                                </ButtonBase> 

                            {this.props.isGM ?  <IconButton onClick={()=>this.deleteQuest(val.quest_id)}><Clear/></IconButton>: <div/>}

                            </Paper>
                        )
                    })}
                    {this.props.isGM ? <Button onClick={()=>this.createQuest()}>Create Quest</Button> : <div /> }
                </Paper>
                </Grid>
                
                <Grid item xs={12} md={8}>
                {this.props.isGM ? 
                (<Paper className={classes.questPaper}>
                    {this.state.questLog[0] ? <div>
                        <Input disabled={quest_id === ''} className={classes.questTitle} fullWidth value={this.state.title} onChange={(e)=>{this.handleChange('title', e)}}/>

                        <Input disabled={quest_id === ''} fullWidth value={this.state.description} onChange={(e)=>{this.handleChange('description', e)}}/>

                        <Input disabled={quest_id === ''} className={classes.questObjectives} fullWidth multiline rows={Math.floor(window.innerHeight/27)} value={this.state.objectives} onChange={(e)=>{this.handleChange('objectives', e)}}/></div> : <Typography component='h2' variant='h2'>You havent created a quest yet!</Typography>}
                    
                </Paper>)
                :
                (
                <Paper className={classes.questPaper}>
                {this.state.questLog[0] ? <div>
                    
                    <Typography component='h4' variant='h4'>
                        {this.state.title}
                    </Typography>

                    <Typography component='p' variant='subheading'>
                        {this.state.description}
                    </Typography>

                    <Typography component='h6' variant='h6'>
                        {this.state.objectives}
                    </Typography>

                </div> : <Typography component='h2' variant='h2'>Your GM hasn't created any quests yet!</Typography>
                }
                </Paper>
                )

            }
                
                
                
                
                </Grid>

           

            </Grid>
        )
    }
}

QuestLog.propTypes ={
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return{
        questLog:state.questLog
    }
}

export default withStyles(styles)(connect(mapStateToProps, {updateQuestLog})(QuestLog));