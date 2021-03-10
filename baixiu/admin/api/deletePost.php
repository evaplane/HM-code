<?php

$ids = $_GET['ids'];

require_once "tools/doSql.php";

$sql = "update posts set status='trashed' where id in ($ids)";

$res = mysqli_zsg($sql);

if($res){
    echo '{"code":10000,"msg":"ok"}';
}else{
    echo '{"code":10001,"msg":"fail"}';
}





?>