// polyfill
import 'babel-polyfill'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'

// 核心插件
import d2Admin from '@/plugin/d2admin'

// 菜单和路由设置
import router from './router'
import menuAside from '@/menu/aside'

// 核心插件
Vue.use(d2Admin)

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        // 设置侧边栏菜单
        this.$store.commit('d2admin/menu/asideSet', menuAside)
    },
    mounted() {
        // 用户登录后从cookies加载用户名
        this.$store.commit('d2admin/user/load')
        // 初始化全屏监听
        this.$store.dispatch('d2admin/fullscreen/listen')
    }
}).$mount('#app')
