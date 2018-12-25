import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

// 创建一个 axios 实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_API,
    timeout: 5000 // 请求超时时间
})

export default async (url = '', data = {}, type = 'GET') => {
    type = type.toUpperCase()
    let response

    if (type == 'GET') {
        try {
            response = await service.get(url, { params: data })
        } catch (error) {
            throw new Error(error)
        }
    } else {
        try {
            response = await service.post(url, qs.stringify(data))
        } catch (error) {
            Message({
                message: '网络异常',
                type: 'error',
                duration: 5 * 1000
            })
            throw new Error(error)
        }
    }
    return new Promise((resolve, reject) => {
        if (response.data.result == 1) {
            if (response.data.msg) {
                Message({
                    message: response.data.msg,
                    type: 'success',
                    duration: 5 * 1000
                })
            }
            resolve(response.data.data)
        } else if (response.data.result == 0) {
            Message({
                message: response.data.msg,
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            // 去登录页面
            if (response.data.code == 403) {
                router.push({ name: 'login' })
                return
            }
            if (response.data.msg) {
                Message({
                    message: response.data.msg,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            if (response.data.data) {
                reject(response.data.data)
            }
            reject(response.data.msg)
        }
    })
}
