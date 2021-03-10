//1.获取数据
//这个数据要让common.js也可以访问的到,所以放在作用域外面,相当于把common.js的内容放在这个代码之间,在$(function(){})里面调用,所以totalPages和currentPage
//不能在作用域里面声明,外面获取不到
var totalPages=1;
var currentPage = 1;
$(function(){
    
    queryUser();
    use();
    logout();
    
    
    function queryUser(){
        $.ajax({
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:4
            },
            success:function(data){
                // console.log(data);
                var html = template('trTpl',data);
                $('table tbody').html(html);
                totalPages=Math.ceil(data.total/data.size);
                page(queryUser);
            }
        })
    }

    //2.点击启用或者禁用,按钮的内容互相切换,状态也跟着切换,委托注册
    function use(){
        $('tbody').on('click','.btn-use',function(){
            console.log(this);
            //2.1 获取状态和id
            var isDelete = $(this).data("isdelete");
            var id = $(this).data('id');
            //2.2 如果是1就改为0,如果是0就改为1
            isDelete=isDelete==0?1:0;
            //2.3 发送请求
            $.ajax({
                url:"/user/updateUser",
                type:"post",
                data:{
                    id,
                    isDelete
                },
                success:(data) => {
                    console.log(data);
                    if(data.success){
                        queryUser();
                    }
    
                }
            })
            
        })
    }

    // //3.分页插件的初始化
    // function page(currentPage,totalPages,callback){
    //        $("#page").bootstrapPaginator({
    //            bootstrapMajorVersion:3, //对应的bootstrap版本
    //            currentPage: currentPage, //当前页数
    //            numberOfPages: 5, //每次显示页数
    //            totalPages:totalPages, //总页数
    //            shouldShowPage:true,//是否显示该按钮
    //            useBootstrapTooltip:true,
    //            //点击事件
    //            onPageClicked: function (event, originalEvent, type, page) {
    //                 currentPage=page;
    //                 callback();
    //            }
    //        });
    // }

    // //4.点击退出
    // function logout(){
    //     $('.logout').on('click',function(){
    //         $.ajax({
    //             url:"/employee/employeeLogout",
    //             success:(data) =>{
    //                 console.log(data);
    //                 if(data.success){
    //                     location='login.html';
    //                 }
    //             }
    //         })

    //     })
    // }


})