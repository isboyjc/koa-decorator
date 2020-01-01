/*
 * @Author: isboyjc
 * @Date: 2020-01-01 10:10:21
 * @LastEditors  : isboyjc
 * @LastEditTime : 2020-01-01 16:38:27
 * @Description: file content
 */
import * as Koa from "koa";
import * as bodify from "koa-body";
import * as serve from "koa-static";
import {resolve} from "path";
import {load} from "./utils/route-decors";

import { Sequelize } from 'sequelize-typescript';

const database = new Sequelize({
  port: 3306,
  database: 'test',
  username: 'root',
  password: '12345678',
  dialect: 'mysql',
  modelPaths: [`${__dirname}/model`]
})
database.sync({force: true})

const app = new Koa

app.use(async (ctx : Koa.Content,next)=>{
  console.log("start", new Date());
  await next();
  console.log("end", new Date());
});

app.use(serve(`${__dirname}/public`));

app.use(bodify())

const router = load(resolve(__dirname, "./routes"))
app.use(router.routes())

app.listen(3000)