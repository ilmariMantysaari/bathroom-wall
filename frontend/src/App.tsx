import * as React from 'react';
import CanvasContainer from './components/CanvasContainer';

class App extends React.Component {
  render() {

    return (
      <div>
        <div id="header">
        Work in progress<br/>
        Disclaimer: I'm not responsible for anything shown here, anyone can draw anything<br/>
        Sources at <a href="https://github.com/ilmariMantysaari/bathroom-wall" target="_blank">
        https://github.com/ilmariMantysaari/bathroom-wall</a>
        </div>

       <CanvasContainer />
      </div>
    );
  }
}

export default App;
