$(function () {

    //声明全局变量search
    var search;

    searchProduct();
    button();
    sortProduct();
    pullRefrash();
    buy();

    //1.获取url传过来的数据
    // var search = location.search;
    // var str = search.substr(1);
    // console.log(str+"str");
    // console.log(search+"search");
    //2.正则表达式分割url,得到search的数据,封装函数


    function searchProduct() {
        //2.使用封装好的函数获取search传过来的内容
        search = getQueryString("search");
        // console.log(res);

        //3.给后台发送请求
        queryProduct({ proName: search, pageSize: 2 });

    }


    //5.点击搜索按钮,获取内容,发送请求
    function button() {
        $('.search').on('tap', function () {
            search = $('.searchInput').val().trim();
            queryProduct({ proName: search });
            //清空val
            $('.searchInput').val('');
        })
    }

    //1.封装正则匹配url参数,参数是url地址
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

    //4.封装ajax请求,参数是一个对象,proName,page和pageSize都是对象中的属性
    function queryProduct(obj) {
        obj.proName = obj.proName || '鞋';
        obj.page = obj.page || 1;
        obj.pageSize = obj.pageSize || 4;
        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: obj,

            // {
            //     proName: obj.proName || '鞋',
            //     //page和pageSize是必填项,否则服务器会挂
            //     page: obj.page || 1,
            //     pageSize: obj.pageSize || 2
            // },
            success: function (obj) {
                console.log(obj);
                var html = template('tpl', obj);
                $('.mui-card-content .mui-row').html(html);

                //每次下拉加载,上拉刷新,升序降序排列,搜索或者页面一开始加载的时候都需要重置上拉加载,并且把page初始化为1
                mui('#pullrefresh').pullRefresh().refresh(true);
                page=1;
            }
        })
    }

    //6.销量和价格的升序和降序
    function sortProduct() {
        //6.1 给a标签注册事件
        $('.mui-card-header a').on('tap', function () {

            //6.2 获取当前排序类型和顺序
            var type = $(this).data('type');
            var sort = $(this).data('sort');

            //6.3 判断顺序如果是1就改为2,如果是2就改为1
            if (sort == 1) {
                sort = 2;
                //6.6 改字体图标,i的class
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                sort = 1;
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            }

            //6.4 重新赋值给自定义属性
            $(this).data('sort', sort);

            //6.5 点击那个就加active类名,其他的删除active类名
            $(this).addClass('active').siblings('a').removeClass('active');

            //6.7 发送请求,search作为全局变量,一定要放在最上面

            //6.8 声明一个obj里面是data原来的参数,用obj[]动态添加type,obj[type]=sort,可以读取type的内容,然后传入整个对象给请求函数
            var obj = {
                proName: search,
                page: 1,
                pageSize: 4
            };
            obj[type] = sort;

            queryProduct(obj);

            //6.9 传入的参数是不确定的,num prices 只能有一个,在传参之前把对象的默认值设置好

        })
    }

    var page = 1;

    //7.页面的上拉刷新和下拉加载函数
    function pullRefrash() {
        //7.1 初始化
        mui.init({
            pullRefresh: {
                //下拉刷新的容器,区域滚动的容器
                container: '#pullrefresh',
                //初始化下拉刷新
                down: {
                    //下拉显示的内容
                    contentdown: "下拉可以刷新",
                    contentover: "可以松手哦",
                    contentrefresh: '拼命加载中',
                    //下拉刷新的回调函数
                    callback: pulldownRefresh,
                    //页面加载自动上拉刷新
                    auto:true
                },
                //初始化上拉加载
                up: {
                    // 上拉显示的内容
                    contentrefresh: '正在加载...',
                    //上拉加载的回调函数
                    callback: pullupRefresh
                }
            }
        });


        /**
         * 下拉刷新具体业务实现,只能执行一次
         */
        function pulldownRefresh() {
            setTimeout(function () {
                //发送ajax请求查询数据
                queryProduct({
                    proName: search,
                    page: 1,
                    pageSize: 2
                });
                //数据刷新完毕后结束下拉
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            }, 1500);
        }
        /**
         * 上拉加载具体业务实现
         */
        //声明全局遍历page=1;
        
        function pullupRefresh() {
            setTimeout(function () {
                page++;
                //发送请求
                $.ajax({
                    url: '/product/queryProduct',
                    type: 'get',
                    data: {
                        page: page,
                        pageSize: 2,
                        proName: search
                    },

                    // {
                    //     proName: obj.proName || '鞋',
                    //     //page和pageSize是必填项,否则服务器会挂
                    //     page: obj.page || 1,
                    //     pageSize: obj.pageSize || 2
                    // },
                    success: function (obj) {
                        //如果获取到的数据长度<=0,就显示没有数据了
                        if (obj.data.length <= 0) {
                            //结束上拉.count表示上拉加载,只能上拉两次就没有数据了,传入的数据为true就没有数据了
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
                        } else {
                            //不能覆盖,要追加
                            var html = template('tpl', obj);
                            $('.mui-card-content .mui-row').append(html);
                            //结束上拉.count表示上拉加载,只能上拉两次就没有数据了,传入的数据为true就没有数据了
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
                        }
                    }
                })


            }, 1500);
        }

    }

    //8.点击立即购买跳转到商品详情页面
    function buy(){
        //8.1 给立即购买注册点击事件,委托注册
        $('.mui-card-content .mui-row').on('tap','.btn-buy',function(){
            var id = $(this).data('id');
            //8.2 获取id跳转到productDetail.html
            location="productDetail.html?id="+id;
        })
    }

})




//url地址栏加密  decodeURI 解码  encodeURI 编码 只有中文需要解码,英文原样返回
//split()返回数组
//location.search属性可以拿到search参数传过来的值,但是是乱码的
//一般的网站不会只有一个参数的,为了防止请求重复,请求如果重复的话,获取到的是缓存
//多个参数用正则匹配url参数
//拿到响应体data,obj里面有一个数组叫data


/*做价格和销量的升序和降序
    1.给每一个a标签加一个自定义属性data-
    2.点击的时候获取当前属性,做对应的排序
    3.给每一个a标签同一个属性data-sort 默认值为1,升序
    4.判断排序的顺序,如果是1,就改成2,如果是2就改成1
    5.调用请求,传入排序类型和顺序,获取到数据渲染模板
*/