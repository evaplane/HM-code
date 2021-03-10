<?php

    $slug = $_POST['slug'];    
    $title = $_POST['title'];
    $feature = $_FILES['feature'];
    $created = $_POST['created'];
    $content = $_POST['content'];
    $status = $_POST['status'];
    $category = $_POST['category'];
    $id = $_POST['id'];


    $name= $feature['name'];
    $tmp_path = $feature['tmp_name'];
    $newName = iconv('utf-8','gbk',$name);
    $new_path="../../uploads/$newName";
    move_uploaded_file($tmp_path,$new_path);

    require_once "tools/doSql.php";

    //判断名字是否为空,如果为空的话就说明没有修改文件,如果没有修改文件的话就不能改sql语法的feature字段
    if($name!=''){
        $sql = "update posts set 
                    slug='$slug',
                    title='$title',
                    feature='../../uploads/$name',
                    created='$created',
                    content='$content',
                    status='$status',
                    category_id='$category'
                where id = $id";
    }else{
        $sql = "update posts set 
                    slug='$slug',
                    title='$title',
                    created='$created',
                    content='$content',
                    status='$status',
                    category_id='$category'
                where id = $id";
    }
    
    $res = mysqli_zsg($sql);

    if($res){
        echo '{"code":10000,"msg":"ok"}';
    }else{
        echo '{"code":10001,"msg":"fail"}';
    }

?>