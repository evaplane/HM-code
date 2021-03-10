<?php
    // header('content-type:text/html;charset=utf-8');

    $email = $_POST['email'];
    $password = $_POST['password'];

    $link = mysqli_connect('127.0.0.1','root','root','baixiu');
    $sql="select * from users where email='$email' and password='$password'";
    $res = mysqli_query($link,$sql);
    $arr=mysqli_fetch_all($res,1);

    mysqli_close($link);
    if(count($arr)>0){
        //设置一个session用来给页面们判断有没有登录
        session_start();
        $_SESSION['userInfo']=$arr[0];
        echo '{"code":10000,"msg":"ok"}';
    }else{
        echo '{"code":10001,"msg":"fail"}';
    }



?>