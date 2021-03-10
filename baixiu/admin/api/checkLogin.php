<?php

    //这个是用来检查是否登录的页面,也就是判断有没有session

    session_start();

    //如果不存在就打回登录页面
    if(isset($_SESSION['userInfo'])){
        echo ' {"code":10000,"msg":"ok"}';
    }else{
        echo '{"code":10001,"msg":"fail"}';
    }



?>