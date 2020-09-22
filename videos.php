<?php

require_once 'conn.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
   return 0;    
}else{
    $_POST = json_decode(file_get_contents('php://input'), true);
}

$sqlA = "SELECT DISTINCT v.vid,
				v.url,
				c.columnName
            FROM videos v
            JOIN columns c ON v.cid = c.cid
            GROUP BY v.cid
            ";

$sqlB = "SELECT DISTINCT c.cid,
				c.slug,
				c.columnName,
				COUNT(v.vid) AS totalVideos
            FROM columns c, videos v
            WHERE c.cid = v.vid
            GROUP BY v.cid
            ";

$resultA = mysqli_query($conn,$sqlA);
$resultB = mysqli_query($conn,$sqlB);

if ($resultA->num_rows > 0) {
    $aData = array();
    $bData = array();

    while($row = $resultA->fetch_assoc()) {
        $aData[] = $row;
    }

    while($row = $resultB->fetch_assoc()) {
        $bData[] = $row;
    }

    $outputData = array(
    	"videos" => $aData,
    	"columns" => $bData,
    );

    date_default_timezone_set("Asia/Hong_Kong");
    header("Pragma: no-cache");
    header("Expires: 0");

    http_response_code(200);
    header('Content-Type: application/json');

    echo json_encode($outputData);
}