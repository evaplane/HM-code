//arr.splice(index,num) 删除数组中的元素,第一个参数是数组开始删除的索引,第二个参数是删除的个数
//每删掉一个,数组的长度减少1,循环就会少一次,所以i--
//arr往前加是unshift,往后加是push
$(function () {
    storageData();
    searchData();
    deleteData();
    clearData();
    scroll();

    //1.存储查询的数据
    function storageData() {


        //1.1 点击搜索的时候获取内容
        $('.search').on('tap', function () {
            //1.2 如果内容为空就提醒要输入内容
            var searchContent = $('.searchInput').val().trim();
            if (searchContent == '') {
                alert('请输入要查询的内容');
                return;
            }



            //1.3 存入localStorage,复杂数据类型要转化为json
            //获取上一次的localStorage,转化为数组,如果之前没有数据,res的结果为null,如果是null,声明数组,如果不是null,把之前的数组取出来

            // var res = JSON.parse(localStorage.getItem('cardContent'));
            // if (res == null) {
            //     var arr = [];
            // } else {
            //     arr = res;
            // }

            var arr = getData();
            //再对数组进行去重
            arr = quchong(arr);

            //1.4 如果输入的内容和arr里面的任意一个内容重复,就把原来的数据删掉,然后把新输入的加在前面
            for (var i = 0; i < arr.length; i++) {
                if (searchContent == arr[i]) {
                    //1.5 删除原来的数据
                    arr.splice(i, 1);
                    
                    //如果删除了一个数组就少了一个,下标编号不对,所以,每次删除都要i--一次
                    i--;
                }
            }
            arr.unshift(searchContent);
            

            // var json = JSON.stringify(arr);
            // //1.6 存入localStorage
            // localStorage.setItem('cardContent', json);
            setData(arr);
            
            // var html = template('searchTpl', {
            //     list: arr
            // });
            // $('.mui-card-content ul').html(html);



            //1.7 每次点击完清空input
            $('.searchInput').val('');

            //1.8 渲染到页面上
            searchData();

           
            //1.9 跳转到商品列表
            location = 'productlist.html?search='+searchContent+'&time='+new Date().getTime();
           

        })



    }

    //2.查询数据
    function searchData() {
        //如果没有点击的时候,也应该把上次的内容获取到显示在页面上
        // var res = JSON.parse(localStorage.getItem('cardContent'));
        // console.log(res);
        // if (res == null) {
        //     var arr = [];
        // }else {
        //     arr = res;
        // }

       var arr = getData();
        
        //如果为空也要渲染
        var html = template('searchTpl', {
            list: arr
        });
        $('.mui-card-content ul').html(html);

         
    }


    //3.删除数据
    function deleteData() {
        //3.1 遍历li标签,委托事件
        $('.mui-table-view').on('tap', '.close', function () {
            // var value = $(this).siblings('.value').html().trim();
            //3.2 获取localStorage,删除这个li
            // var arr = JSON.parse(localStorage.getItem('cardContent'));
            // var arr = getData();

            //3.3 遍历arr,如果和点击的value相同,就删除,再把arr添加到localStorge
            // for (var i = 0; i < arr.length; i++) {
            //     if (arr[i] == value) {
            //         arr.splice(i, 1);
            //     }
            // }
            // var json = JSON.stringify(arr);
            // localStorage.setItem('cardContent', json);
            // setData(arr);
            //3.4 将新的localStorage渲染到页面上
            // searchData();

            //方法2:把index存到close上面,点击close获取index,arr调用splice()方法
            //3.1 获取这个close的自定义属性data-index
            // var index = this.dataset['index'];
            var index = $(this).data('index');
            console.log(index);
            //3.2 获取localStorage
            var arr  = getData();

            //3.3 删除数组的这个index
            arr.splice(index,1);
            
            //3.4 重新添加到localStorage中
            setData(arr);

            //3.5 重新渲染
            searchData();


        })

    }

    //4.清空数据
    function clearData() {
        $('.clear').on('tap', function () {

            //4.1 清除locaStorage,clear会把其他的localStorage也删掉
            // localStorage.clear();
            localStorage.removeItem('cardContent');
            searchData();
           
            

            // 4.2 清空页面内容,把原来的内容显示在页面上
            // var html2 = ' <li class="mui-table-view-cell"> 没有更多记录' +
            //     '</li>';
            // $('.mui-card-content ul').html(html2);

        })
    }

    //5.区域滚动
    function scroll() {
        mui('.mui-card-content .mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }


    //6.封装获取localStorage
    function getData(){
        var arr = JSON.parse(localStorage.getItem('cardContent'));
        if (arr == null) {
            arr = [];
        }else {
            arr =arr ;
        }

        return arr;
    }

    //7.封装设置localStorage
    function setData(arr){
        var json = JSON.stringify(arr);
        localStorage.setItem('cardContent', json);
    }

     //8.对数组进行去重的函数
     function quchong(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            var isOk = true;
            for (var j = 0; j < newArr.length; j++) {
                if (newArr[j] == arr[i]) {
                    isOk = false;
                }
            }

            if (isOk) {
                newArr[newArr.length] = arr[i];
            }
        }
        return newArr;
    }
})