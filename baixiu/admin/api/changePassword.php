<?php

$oldPass = $_POST['oldPass'];


//1.先判断旧密码是否和session里面的一致

session_start();

if($oldPass != $_SESSION['userInfo']['password']){
    echo '{"code":10001,"msg":"旧密码输入错误"}';
    return;
}


//2.把新密码修改增加到数据库
$newPass = $_POST['newPass'];

require_once "tools/doSql.php";

$id = $_SESSION['userInfo']['id'];
$sql = "update users set password = '$newPass' where id = '$id'";

$res = mysqli_zsg($sql);

if($res){
    echo '{"code":10000,"msg":"修改成功!"}';
}else{
    echo '{"code":10002,"msg":"修改失败!"}';
}

?>