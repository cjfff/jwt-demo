import 'dotenv/config'
import Koa from 'koa'
import serve from 'koa-static'
import UserRoute from './routes/user';
import koaBodyparser from 'koa-bodyparser'
import Router from '@koa/router'
import jwt from 'koa-jwt'
import config from './config'


const app = new Koa();

app.use(serve('static'))
app.use(koaBodyparser())

app.use(jwt({ secret: config.secret }).unless({ path: [/user\/login/] }));

// 装载所有子路由
const router = new Router()

router.use('/api/v1/user', UserRoute.routes(), UserRoute.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(config.port, () => {
  console.log('app listener at', config.port)
})