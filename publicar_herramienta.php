<?php
include "db.php"; 

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = $_POST["nombre"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];
    $categoria = $_POST["categoria"];

    // Subir imagen (almacenada en 'uploads/')
    $imagen = $_FILES["imagen"]["name"];
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($imagen);
    move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file);

    $sql = "INSERT INTO herramientas (nombre, descripcion, precio, categoria, imagen) 
            VALUES ('$nombre', '$descripcion', '$precio', '$categoria', '$target_file')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Herramienta publicada con éxito"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
    }

    $conn->close();
}
?>
