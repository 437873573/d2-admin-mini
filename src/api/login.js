import fetch from '@/plugin/axios'

// 登录
export const AccountLogin = data => fetch('/login', data, 'post')
