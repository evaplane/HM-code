//4.点击退出
function logout(){
    $('.logout').on('click',function(){
        $.ajax({
            url:"/employee/employeeLogout",
            success:(data) =>{
                console.log(data);
                if(data.success){
                    location='login.html';
                }
            }
        })

    })
}


//3.分页插件的初始化
function page(callback){
    $("#page").bootstrapPaginator({
        bootstrapMajorVersion:3, //对应的bootstrap版本
        currentPage: currentPage, //当前页数
        numberOfPages: 5, //每次显示页数
        totalPages:totalPages, //总页数
        shouldShowPage:true,//是否显示该按钮
        useBootstrapTooltip:true,
        //点击事件
        onPageClicked: function (event, originalEvent, type, page) {
             currentPage=page;
             callback();
        }
    });
}
