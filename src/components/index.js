import Vue from 'vue'

import d2Container from './d2-container'
import d2Svg from './d2-svg'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-svg', d2Svg)
