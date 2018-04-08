import * as React from 'react';

export type CanvasProps = {
  id: string
  canvasColor: string
  height: number
  width: number
  socketUrl: string
  brushColor: string
  lineWidth: number
};

type CanvasState = {
  mouseDown: boolean
};

export class Canvas extends React.Component<CanvasProps, CanvasState> {
  canvas: any;
  bounds: ClientRect;
  connection: WebSocket;

  constructor(props: CanvasProps) {
    super(props);
    this.state = {
      mouseDown: false
    };
  }

  componentDidMount() {
    const { lineWidth, brushColor, socketUrl } = this.props;

    let context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    context.lineWidth = lineWidth;
    context.strokeStyle = brushColor;
    context.lineJoin = context.lineCap = 'round';
    this.bounds = this.canvas.getBoundingClientRect();
    this.setSocket(socketUrl);
  }

  componentWillReceiveProps(props: any) {
    let context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    context.strokeStyle = props.brushColor;
  }

  setSocket(url: string) {
    this.connection = new WebSocket(url);

    this.connection.onopen = () => {
      this.connection.send('open');
    };

    this.connection.onmessage = (evt: any) => {
      var img = new Image();
      var canvas = this.canvas;
      img.onload = function() {
        canvas.getContext('2d').drawImage(img, 0, 0);
      };
      img.src = evt.data;
    };
  }

  componentWillUpdate(asd: any) {
    // TODO: The way this works now is retarded
    // change so that it doesn't always send the entire image
    // only the line drawn
    this.connection.send(this.canvas.toDataURL());
  }

  mouseUp = () => {
    this.setState({ mouseDown: false });
  }

  // TODO: figure out type for the click event
  mouseDown = (e: any) => {
    this.setState({mouseDown: true});
    let x: number = e.pageX - this.bounds.left;
    let y: number = e.pageY - this.bounds.top;

    let context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
  }

  mouseMove = (e: any) => {
    if (this.state.mouseDown) {
      let x: number = e.pageX - this.bounds.left;
      let y: number = e.pageY - this.bounds.top;

      let context: CanvasRenderingContext2D = this.canvas.getContext('2d');
      context.lineTo(x, y);
      context.stroke();
    }
  }

  render() {
    return (
      <canvas
        ref={ref => (this.canvas = ref)}
        id={this.props.id}

        width={this.props.width}
        height={this.props.height}
        style={{
          background: this.props.canvasColor,
          width: this.props.width,
          height: this.props.height
        }}

        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMouseMove={this.mouseMove}
      />
    );
  }
}
