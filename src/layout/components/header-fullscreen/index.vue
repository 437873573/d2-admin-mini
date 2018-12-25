<template>
    <el-tooltip :content="active ? '退出全屏' : '全屏'" effect="dark" placement="bottom">
        <el-button @click="toggle" class="d2-mr btn-text can-hover" type="text">
            <d2-svg name="compress" v-if="active"/>
            <d2-svg name="arrows-alt" v-else/>
        </el-button>
    </el-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState('d2admin/fullscreen', ['active'])
    },
    methods: {
        ...mapActions('d2admin/fullscreen', ['toggle'])
    }
}
</script>
