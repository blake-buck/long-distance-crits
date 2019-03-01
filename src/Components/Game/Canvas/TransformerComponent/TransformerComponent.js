import React,{Component} from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';

//For the moment this code is straight up ripped from https://konvajs.org/docs/react/Transformer.html
//because I haven't the slightest idea what the hell is going on here

class TransformerComponent extends Component {

    componentDidMount() {
      console.log('TRANSFORMER IS MOUNTING!')
      this.checkNode();
      
    }

    componentDidUpdate() {
      this.checkNode();
    }

    checkNode() {
      // here we need to manually attach or detach Transformer node
      const stage = this.transformer.getStage();
      const { selectedPosition } = this.props;
  
      const selectedNode = stage.findOne('.' + selectedPosition);
      // do nothing if selected node is already attached
      if (selectedNode === this.transformer.node()) {
        return;
      }
  
      if (selectedNode) {
        // attach to another node
        this.transformer.attachTo(selectedNode);
      } else {
        // remove transformer
        this.transformer.detach();
      }
      this.transformer.getLayer().batchDraw();
    }

    render() {
      return (
        <Transformer
          ref={node => {
            this.transformer = node;
          }}
        />
      );
    }

  }

export default TransformerComponent;