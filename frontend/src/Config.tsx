interface Config {
  canvasSocketUrl: string;
}
function createConfig(): Config {
  return {
    canvasSocketUrl: process.env.REACT_APP_SOCKET_URL || ''
  };
}

const Config = createConfig();
export default Config;
