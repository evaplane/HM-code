$(function () {
    // sectionScroll();
    pullRefresh();
    deleteCart();
    editCart();
    //1.区域滚动
    function sectionScroll() {
        //1.1 发送请求
        $.ajax({
            url: "/cart/queryCart",
            success: function (obj) {
                //1.2 模板引擎渲染到页面上
                console.log(obj);
                var html = template('cartTpl', { data: obj });
                $('.mui-table-view').html(html);

                //1.3 初始化区域滚动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
            }
        })
    }

    // queryCartPaging();
    //2. 下拉加载和上拉刷新
    //2.1 发送ajax请求给分页接口

    function queryCartPaging() {
        $.ajax({
            url: '/cart/queryCartPaging',
            data: {
                page: 1,
                pageSize: 4
            },
            success: function (data) {
                console.log(data);
                //如果没有登录,是跳转不到购物车页面的,所以要在发送请求的时候判断,没有登录就是error,跳转到登录页面,把当前页面的url通过returnUrl传过去
                if (data.error) {
                    location = 'login.html?returnUrl=' + location.href;
                } else {
                    var html = template('cartTpl', data);
                    $('#main .mui-table-view').html(html);
                    //重置下拉加载
                    mui('#pullrefresh').pullRefresh().refresh(true);
                    page = 1;

                    //渲染页面之后计算总额
                    count();
                    //6.如果点击每一个input,也会改变值,给checkbox设置点击事件都要用change方法
                    $('.mui-table-view ').on('change', 'input', function () {
                        count();
                    })
                }


            }
        })
    }

    var page = 1;

    //2.2 上拉刷新和下拉加载初始化代码
    function pullRefresh() {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    callback: pulldownRefresh,
                    // 页面一加载就自动刷新
                    auto: true
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pulldownRefresh() {
            setTimeout(function () {

                queryCartPaging();
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            }, 1500);
        };
        /**
         * 上拉加载具体业务实现
         */
        function pullupRefresh() {
            setTimeout(function () {
                page++;
                $.ajax({
                    url: '/cart/queryCartPaging',
                    data: {
                        page: page,
                        pageSize: 4
                    },
                    success: function (data) {
                        //有数据的时候data是对象.没有数据的时候data是数组
                        if (data.data) {
                            var html = template('cartTpl', data);
                            $('.mui-table-view').append(html);
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
                        } else {
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。

                        }
                    }
                })

            }, 1500);
        }
    }

    //3. 点击删除函数
    function deleteCart() {
        //3.1 删除按钮点击事件,委托注册
        $('.mui-table-view').on('tap', '.btn-delete', function () {
            //获取Li标签
            var li = $(this).parent().parent();
            console.log(li);
            //获取id
            var id = $(this).data('id');
            //3.2 弹出提示框
            var btnArray = ['确认', '取消'];
            mui.confirm('要删除这个商品吗', '温馨提示', btnArray, function (e) {
                if (e.index == 0) {
                    //点击确认
                    //发送请求
                    $.ajax({
                        url: "/cart/deleteCart",
                        data: {
                            id: id
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                //点击确认,删除这个li标签
                                li.remove();
                                //刷新页面
                                queryCartPaging();
                            }
                        }
                    })


                } else {
                    //点击取消,返回到最新内容,mui.swiperoutClose
                    mui.swipeoutClose(li[0]);
                }
            });
        })

    }


    //4.点击编辑函数
    function editCart() {
        $('.mui-table-view').on('tap', '.btn-edit', function () {
            //4.1 获取模板上的value
            var data = $(this).data('value');
            //获取li
            var li = $(this).parent().parent();

            //把value的值当做结果给模板
            //4.2 获取productSize
            var minSize = +data.productSize.split('-')[0];
            var maxSize = +data.productSize.split('-')[1];
            data.productSize = [];
            for (var i = minSize; i <= maxSize; i++) {
                data.productSize.push(i);
            }
            //4.1 点击的时候显示商品标题和数量的确认框
            //4.2 生成一个模板引擎
            var html = template('editCartTpl', data);
            html = html.replace(/[\r\n]/g, '');

            //4.3 显示确认框
            var btnArray = ['确定', '取消'];
            mui.confirm(html, '编辑商品标题', btnArray, function (e) {
                if (e.index == 0) {
                    //4.3.1 点击确认的时候,获取id,size和num然后发送请求
                    var size = $('.mui-btn-warning').data('size');

                    var num = mui(".mui-numbox").numbox().getValue();
                    $.ajax({
                        url: "/cart/updateCart",
                        type: "post",
                        data: {
                            id: data.id,
                            size: size,
                            num: num
                        },
                        success: function (data) {
                            if (data.success) {
                                //success页面
                                queryCartPaging();
                            }
                        }

                    })

                } else {
                    mui.swipeoutClose(li[0]);
                }
            })


            //4.3 初始化数字框,一定要在显示确定窗口后执行
            mui(".mui-numbox").numbox();
            //点击哪一个button,哪个button就变成黄色
            $('.size button').on('tap', function () {
                $(this).addClass('mui-btn-warning').siblings('button').removeClass('mui-btn-warning');
            })
        })



    }

    //5.计算总额 ,默认所有的都被选中
    function count() {
        //5.1 获取所有被选中的input
        var checkList = $('.left input:checked');
        //5.2 遍历
        var sum = 0;
        for (var i = 0; i < checkList.length; i++) {
            //5.3 获取每一个input的data num和price
            var num = $(checkList[i]).data('num');
            var price = $(checkList[i]).data('price');
            var count = num * price;
            sum += count;
        }

        //5.4 取余2位小数
        sum = sum.toFixed(2);
        //5.5 把计算好的sum赋值给span
        $('#order span').html(sum);

    }

})