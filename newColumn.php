<?php

require_once 'conn.php';

$check_array = ['columnName', 'slug'];
if (array_diff($check_array, array_keys($_POST))){
	http_response_code(400);
    header('Content-Type: application/json');
    echo 'not all exists';
    die();
}

$columnName = trimAndEscape($conn, $_POST['columnName']);
$slug = trimAndEscape($conn, $_POST['slug']);

$sqlCN = "INSERT INTO `columns` (`columnName`, `slug`) VALUES( '$columnName', '$slug' ) ";
$resultCN = mysqli_query($conn,$sqlCN);

if ($resultCN) {
	http_response_code(200);
	header('Content-Type: application/json');
	echo 'Done so.';
}

function trimAndEscape($conn, $inputVar){
    $inputVar = trim($inputVar);
    $inputVar = mysqli_escape_string($conn, $inputVar);
    return $inputVar;
}