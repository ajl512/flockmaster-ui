
import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './routes'

Vue.use(VueRouter)
console.log(routes)
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition;
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 1 });
        }, 0);
    });
  }
})

router.beforeEach((to, from, next) => {
  document.body.classList.add('loading')
  document.title = to.meta.title ? to.meta.title : '\u200e'
  next()
})

router.afterEach(() => {
  document.body.classList.remove('loading')
})

export default router
