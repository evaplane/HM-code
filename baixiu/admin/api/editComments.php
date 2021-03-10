<?php

    //这是操作评论状态的接口

    $status = $_POST['status'];
    $ids = $_POST['ids'];

    //修改操作
    $link = mysqli_connect('127.0.0.1','root','root','baixiu');
    $sql="update comments set status ='$status'where Id in ($ids)";

    mysqli_query($link,$sql);

    $arr = mysqli_affected_rows($link);

    mysqli_close($link);

    if(count($arr)>0){
        echo '{"code":10000,"msg":"ok"}';
    }else{
        echo  '{"code":10001,"msg":"fail"}';
    }



?>