<?php
//获取用户的信息,便于后面改头像和名字

//通过session获取
session_start();
$userInfo = $_SESSION['userInfo'];

//返回给响应体
echo json_encode($userInfo);
?>