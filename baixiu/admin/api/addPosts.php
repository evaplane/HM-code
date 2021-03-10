<?php

$slug = $_POST['slug'];
$title = $_POST['title'];
$feature = $_FILES['feature'];
$created = $_POST['created'];
$content = $_POST['content'];
$status = $_POST['status'];
$category = $_POST['category'];

$name = $feature['name'];
$tmp_path = $feature['tmp_name'];
$newName = iconv('utf-8','gbk',$name);

$new_path = "../../uploads/$newName";

move_uploaded_file($tmp_path,$new_path );

require_once "./tools/doSql.php";
$new_path = "../../uploads/$name";

//在session中取出登录人的id
session_start();
$id = $_SESSION['userInfo']['id'];
$sql="insert into posts(slug,title,feature,created,content,status,category_id,user_id) 
                    values ('$slug','$title','$new_path','$created','$content','$status','$category','$id')";
                            
$res  = mysqli_zsg($sql);

if($res){
    echo '{"code":10000,"msg":"ok"}';
}else{
    echo '{"code":10001,"msg":"fail"}';
}

?>