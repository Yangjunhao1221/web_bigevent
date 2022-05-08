$(function () {
    var layer = layui.layer
    getuserDate()
    $('#userbye').on('click', function () {
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            // 清空token
            localStorage.removeItem('token')

            location.href = './login.html'
            // layui关闭询问框
            layer.close(index)
        })
    })
})
function getuserDate() {
    console.log(1);
    $.ajax({

        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res)
            if (res.status !== 0) return layer.msg('获取用户数据失败')
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem('token'),
        //             location.href = '/login.html'
        //     }
        // }
    })
}
function renderAvatar(userAvatarData) {
    var name = userAvatarData.nickname || userAvatarData.username
    $('.welcome').html('欢迎您:&nbsp&nbsp' + name)
    if (userAvatarData.user_pic !== null) {
        $('.layui-nav-img').attr('src', userAvatarData.user_pic).show()
        $('.usertest').hide()
    } else {
        $('.usertest').text(name[0].toUpperCase()).show()
        $('.layui-nav-img').hide()
    }
}



