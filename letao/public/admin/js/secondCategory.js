var currentPage=1;
var totalPages = 1;

$(function(){
    querySecondCategory();
    // addBrand();
    logout();
    addCategoryName();
    addPic();
    addBrand();
    //1.获取数据渲染到页面上
    function querySecondCategory(){
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:5
            },
            success:(data) => {
                console.log(data);
                var html = template('secondTpl',data);
                $('tbody').html(html);

                totalPages = Math.ceil(data.total/data.size);
                page(querySecondCategory);
            }
        })
    }

    
    //2.添加品牌
    function addCategoryName(){
        //2.1 获取分类,渲染到分类名称中
        $.ajax({
            url:"/category/queryTopCategory",
            success:(data) => {
                console.log(data);
                var str='';
                for(var i =0;i<data.rows.length;i++){
                    str+="<option value='"+data.rows[i].id+"'>"+data.rows[i].categoryName+"</option>";
                }
                $('.categoryName').html(str);
            }
        })
    }

    //3.上传图片
    function addPic(){
        //3.1 在文件的值改变事件中
        $('.brandLogo').on('change',function(){
            //3.2 获取到上传的文件
           var file = this.files[0];
           if(!file){
             return false;
           }
           //3.3 创建formData对象
           var formData = new FormData();
           //3.4 把文件添加进来
           formData.append('pic1',file);
           //3.5 发送请求
           $.ajax({
               url:"/category/addSecondCategoryPic",
               type:"post",
               contentType:false,
               processData:false,
               data:formData,
               success:(data)=>{
                   if(data.picAddr){
                       //请求成功,会把地址返回,把下面的img的src改了即可
                       $('.logoPic').attr('src',data.picAddr);

                   }
               }
           })
           
        })
    }

    //4.添加品牌
    function addBrand(){
        $('.btn-save').on('click',function(){
            //4.1 获取分类id
            var categoryId = $('.categoryName').val();
            console.log(categoryId);
            //4.2 获取品牌名称
            var brandName = $('.brandName').val();
            if(!brandName){
                return false;
            }

            //4.3 获取品牌图片
            var brandLogo = $('.logoPic').attr('src');
            console.log(brandLogo);

            //4.4 发送请求
            $.ajax({
                url:"/category/addSecondCategory",
                type:"post",
                data:{
                    brandName:brandName,
                    brandLogo:brandLogo,
                    categoryId:categoryId,
                    hot:1
                },
                success:function(data){
                    if(data.success){
                        querySecondCategory();

                    }
                }
            })
        })
    }
})