$(function () {
    function a() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取用户数据失败')
                randerUserdata(res)

            }
        })
    }
    a()
    var layer = layui.layer
    var form = layui.form
    form.verify({
        nickname: function (val) {
            if (val.length > 6) return '用户名为1-6个字符'
        },
    })

    function randerUserdata(r) {
        form.val('form_userinfo', r.data)
    }
    // 重置
    $('#btnReset').click(function (e) {
        e.preventDefault()
        a()
    })
    // 提交修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('更新用户信息失败')
                layer.msg(res.message)
                window.parent.getuserDate()
            }
        })
    })

})