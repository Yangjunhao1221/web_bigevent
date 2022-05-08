$(function () {
    var layer = layui.layer
    layui.form.verify({
        pw: [/^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'],
        rep: function (val) {
            if (val !== $('.layui-form [name=newPwd]').val()) return ('两次输入密码不一致')
        },
        old: function (val) {
            if (val === $('[name=oldPwd]').val()) return ('不能与原密码相同')
        }

    })
    $('.layui-form').on('submit', function (e) {
        console.log($(this).serialize());
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('更新密码失败')
                layui.layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
    $('#btnReset').on('click', function () {
        $('.layui-form')[0].reset()
    })
})