<?php

$id = $_POST['id'];
// $zan = $_POST['zan'];

require_once "tools/doSql.php";


$sql = "select * from posts where id = $id";
$likes = mysqli_select($sql)[0]['likes'];
$likes++;

$sql = "update posts set likes=$likes where id =$id";

$res = mysqli_zsg($sql);

if($res){
    echo $likes;
}else{
    echo "fail";
}




?>