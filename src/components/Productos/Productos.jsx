// src/components/Productos.jsx
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CardProducto from './CardProducto';
import AddProductoModal from './AddProductoModal';

// Datos de ejemplo de productos
const productos = [
    {
        id: 1,
        nombre: 'Producto A',
        precio: 150,
        estado: 'Disponible',
        imagen: 'https://via.placeholder.com/150',
        stock: 10
    },
    {
        id: 2,
        nombre: 'Producto B',
        precio: 200,
        estado: 'Agotado',
        imagen: 'https://via.placeholder.com/150',
        stock: 0
    },
    // Agrega más productos según sea necesario
];

const Productos = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            {/* Título en la parte superior */}
            <h2 style={{ marginBottom: '20px' }}>Gestión de productos</h2>

            {/* Botón para agregar un nuevo producto */}
            <Button variant="success" onClick={handleShow} style={{ marginBottom: '30px', width: '12%' }}>
                Añadir
            </Button>

            {/* Contenedor para las tarjetas */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {productos.map((producto) => (
                    <CardProducto key={producto.id} producto={producto} />
                ))}
            </div>

            {/* Modal para añadir un nuevo producto */}
            <AddProductoModal show={showModal} handleClose={handleClose} />
        </div>
    );
};

export default Productos;
