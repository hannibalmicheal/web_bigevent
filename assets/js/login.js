 $(function () {
    //点击注册账号的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();


    })

    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    var layer= layui.layer;
    // 自定义form.verify()函数自定义校验规格
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            console.alert(pwd)
            if (pwd !== value) {
                return '两次密码不一致'
            }
        } 
    })

    //监听注册表单的提交事件
    $('.form-reg').on('submit',function(e){
        e.preventDefault();
        var data = {username:$('#from-reg [name=username]').val(),password:$('#from-reg [name=password]').val()}
        $.post('http://ajax.frontend.itheima.net/api/reguser',data,function(res){
            if(res.status !== 0){
                return console.log(res.message)
            }
            layer.msg('注册成功，请登录')
              //模拟点击行为
            //$('#link-login').click(); 
        })
    })

    //监听登陆表单的提交事件
    $('#form-login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'http://ajax.frontend.itheima.net/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    layer.msg('登陆失败')
                }
                layer.msg('登录成功');
                //将得到的token字符串保存早localsorage中
                localStorage.setItem('token',res.token)
                location.href = '/index/html'
            }
        })
    })
  
}) 

