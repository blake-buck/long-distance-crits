import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//materialUI imports
import Button from '@material-ui/core/Button';

class ExitGameButton extends Component{


    render(){
        return(
            <div>
                <Button fullWidth color='secondary' variant='contained' onClick={()=>this.props.socket.disconnect()} component={Link} to='/creategame'>Exit Game</Button>
            </div>
        )
    }
}

export default ExitGameButton;