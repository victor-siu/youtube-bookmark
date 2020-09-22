<?php

require_once 'conn.php';

$check_array = ['username'];
if (array_diff($check_array, array_keys($_POST))){
	http_response_code(400);
    header('Content-Type: application/json');
    echo 'not all exists';
    die();
}

$username = trimAndEscape($conn, $_POST['username']);

$sqlUN = "INSERT INTO `users` (`username`) VALUES( '$username') ";
$resultUN = mysqli_query($conn,$sqlUN);

if ($resultUN) {
	http_response_code(200);
	header('Content-Type: application/json');
	echo 'Done so.';
}else{
    http_response_code(500);
    header('Content-Type: application/json');
    echo 'Failed.';
}

function trimAndEscape($conn, $inputVar){
    $inputVar = trim($inputVar);
    $inputVar = mysqli_escape_string($conn, $inputVar);
    return $inputVar;
}