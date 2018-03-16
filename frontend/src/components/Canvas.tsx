import * as React from 'react';

export type CanvasProps = {
  id: string
  canvasColor: string
  brushColor: string
  lineWidth: number
  height: number
  width: number
  drawCallback: (canvas: HTMLCanvasElement) => any
};

type CanvasState = {
  mouseDown: boolean
};

export class Canvas extends React.Component<CanvasProps, CanvasState> {
  canvas: any;
  bounds: ClientRect;

  constructor(props: any) {
    super(props);

    this.state = {
      mouseDown: false
    };
  }

  componentDidMount() {
    const { brushColor, lineWidth } = this.props;

    let context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    context.lineWidth = lineWidth;
    context.strokeStyle = brushColor;
    context.lineJoin = context.lineCap = 'round';
    this.bounds = this.canvas.getBoundingClientRect();
  }

  componentWillUpdate(asd: any) {
    this.props.drawCallback(this.canvas);
  }

  mouseUp = () => {
    this.setState({ mouseDown: false });
  }

  // TODO: figure out type for the click event
  mouseDown = (e: any) => {
    this.setState({mouseDown: true});
    let x: number = e.pageX - this.bounds.left;
    let y: number = e.pageY - this.bounds.top;

    this.canvas.getContext('2d').moveTo(x, y);
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
