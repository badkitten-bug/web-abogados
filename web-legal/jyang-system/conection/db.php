<?php
$host = "localhost"; // Cambia si tu base de datos está en otro servidor
$usuario = "root"; // Tu usuario de MySQL
$clave = ""; // Tu contraseña de MySQL
$base_datos = "jyang"; // Cambia por el nombre de tu base de datos

// Crear conexión
$conexion = new mysqli($host, $usuario, $clave, $base_datos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Si la conexión es exitosa

?>
