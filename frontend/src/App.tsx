import * as React from 'react';
import { Canvas, CanvasProps } from './components/Canvas';

class App extends React.Component {
  brushColor: '#00FF00';

  render() {
    const props: CanvasProps = {
      id: '',
      canvasColor: '#FFFFFF',
      brushColor: '#00FF00',
      lineWidth: 10,
      height: 500,
      width: 500,
      // TODO: put this to configuration
      socketUrl: 'ws://localhost:3001/socket'
    };
    return (
      <div>
        <Canvas {...props} />
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
