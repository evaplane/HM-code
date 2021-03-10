<?php

require_once 'tools/doSql.php';

$sql="select * from categories";

$data = mysqli_select($sql);

echo json_encode($data);

?>