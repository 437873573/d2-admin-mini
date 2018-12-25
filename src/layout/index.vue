<template>
    <div :class="{grayMode: grayActive}" class="d2-layout">
        <!-- 半透明遮罩 -->
        <div class="d2-layout-mask"></div>
        <!-- 主体内容 -->
        <div class="d2-layout-content" flex="dir:top">
            <!-- 顶栏 -->
            <div class="d2-theme-header" flex flex-box="0">
                <!-- logo -->
                <div :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" class="logo-group" flex-box="0">
                    <div class="logo-content" flex="main:center cross:center" v-if="!asideCollapse">
                        <img alt="logo" class="logo" src="./image/logo.png">
                        <div class="content" flex="dir:top main:center">
                            <span>{{title}}</span>
                            <span>管理平台</span>
                        </div>
                    </div>
                    <img alt="logo" class="logo" src="./image/logo.png" v-else>
                </div>
                <!-- 菜单折叠 -->
                <div :class="{active:asideCollapse}" @click="handleToggleAside" class="toggle-aside-btn" flex-box="0">
                    <d2-svg name="bars"/>
                </div>
                <!-- 面包屑 -->
                <div class="breadcrumb" flex="cross:center" flex-box="1">
                    <header-breadcrumb/>
                </div>
                <!-- 顶栏右侧 -->
                <div class="d2-header-right" flex-box="0">
                    <header-fullscreen/>
                    <header-user/>
                </div>
            </div>
            <!-- 下面 主体 -->
            <div class="d2-theme-container" flex flex-box="1">
                <!-- 主体 侧边栏 -->
                <div :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" class="d2-theme-container-aside" flex-box="0" ref="aside">
                    <aside-menu/>
                </div>
                <!-- 主体 -->
                <div class="d2-theme-container-main" flex flex-box="1">
                    <!-- 内容 -->
                    <transition name="fade-scale">
                        <div class="d2-theme-container-main-layer" flex="dir:top">
                            <div class="d2-theme-container-main-body" flex-box="1">
                                <transition name="fade-transverse">
                                    <keep-alive>
                                        <router-view/>
                                    </keep-alive>
                                </transition>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import asideMenu from './components/aside-menu'
import headerBreadcrumb from './components/header-breadcrumb'
import headerFullscreen from './components/header-fullscreen'
import headerUser from './components/header-user'
export default {
    name: 'layout',
    components: { asideMenu, headerBreadcrumb, headerFullscreen, headerUser },
    data() {
        return {
            // 标题
            title: '饿了么',
            // [侧边栏宽度] 正常状态
            asideWidth: '200px',
            // [侧边栏宽度] 折叠状态
            asideWidthCollapse: '65px'
        }
    },
    computed: {
        ...mapState('d2admin', {
            grayActive: state => state.gray.active,
            asideCollapse: state => state.menu.asideCollapse
        })
    },
    methods: {
        ...mapMutations('d2admin/menu', [
            'asideCollapseToggle'
        ]),
        /**
         * 接收点击切换侧边栏的按钮
         */
        handleToggleAside() {
            this.asideCollapseToggle()
        }
    }
}
</script>

<style lang="scss">
// 注册主题
@import "~@/assets/style/theme/register.scss";
</style>
