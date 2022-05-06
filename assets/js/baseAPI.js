$(function () {
    // ajax进行请求前都会调用的函数，options为拿到的对象
    jQuery.ajaxPrefilter(function (options) {

        options.url = 'http://www.liulongbin.top:3007' + options.url
    })
})