<?php


$slug = $_POST['slug'];
$name = $_POST['name'];


require_once "tools/doSql.php";

$sql = "insert into categories(slug,name) values('$slug','$name')";

$res = mysqli_zsg($sql);

if($res){
    echo '{"code":10000,"msg":"ok"}';
}else{
    echo '{"code":10001,"msg":"fail"}';
}



?>