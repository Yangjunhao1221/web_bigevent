$(function () {
    // 定义时间过滤器
    template.defaults.imports.Formate = function (res) {
        var data = new Date(res)
        var y = Zero(data.getFullYear())
        var m = Zero(data.getMonth() + 1)
        var d = Zero(data.getDate())

        var h = Zero(data.getHours())
        var n = Zero(data.getMinutes())
        var s = Zero(data.getSeconds())
        return y + '-' + m + '-' + d + ' ' + h + ':' + n + ':' + s
    }
    // 补零
    function Zero(a) {
        return a > 9 ? a : '0' + a
    }
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    var can = {
        pagenum: 1,//	页码值
        pagesize: 2,//	每页显示多少条数据
        cate_id: '',//	文章分类的 Id
        state: ''//	文章的状态，可选值有：已发布、草稿
    }
    random()

    xzxl()
    function random() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: can,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                var mban = template('mban', res)
                $('tbody').html(mban)
                renderPage(res.total)
            }

        })
    }
    // 渲染下拉列表
    function xzxl() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template('mban2', res)
                $('[name=cate_id]').html(str)
                // 重新渲染layui表单
                form.render()
            }
        })

    }
    $('#formdd').on('submit', function (e) {
        e.preventDefault()
        var a = $('[name=cate_id]').val()
        var b = $('[name=state]').val()
        can.cate_id = a
        can.state = b
        random()
    })
    // 渲染分页
    function renderPage(a) {
        // 执行 laypage.render时会自动执行jump函数
        laypage.render({
            elem: 'Page',//注意，这里的 test1 是 ID，不用加 # 号,
            count: a,//数据总数，从服务端得到
            limit: can.pagesize,
            curr: can.pagenum,
            limits: [2, 5, 8, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                can.pagenum = obj.curr
                can.pagesize = obj.limit
                // //首次不执行
                // if (!first) {
                //     //do something
                // }
                if (!first) {
                    random()
                }
            }
        })

    }
    $('tbody').on('click', '.btn-delete', function () {
        // 获取删除键个数
        var btns = $('.btn-delete').length

        var id = $(this).attr('data-id')
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/article/delete/:id',
        //     success: function (res) {

        //     }
        // })
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg('删除失败')
                    layer.msg('删除成功')

                    if (btns === 1) {
                        // 页码值最小为一
                        can.pagenum = can.pagenum === 1 ? can.pagenum : can.pagenum - 1
                    }
                    random()
                }
            })

            layer.close(index)
        })
    })
    $('tbody').on('click', '.btn-bj', function () {
        var id = $(this).attr('data-id')
        localStorage.setItem('id', id)
        location.href = './art_revise.html'
    })

})