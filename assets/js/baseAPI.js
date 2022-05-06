$(function () {
    // ajax进行请求前都会调用的函数，options为拿到的对象
    jQuery.ajaxPrefilter(function (options) {

        options.url = 'http://www.liulongbin.top:3007' + options.url
        // 判断是否需要请求头
        if (options.url.indexOf('/my/') !== -1) {

            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 统一添加成功失败回调
        options.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
})