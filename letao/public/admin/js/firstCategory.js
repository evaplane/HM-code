var currentPage = 1;
var totalPages = 1;
$(function(){
    queryFirstCategory();
    addFirstCayegory();
    logout();
    //1.获取数据渲染到页面
    function queryFirstCategory(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:5
            },
            success:(data) =>{
                console.log(data);
                var html = template('trTpl',data);
                $('tbody').html(html);
                totalPages=Math.ceil(data.total/data.size);
                page(queryFirstCategory);
            }
        })
    }

    //2.添加分类
    function addFirstCayegory(){
        //2.1 点击保存
        $('.btn-save').on('click',function(){
            //2.2 获取分类名称
            var categoryName = $('#categoryName').val();
            if(!categoryName){
                //2.3 return false 可以阻止默认时间,return结束整个函数
                return false;
            }

            //2.4 发送请求
            $.ajax({
                url:"/category/addTopCategory",
                data:{categoryName},
                type:'post',
                success:(data)=>{
                    console.log(data);
                    if(data.success){
                        queryFirstCategory();
                        //清空
                        $('#categoryName').val('');
                    }
                }
            })
        })
    }
})