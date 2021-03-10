<?php

//分页页码和页容量
$pageIndex = $_GET['pageIndex'];
$pageSize = $_GET['pageSize'];

require_once "tools/doSql.php";

//limit后的第一个参数,每页开始的数据
$start = ($pageIndex-1)*$pageSize;


$sql="select c.Id,c.author,c.created,c.content,c.status,p.title
from comments c inner join posts p 
on c.post_id=p.Id 
where c.status != 'trashed'
limit $start,$pageSize";

$arr = mysqli_select($sql);



//获取数据的条数
$sql="select c.Id,c.author,c.created,c.content,c.status,p.title
from comments c inner join posts p 
on c.post_id=p.Id 
where c.status != 'trashed'";
$data = count(mysqli_select($sql));

//总页数
$totalPage = ceil($data/$pageSize);
$array = array(
    "data" => $arr,
    "totalPage" => $totalPage
);
echo json_encode($array);

?>