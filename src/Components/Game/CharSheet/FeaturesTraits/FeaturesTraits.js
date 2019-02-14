import React, {Component} from 'react';

//materialUI imports
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from'@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    overflow:{
        overflow:'auto'
    }
})

class FeaturesTraits extends Component{
    render(){
        var {classes} = this.props;
        return(
            <Grid item xs={12} >
              <Paper>
    

                <Input multiline fullWidth rows={9} className={classes.overflow}/>

                <Typography component='p'>
                    Features & Traits
                </Typography>


              </Paper>
            </Grid>
        )
    }
}

FeaturesTraits.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FeaturesTraits);