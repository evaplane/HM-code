<?php


$image = $_FILES['image'];
$link =$_POST['link'];
$text = $_POST['text'];

$name = $image['name'];
$temp_path = $image['tmp_name'];
$newName = iconv('utf-8','gbk',$name);
$new_path = "../../uploads/$newName";
$path = "../../uploads/$name";

move_uploaded_file($temp_path,$new_path);



require_once "tools/doSql.php";

$sql = "insert into sliders(image,text,link) values('$path','$text','$link')";

$res = mysqli_zsg($sql);
if($res){
    echo '{"code":10000,"msg":"ok"}';
}else{
    echo '{"code":10001,"msg":"fail"}';
}


?>