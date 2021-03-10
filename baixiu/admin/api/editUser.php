<?php

$email = $_POST['email'];
$slug = $_POST['slug'];
$nickname = $_POST['nickname'];
$bio = $_POST['bio'];
$avatar = $_FILES['avatar'];



$name = $avatar['name'];

$tmp_path = $avatar['tmp_name'];

$newName = iconv('utf-8','gbk',$name);

//gbk路径
$new_path = "../../uploads/$newName";
//utf-8路径
$path = "../../uploads/$name";

move_uploaded_file($tmp_path,$new_path);

require_once "tools/doSql.php";

if($name != ''){
    $sql="update users set
        slug='$slug',
        nickname='$nickname',
        avatar='$path',
        bio='$bio'
        where email ='$email'";

}else{
    $sql="update users set
        slug='$slug',
        nickname='$nickname',
        bio='$bio'
        where email ='$email'";
}


$res = mysqli_zsg($sql);

if($res){
    session_start();
    $_SESSION['userInfo']['slug']=$slug;
    $_SESSION['userInfo']['nickname']=$nickname;
    $_SESSION['userInfo']['bio']=$bio;
    if($name!=''){
        $_SESSION['userInfo']['avatar']=$path;
    }
    
    echo '{"code":10000,"msg":"ok"}';
}else{
    echo '{"code":10001,"msg":"fail"}';
}


?>