// 入口函数
$(function () {
    $('#reg').on('click', function () {
        $('.login').hide()
        $('.reg_box').show()
    })
    $('#login').on('click', function () {
        $('.reg_box').hide()
        $('.login').show()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pw: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        repw: function (value) {
            var repw = $('.reg_box [name=password]').val()
            if (value !== repw) {
                return '两次密码不一致'
            }
        }

    })
    // 注册事件
    $('#form_reg').on('submit', function (e) {

        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg(res.message + '请登录')
            $('#login').click()
        })
    })
    // 登录事件
    $('#form_login').on('submit', function (e) {
        var data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                setTimeout(function () {
                    location.href = './index.html'
                }, 1000)
            }
        })
    }
    )

})
