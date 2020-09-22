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

$sqlC = "SELECT DISTINCT c.cid,
                c.slug,
                c.columnName
            FROM columns c
            GROUP BY c.cid
            ";

if(isset($_GET['exist'])){
    $sqlC = "SELECT DISTINCT c.cid,
                c.slug,
                c.columnName,
                COUNT(v.vid) AS totalVideos
            FROM columns c, videos v
            WHERE c.cid = v.cid
            GROUP BY c.cid
            ";
}

$resultC = mysqli_query($conn,$sqlC);

if ($resultC->num_rows > 0) {
    $cData = array();

    while($row = $resultC->fetch_assoc()) {
        $cData[] = $row;
    }

    $outputData = array(
        "columns" => $cData,
    );

    date_default_timezone_set("Asia/Hong_Kong");
    header("Pragma: no-cache");
    header("Expires: 0");

    http_response_code(200);
    header('Content-Type: application/json');

    echo json_encode($outputData);
}