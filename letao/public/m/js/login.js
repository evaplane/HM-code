$(function () {
    login();
    register();
    //1.登录函数
    function login() {
        //1.1 给登录注册点击事件
        $('.btn-login').on('tap',function(){
            //1.2 判断有没有输入username,不输入就提示
            var username = $('.username').val();
            if(username==''){
                mui.toast('请输入用户名',{ duration:'1000', type:'div' });
                return;
            }

            //1.3 判断有没有输入password,不输入就提示
            var password = $('.password').val();
            if(password==''){
                mui.toast('请输入密码',{ duration:'1000', type:'div' });
                return;
            }

            //1.4 发送ajax请求
            $.ajax({
                url:"/user/login",
                type:"post",
                data:{
                    username:username,
                    password:password
                },

                success:function(data){
                    console.log(data);
                    //1.5 如果有error的话就把message当做消息框提示
                    if(data.error){
                        mui.toast(data.message,{ duration:'1000', type:'div' });
                    }else{
                        // 1.6 如果输入正确,就跳转到returnUrl
                        var returnUrl = getQueryString("returnUrl");
                        location=returnUrl;
                    }
                }
            })
        })

    }

    //2.获取url中的returnUrl函数
    function getQueryString(name) {
        // i是忽略大小写  '(^|&)' + name + '=([^&]*)(&|$)'的意思是寻找 & url参数名字=值 &这样的参数,&可以省略
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        //substr()提取从第一个到最后一个的字符串,就是去掉?,再和reg匹配,
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            //解码方式是decodeURL
            return decodeURI(r[2]);
        }
        return null;
    }

    //3.点击注册跳转到注册页面
    function register(){
        $('.btn-register').on('tap',function(){
            location="register.html";
        })
    }
})