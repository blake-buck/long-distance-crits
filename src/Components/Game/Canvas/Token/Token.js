import React from 'react';
import {Image} from 'react-konva';
import useImage from 'use-image';


function Token(props){
    const [image] = useImage(props.src);
    return <Image image={image} width={50} height={50} x={props.tokenXPos} y={props.tokenYPos} 
    draggable={props.draggable} onDragEnd={(e)=>props.onDragEnd(e, props.position)} 

    onClick={()=>{if(props.draggable)props.onClick(props.position)} }
    name={`${props.position}`} 

    onDblClick={()=>props.onClick(-1)} scaleX={props.scaleX} scaleY={props.scaleY} 
    rotation={props.rotation} onTransformEnd={(e)=>props.onTransformEnd(e, props.position)}

    />
}

export default Token;