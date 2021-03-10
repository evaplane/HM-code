<?php

$file=$_FILES['file'];

$oldName = $file['name'];
$tmp_path=$file['tmp_name'];


//1.把名字转化为gbk格式存到服务器中
$newName = iconv('utf-8','gbk',$oldName);
$new_path="./data/$newName";

//2.把文件存到本地
move_uploaded_file($tmp_path,$new_path);

//3.响应体为文件路径给网页utf-8编码的
echo "data/$oldName";

?>