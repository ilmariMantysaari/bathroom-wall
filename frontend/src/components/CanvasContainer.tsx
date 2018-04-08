import * as React from 'react';
import { Canvas } from './Canvas';
import Config from '../Config';

export type CanvasContainerProps = {

};

export type CanvasContainerState = {
  brushColor: string
};

class CanvasContainer extends React.Component<CanvasContainerProps, CanvasContainerState> {

  constructor(props: CanvasContainerProps) {
    super(props);
    this.state = {brushColor: 'black'};
  }

  onColorChange = (evt: any) => {
    this.setState({ brushColor: evt.target.value });
  }

  render() {
    return (
      <div>
        <div>
          Brush color:
          <input
            type="text"
            onChange={this.onColorChange}
          />
          <small>Any <a href="https://www.w3schools.com/colors/colors_picker.asp" target="_blank">
          HTML color</a> works</small>
        </div>

        <Canvas
          id={'canvas'}
          canvasColor={'#FFFFFF'}
          height={Config.canvasHeight}
          width={Config.canvasWidth}
          brushColor={this.state.brushColor}
          lineWidth={10}
          socketUrl={Config.canvasSocketUrl}
        />
        <br/>
        
      </div>
    );
  }
}

export default CanvasContainer;
