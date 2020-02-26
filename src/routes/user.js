import Router from '@koa/router'
import { sign } from 'jsonwebtoken'
import config from '../config'

const router = new Router()

router.post('/login', (ctx) => {
  const token = sign({ username: 'cjfff', password: '1234', ...ctx.request.body }, config.secret)
  ctx.body = {
    token
  }
})


router.get('/userinfo', ctx => {
  ctx.body = ctx.state.user
})


export default router;