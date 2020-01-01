/*
 * @Author: isboyjc
 * @Date: 2020-01-01 10:22:24
 * @LastEditors  : isboyjc
 * @LastEditTime : 2020-01-01 23:56:09
 * @Description: user类
 */
import * as Koa from "koa";
import {get,post,middlewares,check} from "./../utils/route-decors";
import model from "./../model/user"

const users = [{name:"li"}]

@middlewares([
  // 鉴权测试
  async function guard(ctx: Koa.Content, next: () => Promise<any>){
    if(ctx.header.token){
      await next()
    }else{
      // throw "请登录"
    }
  }
])
export default class User{

  @get("/users")
  public list(ctx:Koa.Content){
    // ctx.body = {ok: 1, data:users};
    ctx.body = model.findAll()
  }

  @post("/users", {
    middlewares:[
      async function validattion(ctx: Koa.Content, next: () => Promise<any>){
        const name = ctx.request.body.name
        if(!name){
          throw "请输入姓名"
        }else{
          await next()
        }
      }
    ]
  })
  public add(ctx:Koa.Content){
    users.push(ctx.request.body);

    ctx.body = {ok: 1};
  }
  
}