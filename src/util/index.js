import cookies from './util.cookies'

const util = {
    cookies
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
    const processTitle = process.env.VUE_APP_TITLE
    window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : '后台管理系统'}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('id', 'd2admin-menu-link')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(document.getElementById('d2admin-menu-link'))
}

export default util
