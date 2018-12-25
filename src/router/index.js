import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import util from '@/util'

// 路由数据
import routes from './routes'
NProgress.configure({ showSpinner: false }) // 关闭环形进度条

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({ routes })

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
    // 进度条
    NProgress.start()
    // 验证当前路由所有的匹配中是否需要有登录验证的
    if (to.matched.some(r => r.meta.requiresAuth)) {
        // 这里暂时将cookie里是否存有token作为验证是否登录的条件
        // 请根据自身业务需要修改
        const token = util.cookies.get('token')
        if (token && token !== 'undefined') {
            next()
        } else {
            // 将当前预计打开的页面完整地址临时存储 登录后继续跳转
            // 这个 cookie(redirect) 会在登录后自动删除
            util.cookies.set('redirect', to.fullPath)
            // 没有登录的时候跳转到登录界面
            next({
                name: 'login'
            })
            NProgress.done() // next(...)重定向不会触发router.afterEach钩子，需要手动hack一下
        }
    } else {
        // 不需要身份校验 直接通过
        next()
    }
})

router.afterEach(to => {
    // 进度条
    NProgress.done()
    // 更改标题
    util.title(to.meta.title)
})

export default router