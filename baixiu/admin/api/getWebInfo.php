<?php
//获取index.html页面的数据
//文章的数据库是posts
//封装一个数据库查找数据的函数

require_once "./tools/doSql.php";
$sql = "select * from posts where status !='trashed'";
$wenzhang = count(mysqli_select($sql));


$sql="select * from posts where status = 'drafted'";
$caogao= count(mysqli_select($sql));

$sql="select * from categories";
$fenlei = count(mysqli_select($sql));

$sql="select * from comments where status !='trashed'";
$pinglun= count(mysqli_select($sql));


$sql="select * from comments where status ='held'";
$daishenhe = count(mysqli_select($sql));


//拼接为关系型数组,就是对象,转化成json格式
$arr = array(
    "wenzhang" => $wenzhang,
    "caogao" => $caogao,
    "fenlei" => $fenlei,
    "pinglun" => $pinglun,
    "daishenhe" => $daishenhe
);

echo json_encode($arr);
?>