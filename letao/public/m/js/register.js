$(function () {
    register();
    getCode();

    //2.获取验证码
    var vCode = '';
    function getCode() {
        $('.btn-code').on('tap', function () {
            $.ajax({
                url: "/user/vCode",
                success: function (data) {
                    console.log(data.vCode);
                    vCode = data.vCode;
                }
            })
        })
    }


    //1.注册函数
    function register() {
        //给注册按钮设置点击事件
        $('.btn-register').on('tap', function () {
            //1.验证输入的表单是否为空
            var check = true;
            $('.mui-input-group input').each((index, ele) => {
                if (!ele.value) {
                    check = false;
                    return false;
                }
            })

            //2.如果check为true代表都不为空
            if (check) {
                //2.1 获取到他们的值
                var phone = $('.phone').val().trim();
                var username = $('.username').val().trim();
                var password = $('.password').val().trim();
                var confirmPassword = $('.confirmPassword').val().trim();
                var vcode = $('.vcode').val().trim();

                //2.2 判断手机号码的值
                if (!isPoneAvailable(phone)) {
                    mui.toast('手机号码格式不正确', { duration: '1000', type: 'div' });
                    return;
                }

                //2.3 判断用户名的值不能大于6位
                if (username.length > 6) {
                    mui.toast('用户名不能大于6位', { duration: '1000', type: 'div' });
                    return;
                }

                //2.4 判断密码和确认密码一致
                if (password != confirmPassword) {
                    mui.toast('两次密码需要一致', { duration: '1000', type: 'div' });
                    return;
                }

                //2.5 判断验证码是否和获取到的一致
                if(vCode != vcode){
                    mui.toast('验证码不正确', { duration: '1000', type: 'div' });
                    return;
                }

                //2.6 把ajax请求注册
                $.ajax({
                    url:"/user/register",
                    type:"post",
                    data:{
                        username:username,
                        password:password,
                        mobile:phone,
                        vCode:vCode
                    },
                    success:function(data){
                        if(data.success){
                            location='login.html?returnUrl=index.html';
                        }else{
                            mui.toast('注册失败,请重新注册', { duration: '1000', type: 'div' });
                        }
                    }
                })
            }




        })
    }




    //3.判断手机号码是否合法的正则
    function isPoneAvailable($poneInput) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test($poneInput)) {
            return false;
        } else {
            return true;
        }
    }
})