$(function(){
    login();
    //员工登录函数
    function login(){
        //1.点击登录按钮,注册事件
        $('.btn-login').on('click',function(){
            //2.获取username和password
            var password = $('.password').val();
            var username = $('.username').val();
            //3.判断不能为空
            if(!username){
                alert('请输入用户名');
                return;
            }
            if(!password){
                alert('请输入密码');
                return;
            }

            //4.发送请求
            $.ajax({
                url:"/employee/employeeLogin",
                type:"post",
                data:{username,
                        password},
                success:function(data){
                    if(data.success){
                        //跳转到首页
                        location='index.html';
                    }
                }
            })
        })
    }
})