import layout from '@/layout'

const meta = { requiresAuth: true }

export default {
    path: '/demo',
    name: 'demo',
    meta,
    redirect: { name: 'demo-page1' },
    component: layout,
    children: (pre => [
        { path: 'page1', name: `${pre}page1`, component: () => import('@/views/demo/page1'), meta: { meta, title: '页面 1' } },
        { path: 'page2', name: `${pre}page2`, component: () => import('@/views/demo/page2'), meta: { meta, title: '页面 2' } },
        { path: 'page3', name: `${pre}page3`, component: () => import('@/views/demo/page3'), meta: { meta, title: '页面 3' } }
    ])('demo-')
}
