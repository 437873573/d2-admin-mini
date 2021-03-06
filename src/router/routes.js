import demo from './modules/demo'

import layout from '@/layout'

/**
 * 在主框架内显示
 */
const frameIn = [
    {
        path: '/',
        redirect: '/index',
        component: layout,
        children: [
            // 首页 必须 name:index
            {
                path: 'index',
                name: '首页',
                meta: { requiresAuth: true },
                component: () => import('@/views/index')
            },
            // 刷新页面 必须保留
            {
                path: 'refresh',
                name: 'refresh',
                hidden: true,
                component: {
                    beforeRouteEnter(to, from, next) {
                        next(vm => vm.$router.replace(from.fullPath))
                    },
                    render: h => h()
                }
            },
            // 页面重定向 必须保留
            {
                path: 'redirect/:route*',
                name: 'redirect',
                hidden: true,
                component: {
                    beforeRouteEnter(to, from, next) {
                        next(vm => vm.$router.replace(JSON.parse(from.params.route)))
                    },
                    render: h => h()
                }
            }
        ]
    },
    demo
]

/**
 * 在主框架之外显示
 */
const frameOut = [
    // 登录
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    }
]

/**
 * 错误页面
 */
const errorPage = [
    // 404
    {
        path: '*',
        name: '404',
        component: () => import('@/views/error')
    }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage]
