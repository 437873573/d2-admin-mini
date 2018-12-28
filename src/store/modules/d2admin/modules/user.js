import util from '@/util'
export default {
    namespaced: true,
    state: {
        // 用户信息
        info: {}
    },
    mutations: {
        /**
         * @description 设置用户数据
         * @param {Object} state vuex state
         * @param {*} info info
         */
        set(info) {
            util.cookies.set('username', info)
        },
        /**
         * @description 从cookies获取用户名
         * @param {Object} state vuex state
         */
        load(state) {
            state.info = JSON.parse(util.cookies.get('username'))
        }
    }
}
