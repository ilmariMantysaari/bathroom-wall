import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';


import Config from './Config';
import router from './controllers';


export type Context = Koa.Context & KoaRouter.IRouterContext; // & passport.Context;
export type Next = () => Promise<void>;


async function notFound(ctx: Context) {
  ctx.status = 404;
  ctx.body = { message: 'Not Found' };
}


export function makeApp(): Koa {
  const theApp = new Koa();
  
  theApp.use(router.routes());
  theApp.use(notFound);

  return theApp;
}


const app = makeApp();
export default app;


export function getServer(config: Config = Config) {
  const port  = config.server.port;

  console.log(`Starting server at port ${port}`);
  return app.listen(port);
}


export async function start() {
  return getServer();
}
