$(function () {
    var layer = layui.layer
    var form = layui.form
    function xiaLa() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var a = template('tpl', res)
                layer.msg(res.message)
                $('[name=cate_id]').html(a)
                // 因为layui的机制，所以调用layui的render方法重新渲染下拉表单
                form.render()
            }
        })
    }
    initEditor()
    xiaLa()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 监听选择封面点击事件
    $('#chooseImg').on('click', function (e) {
        $('#file').click()
        $('#file').on('change', function (e) {
            var files = e.target.files[0]
            if (files.length === 0) {
                return layer.msg('请选择文件')
            }
            // 根据选择的文件，创建一个对应的 URL 地址：
            var newImgURL = URL.createObjectURL(files)
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域
        })
    })
    // 定义文章发布状态
    var q = '已发布'
    $('#o').on('click', function (e) {

        q = '草稿'
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var formdata = new FormData($(this)[0])
        console.log(formdata)
        formdata.append('state', q)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                formdata.append('cover_img', blob)
                publish(formdata)
            })




    })
    // 定义发布文章的方法
    function publish(a) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',

            data: a,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) { return layer.msg('发布文章失败') }
                layer.msg(res.message)
                location.href = '../art/art_list.html'
            }


        })
    }
})