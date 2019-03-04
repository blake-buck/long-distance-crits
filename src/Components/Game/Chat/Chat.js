import React, {Component} from 'react';
import ExitGameButton from './ExitGameButton/ExitGameButton.js';
import ChatMessage from './ChatMessage/ChatMessage.js';

//Material UI imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const styles = theme =>({
    paper:{
        [ theme.breakpoints.down('sm')]:{
            height:'40%',
            maxHeight:'40vh'
        },
        [ theme.breakpoints.up('md')]:
        {
            height:'96vh',
            maxHeight:'96vh'
        },
       // overflow:'auto'
    },
    messageBox:{
        overflow:'auto',
        height:'90%',
    },
    inputAndExit:{
        
    }
})

class Chat extends Component{

    constructor(props){
        super(props);
        this.state={
            messages:[],
            inputContent:'',
            room:this.props.gameID,
            username:this.props.username,
            socket:this.props.socket
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        var {messages, socket, room} = this.state;

        socket.on('connect', ()=>{
            socket.emit('room', room)
        })

        socket.on('chat message', (message) => {
            messages.push({message, username:this.state.username });
            this.setState({messages});
        })

    }
    emitMessage(e){
        e.preventDefault();
        var {inputContent} = this.state;
        if(inputContent.substring(0, 5) ==='/roll'){
            // /roll 1d20
            // 0123456789
            var numberOfDice =0;
            var numberOfSides = 0;
            var indivDice = [];
            var total =0;

            if(+(inputContent.substring(6, 7)) > 0){
                numberOfDice=+(inputContent.substring(6, 7));
            }
            if(+(inputContent.substring(8, inputContent.length)) > 0){
                numberOfSides = +(inputContent.substring(8, inputContent.length));
            }
            for(var i=0; i<numberOfDice; i++){
                var dieRoll = Math.floor(Math.random()*numberOfSides+1)
                if(numberOfDice>1)indivDice.push(dieRoll);
                total += dieRoll;
            }
            if(numberOfDice>1){
                indivDice = indivDice.join(' + ');
                indivDice += ' = ';
            }

            this.state.socket.emit('chat message', `!${this.state.username} rolled ${numberOfDice}d${numberOfSides}`);
            this.state.socket.emit('chat message', `!${indivDice}${total}`);
        }
        else{
            this.state.socket.emit('chat message', `${this.state.username.charAt(0)}${this.state.inputContent}`);
        }
        
        this.setState({inputContent:''});
    }
    handleChange(e){
        this.setState({inputContent:e.target.value})
    }

    componentWillUnmount(){
        var {socket} = this.state;
        socket.close();
    }

    render(){
        var {classes} = this.props;
        var {messages} = this.state;
        return(
            <Paper className={classes.paper}>
                <div className={classes.messageBox}>
                {
                    
                    messages.map((val, i) => {
                        return(<ChatMessage key={i} message={val.message} username={val.username} componentDidMount={this.componentDidMount}/>)
                    })
                }
                </div>

                
                    <form onSubmit={(e)=>this.emitMessage(e)}>
                    <TextField variant='outlined' fullWidth placeholder='Type Message here' onChange={(e)=>this.handleChange(e)} value={this.state.inputContent}/>
                    </form>

                    <ExitGameButton socket={this.state.socket}/>
                
            </Paper>
        );
    }

}

Chat.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Chat);