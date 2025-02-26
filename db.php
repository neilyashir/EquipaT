<?php
$host = "localhost"; // Servidor MySQL (usualmente localhost)
$user = "root"; // Usuario de PHPMyAdmin (por defecto "root")
$password = ""; // Contraseña (vacía por defecto en XAMPP)
$dbname = "equipaT_db"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Configurar charset para evitar problemas con caracteres especiales
$conn->set_charset("utf8");

?>
