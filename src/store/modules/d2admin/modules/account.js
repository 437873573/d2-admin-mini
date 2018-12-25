import util from '@/util'
import { AccountLogin } from '@/api/login'

export default {
    namespaced: true,
    actions: {
        /**
         * @description 登录
         * @param {Object} param context
         * @param {Object} param vm {Object} vue 实例
         * @param {Object} param username {String} 用户账号
         * @param {Object} param password {String} 密码
         * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
         */
        login({ commit }, { vm, username, password }) {
            return new Promise((resolve, reject) => {
                // 开始请求登录接口
                AccountLogin({ username, password })
                    .then(res => {
                        // token 代表用户当前登录状态 建议在网络请求中携带 token
                        // 如有必要 token 需要定时更新，默认保存一天
                        util.cookies.set('token', res.token)
                        // 设置 vuex 用户信息
                        commit('d2admin/user/set', { name: res.name }, { root: true })
                        // 结束
                        resolve()
                    })
                    .catch(err => {
                        console.log('err: ', err)
                        reject(err)
                    })
            })
        },
        /**
         * @description 注销用户并返回登录页面
         * @param {Object} param context
         * @param {Object} param vm {Object} vue 实例
         * @param {Object} param confirm {Boolean} 是否需要确认
         */
        logout({ commit }, { vm, confirm = false }) {
            /**
             * @description 注销
             */
            function logout() {
                // 删除cookie
                util.cookies.remove('token')
                // 跳转路由
                vm.$router.push({
                    name: 'login'
                })
            }
            // 判断是否需要确认
            if (confirm) {
                commit('d2admin/gray/set', true, { root: true })
                vm.$confirm('退出当前账户吗?', '确认操作', {
                    confirmButtonText: '确定退出',
                    cancelButtonText: '放弃',
                    type: 'warning'
                })
                    .then(() => {
                        commit('d2admin/gray/set', false, { root: true })
                        logout()
                    })
                    .catch(() => {
                        commit('d2admin/gray/set', false, { root: true })
                        vm.$message('放弃退出用户')
                    })
            } else {
                logout()
            }
        }
    }
}
