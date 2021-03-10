<?php


$pageIndex = $_GET['pageIndex'];
$pageSize = $_GET['pageSize'];
$category = $_GET['category'];
$status = $_GET['status'];

require_once "./tools/doSql.php";

$start = ($pageIndex-1) * $pageSize;
$sql="select p.id,p.title,u.nickname,c.name,p.created,p.status,p.content,p.slug,p.feature,p.category_id from posts p
        inner join users u
        on p.user_id=u.id
        inner join categories c
        on p.category_id=c.id
        where p.status !='trashed'
        ";

//判断如果分类不是未分类,就加上分类的筛选,如果状态不是所有状态,就加上状态的筛选
if($category != '所有分类'){
    $sql .= "and c.name ='$category'";
}

if($status != '所有状态'){
    $sql .= "and p.status ='$status'";
}

$sql2=$sql;

$sql .= "order by p.id desc limit $start,$pageSize";

$data = mysqli_select($sql);


// $sql = "select p.id,p.title,u.nickname,c.name,p.created,p.status from posts p
//             inner join users u
//             on p.user_id=u.id
//             inner join categories c
//             on p.category_id=c.id
//             where p.status !='trashed'";

$count = count(mysqli_select($sql2));

$totalPages = ceil($count/$pageSize);


$arr =array(
    'data' => $data,
    'totalPages' => $totalPages
);

echo json_encode($arr);


?>