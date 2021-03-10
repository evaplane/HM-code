<?php
    //封装的查找数据库的函数
    function mysqli_select($sql){
        $link=mysqli_connect('127.0.0.1','root','root','baixiu');
        $res = mysqli_query($link,$sql);
        $arr=mysqli_fetch_all($res,1);
        mysqli_close($link);

        return $arr;
    }




    function mysqli_zsg($sql){

        $link = mysqli_connect('127.0.0.1','root','root','baixiu');
    
        $res  = mysqli_query($link,$sql);
    
        mysqli_close($link);
    
        return $res;
    }
?>