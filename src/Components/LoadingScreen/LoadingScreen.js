import React,{Component} from 'react';

//materialUI imports
import CircularProgress from '@material-ui/core/CircularProgress';

//The loading screen is added to enhance user experience when the website is running slowly
function LoadingScreen(props){
    return(
        <CircularProgress />
    )
}

export default LoadingScreen;