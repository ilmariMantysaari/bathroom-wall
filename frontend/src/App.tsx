import * as React from 'react';
import './App.css';
import { Canvas, CanvasProps } from './components/Canvas';

class App extends React.Component {
  brushColor: '#000000';

  sync = (canvas: HTMLCanvasElement) => {
    console.log('SYNCS');
    console.log(canvas);
  }
  
  render() {
    const props: CanvasProps = {
      id: '',
      canvasColor: '#FFFFFF',
      brushColor: this.brushColor,
      lineWidth: 10,
      height: 500,
      width: 500,
      drawCallback: this.sync,
    };
    return (
      <div>
        <Canvas {...props}/>
        Brush color:
        <input 
          type="text"
          value={this.brushColor}
        />
      </div>
    );
  }
}

export default App;
