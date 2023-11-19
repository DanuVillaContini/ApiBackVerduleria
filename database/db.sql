-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistmetododb;

-- Usar la base de datos
USE sistmetododb;

--Ver datos tabla
SELECT * FROM empleados;
SELECT * FROM proveedores;
SELECT * FROM productos;
SELECT * FROM stock;


-- Crear la tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
    id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    telefono VARCHAR(15), 
    correo VARCHAR(100) UNIQUE 
);
CREATE TABLE IF NOT EXISTS proveedores (
    id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name_empresa VARCHAR(60) NOT NULL,
    name_encargado VARCHAR(80) NOT NULL,
    telefono VARCHAR(15), 
    direccion VARCHAR(100) UNIQUE 
);
CREATE TABLE IF NOT EXISTS productos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    tipo VARCHAR(60) NOT NULL
);
CREATE TABLE IF NOT EXISTS stock (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL,
    FOREIGN KEY (ProductoId) REFERENCES productos(id)
);

-- Insertar un registros de prueba
INSERT INTO empleados (name, apellido, telefono, correo) VALUES
('María', 'Gómez', '987654321', 'maria.gomez@email.com'),
('Carlos', 'Rodríguez', '555123456', 'carlos.rodriguez@email.com'),
('Laura', 'Fernández', '333555777', 'laura.fernandez@email.com'),
('Pedro', 'López', '777888999', 'pedro.lopez@email.com');
INSERT INTO proveedores (name_empresa, name_encargado, telefono, direccion) VALUES
('Fruta Distri', 'María Gómez', '987654321', 'Santa Fe 1500'),
('Verduras Distri', 'Carlos Rodríguez', '555123456', 'Cordoba 350'),
('Mercofrut', 'Ramiro Fernández', '333555777', 'Avenida Belgrano 1800'),
('Flete', 'Jose López', '777888999', 'Camino del Peru 2500');
INSERT INTO productos (name, tipo) VALUES
('Manzana', 'Fruta'),
('Tomate', 'Fruta'),
('Cebolla', 'Verdura'),
('Jengibre', 'Tuberculo')

INSERT INTO stock (ProductoId, Cantidad) VALUES
(1, 20),
(5, 60),
(3, 15),
(4, 10);



