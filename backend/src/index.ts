import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import WebSocket = require('koa-websocket');

import Config from './Config';

export type Context = Koa.Context & KoaRouter.IRouterContext;
export type Next = () => Promise<void>;

var canvas: string;
var activeConnections: Array<any>;
var connections: number;

async function getCanvas(ctx: Koa.Context) {
  ctx.body = { message: 'MOROMORO' };
}

function canvasSocket(ctx) {
  ctx.websocket.on('message', function (message) {
    // FIXME: this is sort of hacky, figure the proper way to get the open event
    if(message == 'open'){
      let index = connections++;
      ctx.websocket.id = index;
      activeConnections.push(ctx.websocket);
      ctx.websocket.send(canvas);
      console.log(ctx.websocket.id + " open");
    }else {
      canvas = message;
      for(let conn of activeConnections){
        conn.send(canvas);
      }
    }
  }).on('close', function() {
    activeConnections = activeConnections.filter(i => i.id != ctx.websocket.id);
    console.log(ctx.websocket.id + " closed");
  })
}

function makeApp(): Koa {
  const app = WebSocket(new Koa());
  const http = new KoaRouter();
  const ws = new KoaRouter();
  app.use(bodyParser());

  http.get('/getcanvas', getCanvas);
  ws.get('/socket', canvasSocket);

  app.use(http.routes());
  app.ws.use(ws.routes());

  connections = 0;
  activeConnections = new Array<any>();
  return app;
}

const app = makeApp();
export default app;

export function getServer(config: Config = Config) {
  const port = config.server.port;

  console.log(`Listening ${port}`);
  return app.listen(port);
}

export async function start() {
  return getServer();
}
