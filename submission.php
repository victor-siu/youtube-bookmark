<?php

require_once 'conn.php';

$check_array = ['url', 'uid', 'cid'];
if (array_diff($check_array, array_keys($_POST))){
	http_response_code(400);
    header('Content-Type: application/json');
    echo 'not all exists';
    die();
}

$url = urldecode(trimAndEscape($conn, $_POST['url']));
$uid = trimAndEscape($conn, $_POST['uid']);
$cid = trimAndEscape($conn, $_POST['cid']);

$sqlB = "INSERT INTO `videos` (`url`, `uid`, `cid`) VALUES( '$url','$uid', '$cid') ";
$resultB = mysqli_query($conn,$sqlB);

if ($resultB) {
	http_response_code(200);
	header('Content-Type: application/json');
	echo 'Done so.';
}

function trimAndEscape($conn, $inputVar){
    $inputVar = trim($inputVar);
    $inputVar = mysqli_escape_string($conn, $inputVar);
    return $inputVar;
}