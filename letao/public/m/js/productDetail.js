$(function () {
    var id = getQueryString('id');
    console.log(id);
    scroll();
    queryProductDetail();
    addCart();
    //1.初始化区域滚动
    function scroll() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }

    //2. 获取url中的id
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

    //3.发送请求,获取响应体渲染到页面上
    function queryProductDetail() {
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id
            },
            success: function (data) {
                console.log(data);


                //3.1 获取data.size改为数组
                var maxSize = +data.size.split('-')[1];
                var minSize = +data.size.split('-')[0];
                data.size = [];
                for (var i = minSize; i <= maxSize; i++) {
                    data.size.push(i);
                }
                console.log(data.size);



                var html = template('detailTpl', data);
                $('.mui-scroll').html(html);
                //3.2 点击每一个size都会添加mui-btn-warning类
                $('.size-btn').on('tap', function () {
                    $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
                })

                //3.3 初始化轮播图
                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
                });

                //3.4 初始化数字输入框
                mui(".mui-numbox").numbox();

            }
        })
    }

    //4.点击加入购物车的时候跳转到购物车页面或者登陆页面
    function addCart(){
        //4.1 点击加入购物车
        $('.btn-cart').on('tap',function(){
            //4.2 获取num
            var num = mui(".mui-numbox").numbox().getValue();
            //4.3 获取size
            var size = $('.mui-btn-warning').data('size');
            //4.4 判断如果没有选择尺码要提示,不执行下面的代码
            if(!size){
                mui.toast('请选择尺码',{ duration:'1000', type:'div' });
                return;
            }

            //4.5 发送ajax请求
            $.ajax({
                url:'/cart/addCart',
                data:{
                    productId:id,
                    num:num,
                    size:size
                },
                type:'post',
                success:function(data){
                    console.log(data);
                    //4.6 如果没有登录,就会出现error
                    if(data.error){
                        //4.7 跳转到登录页面,把本页的地址带过去
                        location="login.html?returnUrl="+location.href;
                    }else{
                        //4.8 如果登录成功提示是否需要去购物车看看
                        var btnArray = ['去看看', '残忍拒绝'];
                        mui.confirm('要不要去购物车看看', '温馨提示', btnArray, function(e) {
                            if (e.index == 0) {
                                location='cart.html';
                            } else {
                                //提示请继续添加
                                mui.toast('请继续添加',{ duration:'1000', type:'div' }) ;
                            }
                        })
                    }
                }
            })

        })
    }

})