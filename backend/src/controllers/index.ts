import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

export function getIndex(ctx: Koa.Context) {
  console.log("jeppis");
  ctx.body = 'jeppis';
}


export function makeRouter(): KoaRouter {
  const theRouter = new KoaRouter();

  theRouter.get('/', getIndex);

  return theRouter;
}


export default makeRouter();
