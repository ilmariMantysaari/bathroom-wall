import * as React from 'react';
import { Canvas, CanvasProps } from './components/Canvas';
import Config from './Config';

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
      socketUrl: Config.canvasSocketUrl
    };

    return (
      <div>
        <Canvas {...props} />
        Brush color:
        <input
          type="text"
          value={this.brushColor}
        />
        <br/>
        Work in progress<br/>
        Disclaimer: I'm not responsible for anything shown here, anyone can draw anything
        Sources at 
        <a href="https://github.com/ilmariMantysaari/bathroom-wall">
        https://github.com/ilmariMantysaari/bathroom-wall</a>
      </div>
    );
  }
}

export default App;
