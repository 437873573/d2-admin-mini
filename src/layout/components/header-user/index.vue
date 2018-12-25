<template>
    <el-dropdown class="d2-mr" size="small">
        <span class="btn-text">你好 {{info.name}}</span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logOff">
                <span flex="main:right cross:center">
                    <d2-svg class="d2-mr-5" name="power off"/>退出
                </span>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState('d2admin/user', ['info'])
    },
    methods: {
        ...mapActions('d2admin/account', ['logout']),
        /**
         * @description 登出
         */
        logOff() {
            this.logout({
                vm: this,
                confirm: true
            })
        }
    }
}
</script>
