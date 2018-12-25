<template>
    <div class="d2-layout-aside-menu">
        <el-menu :collapse="asideCollapse" :default-active="active" :unique-opened="true" @select="handleMenuSelect" ref="menu">
            <template v-for="(menu, menuIndex) in aside">
                <menu-item :key="menuIndex" :menu="menu" v-if="menu.children === undefined"/>
                <menu-sub :key="menuIndex" :menu="menu" v-else/>
            </template>
        </el-menu>
        <div class="d2-layout-aside-menu-empty" flex="dir:top main:center cross:center" v-if="aside.length === 0 && !asideCollapse">
            <d2-svg name="inbox"/>
            <span>没有侧栏菜单</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import menuMixin from './mixin/menu'
import MenuItem from './components/menu-item'
import MenuSub from './components/menu-sub'
import BScroll from 'better-scroll'
export default {
    name: 'd2-layout-aside-menu',
    mixins: [menuMixin],
    components: {
        'menu-item': MenuItem,
        'menu-sub': MenuSub
    },
    data() {
        return {
            active: '',
            BS: null
        }
    },
    computed: {
        ...mapState('d2admin/menu', [
            'aside',
            'asideCollapse'
        ])
    },
    watch: {
        // 折叠和展开菜单的时候销毁 better scroll
        asideCollapse(val) {
            this.scrollDestroy()
            setTimeout(() => {
                this.scrollInit()
            }, 500)
        },
        // 监听路由 控制侧边栏激活状态
        '$route.matched': {
            handler(val) {
                this.active = val[val.length - 1].path
                this.$nextTick(() => {
                    if (this.aside.length > 0 && this.$refs.menu) {
                        this.$refs.menu.activeIndex = this.active
                    }
                })
            },
            immediate: true
        }
    },
    mounted() {
        this.scrollInit()
    },
    beforeDestroy() {
        this.scrollDestroy()
    },
    methods: {
        scrollInit() {
            this.BS = new BScroll(this.$el, {
                mouseWheel: true
                // 如果你愿意可以打开显示滚动条
                // scrollbar: {
                //   fade: true,
                //   interactive: false
                // }
            })
        },
        scrollDestroy() {
            // https://github.com/d2-projects/d2-admin/issues/75
            try {
                this.BS.destroy()
            } catch (e) {
                delete this.BS
                this.BS = null
            }
        }
    }
}
</script>
