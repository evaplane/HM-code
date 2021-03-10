<?php


$id = $_GET['id'];


require_once "tools/doSql.php";


$sql = "select * from posts where id =$id";

$data = mysqli_select($sql);

echo json_encode($data[0]);


?>