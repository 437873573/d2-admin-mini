<template>
    <el-menu-item :index="menu.path || uniqueId">
        <d2-svg :name="menu.icon" v-if="menu.icon"/>
        <span slot="title">{{menu.title || '未命名菜单'}}</span>
    </el-menu-item>
</template>

<script>
import { uniqueId } from 'lodash'
export default {
    name: 'd2-layout-aside-menu-item',
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
