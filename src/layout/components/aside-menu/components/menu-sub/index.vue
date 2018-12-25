<template>
    <el-submenu :index="menu.path || uniqueId">
        <template slot="title">
            <d2-svg :name="menu.icon?menu.icon:'example'"/>
            <span slot="title">{{menu.title}}</span>
        </template>
        <template v-for="(child, childIndex) in menu.children">
            <menu-item :key="childIndex" :menu="child" v-if="child.children === undefined"/>
            <menu-sub :key="childIndex" :menu="child" v-else/>
        </template>
    </el-submenu>
</template>

<script>
import { uniqueId } from 'lodash'
// 组件
import MenuItem from '../menu-item'

export default {
    name: 'd2-layout-aside-menu-sub',
    components: { 'menu-item': MenuItem },
    props: {
        menu: {
            type: Object,
            required: false,
            default: () => { }
        }
    },
    data() {
        return {
            uniqueId: uniqueId('d2-menu-empty-')
        }
    }
}
</script>
