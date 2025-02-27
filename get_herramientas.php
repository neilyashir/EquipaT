<?php
header("Content-Type: application/json");
include "db.php";

$sql = "SELECT * FROM herramientas";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["error" => "Error en la consulta: " . $conn->error]));
}

$herramientas = [];

while ($row = $result->fetch_assoc()) {
    $herramientas[] = $row;
}

echo json_encode($herramientas, JSON_PRETTY_PRINT);
$conn->close();
?>
