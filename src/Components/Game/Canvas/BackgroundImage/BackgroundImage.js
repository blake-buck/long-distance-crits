import React from 'react';
import {Image} from 'react-konva';
import useImage from 'use-image';

function BackgroundImage(props){
    
        const [image] = useImage(props.src);
        return <Image 
        image={image} width={props.canvasWidth} height={props.canvasHeight} 
        x={0} y={0} 
        />
    
}

export default BackgroundImage;