/*
 * @Author: isboyjc
 * @Date: 2020-01-01 18:09:11
 * @LastEditors  : isboyjc
 * @LastEditTime : 2020-01-01 23:48:14
 * @Description: detail 详情类
 */
import * as Koa from "koa";
import {get,post,middlewares,check} from "./../utils/route-decors";

const delay = (data:any, tick:number) => new Promise(resolve => {
  setTimeout(()=>{
    resolve(data)
  },tick)
})

export default class Goods{

  @get("/goods")
  @check((ctx:Koa.Content) => {
    if(!ctx.query.id){
      ctx.body = {ok:0,msg:"查询失败，无商品id"}
      return false
    }
  })
  public search(ctx:Koa.Content){
    ctx.body = {ok:1,data:[{id:1, goods:"aaa"}]}
  }

  
  @post("/goods")
  @check(async (ctx:Koa.Content) => {
    if(!ctx.request.body.goods){
      ctx.body = await delay({ok:0,msg:"添加失败，无商品名称"}, 1000);
      return false
    }
  })
  public add(ctx:Koa.Content){
    ctx.body = {ok: 1, msg:"商品添加成功"};
  }
}