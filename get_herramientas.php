<?php
header("Content-Type: application/json");
include "db.php"; // Importamos la conexión

$sql = "SELECT * FROM herramientas";
$result = $conn->query($sql);

$herramientas = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $herramientas[] = $row;
    }
}

// Convertimos el array a JSON y lo mostramos
echo json_encode($herramientas, JSON_PRETTY_PRINT);

// Cerramos la conexión
$conn->close();
?>
