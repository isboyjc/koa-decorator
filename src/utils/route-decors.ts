/*
 * @Author: isboyjc
 * @Date: 2020-01-01 10:28:14
 * @LastEditors  : isboyjc
 * @LastEditTime : 2020-01-01 23:23:57
 * @Description: file content
 */
import * as glob from "glob";
import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as chalk from "chalk";

type HTTPMethod = "get" | "put" | "del" | "post" | "patch";

type LoadOptions = {
  // 路由文件扩展名
  extname?:string;
}

type RouteOptions = {
  // 路由前缀
  prefix?: string;
  // 当前路由添加中间件 一个或多个
  middlewares?: Array<Koa.Middlewares>;
}

const router = new KoaRouter();

const decoraet = (method:HTTPMethod, path:string, options:RouteOptions = {}, router:KoaRouter) => {
  return (target, property, descriptor) => {
    process.nextTick(()=>{
      const middlewares = [];

      if(target.middlewares) middlewares.push(...target.middlewares);

      if(options.middlewares) middlewares.push(...options.middlewares);

      const url = options && options.prefix ? options.prefix + path : path;
      console.log(chalk.red(url))

      middlewares.push(target[property])
      router[method](url, ...middlewares)
    })
  }
}

const method = method => (path:string, options?:RouteOptions) => decoraet(method, path, options, router)

export const get = method("get")
export const post = method("post")
export const put = method("put")
export const del = method("del")
export const patch = method("patch")

export const load = (folder:string, options:LoadOptions = {}):KoaRouter => {
  const extname = options.extname || '.{js,ts}'
  glob.sync(require("path").join(folder, `./**/*${extname}`)).map(file => require(file))
  return router
}

export const middlewares = (middlewares: Koa.Middlewares[]) => {
  return (target) => {
    target.prototype.middlewares = middlewares
  }
}

export const check = (callback: Function) => {
  return (target, property, descriptor) => {
    const oldFun = descriptor.value
    descriptor.value = async (...arg) => {
      if(callback && await callback(...arg) !== false) return oldFun.apply(null,arg)
    }
  }
}
