<?php
//这个是登出页面的执行代码


//删除session,跳回login页面
session_start();
unset($_SESSION['userInfo']);

header('location:../login.html');




?>