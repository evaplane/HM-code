//zepto的入口函数
$(function () {


    //把所有函数封装到对象中
    var obj = {
        //初始化左侧滑动
        initLeftCategory: function () {
            //左侧区域滚动初始化
            mui('.left-category .mui-scroll-wrapper').scroll({
                indicators: false, //是否显示滚动条
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        //初始化右侧滑动
        initRightCategory: function () {
            //右侧区域滚动初始化
            mui('.right-category .mui-scroll-wrapper').scroll({
                indicators: true, //是否显示滚动条
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },

        //查询左侧列表
        queryTopCategory: function () {
            $.ajax({
                url: "/category/queryTopCategory",
                type: 'get',
                success: function (data) {
                    var html = template('tpl', data);
                    $('.mui-table-view').html(html);

                    //如果不用事件委托,必须等左侧的列表渲染出来才能获取到li标签,所以根据左侧id切换右侧数据要在leftCategory的success函数里面写
                    // obj.toggleQueryCategory();
                    // $('.mui-table-view li').eq(0).addClass('active').siblings('li').removeCLass('active');
                }
            })
        },

        //根据左侧id切换右侧数据
        toggleQueryCategory: function () {
            obj.querySecondCategory(1);
            //点击li标签,委托事件
            $('.left-category ul').on('tap', 'li', function () {
            //  $('.left-category ul li').on('tap', function () {
                //获取id
                var dataId = $(this).data('id');
                obj.querySecondCategory(dataId);
                $(this).addClass('active').siblings('li').removeClass('active');
            })
        },


        //查询右侧列表
        querySecondCategory: function (id) {
            $.ajax({
                url: "/category/querySecondCategory",
                type: 'get',
                data: {
                    id: id
                },
                beforeSend:function(){
                    $('.mask').show();
                },
                complete:function(){
                    $('.mask').hide();
                },
                success: function (data) {
                    if (data.rows.length == 0) {
                        $('.right-category .mui-row').html("对不起,此页无数据");
                    } else {
                        var html = template('rightTpl', data);
                        $('.right-category .mui-row').html(html);

                    }
                }
            })
        }


    };
    obj.initLeftCategory();
    obj.initRightCategory();
    obj.queryTopCategory();
    obj.toggleQueryCategory();


















    //在移动端不使用click事件,会有300ms的延迟,在zepto中使用tap事件,是zepto封装的解决延迟的事件
    //如果添加自定义属性,别忘了前面加data-,这样好一点
    //jQuery或者zepto获取自定义属性可以用data('属性名'),原生js用dataset['属性名']或者attr('data-属性名')
    //原生方式获取的都是字符串,zepto方式封装的函数data()获取的数据并做类型转换


})