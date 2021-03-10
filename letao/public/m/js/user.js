$(function(){
    //1.获取用户名和手机号码赋值在页面上
    userMessage();
    logout();
    function userMessage(){
        $.ajax({
            url:"/user/queryUserMessage",
            success:function(data){
                console.log(data);

                $('.username').html(data.username);
                $('.teleNum').html(data.mobile);
            }
        })
    }

    //2.退出登录
    function logout(){
        $('.btn-login').on('tap',function(){
            $.ajax({
                url:"/user/logout",
                success:function(data){
                    if(data.success){
                        //跳转到登录页面
                        location="login.html?returnUrl=index.html";
                    }
                }
            })
        })
    }
})