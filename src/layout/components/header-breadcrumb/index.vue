<template>
    <el-breadcrumb>
        <transition-group name="breadcrumb">
            <el-breadcrumb-item :key="item.path" v-for="item in levelList">
                <span v-if="!item.hidden">{{ item.name }}</span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>

export default {
    data() {
        return {
            levelList: null
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            this.levelList = this.$route.matched.filter(item => {
                if (item.name) {
                    return true
                }
            })
        }
    }
}
</script>
