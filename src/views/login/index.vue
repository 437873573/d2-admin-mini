<template>
    <div class="login-page">
        <div class="layer bg" id="login"></div>
        <div class="layer flex-center">
            <!-- logo部分 -->
            <div class="logo-group">
                <img alt="logo" src="./image/logo.png">
            </div>
            <!-- 表单部分 -->
            <div class="form-group">
                <el-card>
                    <el-form :model="formLogin" :rules="rules" label-position="top" ref="loginForm" size="default">
                        <el-form-item prop="username">
                            <el-input clearable placeholder="用户名" type="text" v-model="formLogin.username">
                                <d2-svg name="user" slot="prepend"></d2-svg>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input clearable placeholder="密码" type="password" v-model="formLogin.password">
                                <d2-svg name="password" slot="prepend"></d2-svg>
                            </el-input>
                        </el-form-item>
                        <el-button @click="submit" class="button-login" size="default" type="primary">登录</el-button>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            // 表单
            formLogin: {
                username: '',
                password: ''
            },
            // 校验
            rules: {
                username: [
                    { required: true, whitespace: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, whitespace: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapActions('d2admin/account', ['login']),
        submit() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    // 登录
                    this.login({
                        vm: this,
                        username: this.formLogin.username,
                        password: this.formLogin.password
                    })
                        .then(() => {
                            // 重定向对象不存在则返回顶层路径
                            this.$router.replace(this.$route.query.redirect || '/')
                        })
                } else {
                    // 登录表单校验失败
                    this.$message.error('表单校验失败')
                }
            })
        }
    },
    created() {
        const _self = this
        let key
        document.onkeydown = function (e) {
            if (window.event == undefined) {
                key = e.keyCode
            } else {
                key = window.event.keyCode
            }
            if (key == 13) {
                _self.submit()
            }
        }
    }
}
</script>

<style lang="scss">
.login-page {
    background-color: #edf4fa;
    height: 100%;
    position: relative;
    // 层
    .layer {
        position: absolute;
        height: 100%;
        width: 100%;
        &.flex-center {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }
    // 背景
    .bg {
        canvas {
            display: block;
            margin: 0px;
            padding: 0px;
        }
    }
    // logo
    .logo-group {
        margin-top: -75px - 70px;
        position: relative;
        top: 75px;
        img {
            height: 140px;
        }
    }
    // 登录表单
    .form-group {
        width: 300px;
        // 重新设置卡片阴影
        .el-card {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
                0 2px 4px 0 rgba(232, 237, 250, 0.5);
            .el-card__body {
                padding-top: 70px;
            }
        }
        // 登录按钮
        .button-login {
            width: 100%;
        }
        // 输入框左边的图表区域缩窄
        .el-input-group__prepend {
            padding: 0px 14px;
        }
        .login-code {
            height: 40px - 2px;
            display: block;
            margin: 0px -20px;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
        }
    }
    // 帮助按钮
    .button-help {
        width: 300px;
        margin-top: 20px;
    }
    .user-btn {
        @extend %flex-center-col;
        @extend %unable-select;
        padding: 10px 0px;
        border-radius: 4px;
        &:hover {
            background-color: $color-bg;
            i {
                color: $color-text-normal;
            }
            span {
                color: $color-text-normal;
            }
        }
        i {
            font-size: 36px;
            color: $color-text-sub;
        }
        span {
            font-size: 12px;
            margin-top: 10px;
            color: $color-text-sub;
        }
    }
}
</style>
