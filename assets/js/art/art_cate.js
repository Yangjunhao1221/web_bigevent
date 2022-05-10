$(function () {
    var layer = layui.layer
    var form = layui.form
    function getCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {

                if (res.status !== 0) return layer.msg(res.message)
                var temStr = template('moban', res)
                $('tbody').html(temStr)
            }
        })
    }
    // 定义弹出层索引
    var a = null
    getCates()
    $('#add').on('click', function (res) {
        a = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#tancc').html(),
            area: ['500px', '300px'],
            resize: false,
            fixed: false
        })
    })
    // 因为弹出层是动态添加，所以使用事件委托
    $('body').on('submit', '#tanForm', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                getCates()
                layer.close(a)
                layer.msg(res.message)
            }
        })
    })
    $('body').on('click', '#close', function (e) {
        e.preventDefault()
        layer.close(a)
    })
    var b = null
    $('body').on('click', '.revise', function (e) {
        e.preventDefault()
        var Id = $(this).attr('data-id')
        b = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#tancc2').html(),
            area: ['500px', '300px'],
            resize: false,
            fixed: false
        })
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                form.val('tanForm2', res.data)
            }
        })

    })
    $('body').on('submit', '#tanForm2', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.close(b)
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                layer.close(b)
                getCates()
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function (e) {
        // e.preventDefault()
        var Id = $(this).attr('data-id')
        // 询问框，确认后执行回调函数
        layer.confirm('确认删除', { icon: 3, title: '提示', resize: false }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    getCates()
                }
            })
            layer.close(index)
        })
    })
})