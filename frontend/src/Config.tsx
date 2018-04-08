interface Config {
  canvasSocketUrl: string;
  canvasWidth: number;
  canvasHeight: number;
}
function createConfig(): Config {
  return {
    canvasSocketUrl: process.env.REACT_APP_SOCKET_URL || '',
    canvasWidth: parseInt(process.env.REACT_APP_CANVAS_WIDTH || '1000', 10),
    canvasHeight: parseInt(process.env.REACT_APP_CANVAS_HEIGHT || '1000', 10)
  };
}

const Config = createConfig();
export default Config;
