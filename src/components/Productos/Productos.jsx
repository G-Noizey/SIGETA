// src/components/Productos.jsx
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CardProducto from './CardProducto';
import AddProductoModal from './AddProductoModal';
import AddMarcaModal from './AddMarcaModal';
import AddAbarroteModal from './AddAbarroteModal';

// Datos de ejemplo de productos
const productos = [
    {
        id: 1,
        nombre: 'Producto A',
        precio: 120,
        estado: 'Disponible',
        imagen: 'https://via.placeholder.com/150',
        stock: 10
    },
];

const Productos = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalMarca, setShowModalMarca] = useState(false);
    const [showModalAbarrote, setShowModalAbarrote] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleShowMarca = () => setShowModalMarca(true);
    const handleCloseMarca = () => setShowModalMarca(false);
    const handleShowAbarrote = () => setShowModalAbarrote(true);
    const handleCloseAbarrote = () => setShowModalAbarrote(false);

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Gestión de productos</h2>

            <Button variant="success" onClick={handleShow} style={{ marginBottom: '30px', width: '12%', marginRight: '38px' }}>
                Añadir Producto
            </Button>
            <Button variant="success" onClick={handleShowAbarrote} style={{ marginBottom: '30px', width: '12%', marginRight: '38px'}}>
                Añadir Abarrote
            </Button>
            <Button variant="success" onClick={handleShowMarca} style={{ marginBottom: '30px', width: '12%' }}>
                Añadir Marca
            </Button>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {productos.map((producto) => (
                    <CardProducto key={producto.id} producto={producto} />
                ))}
            </div>

            <AddProductoModal show={showModal} handleClose={handleClose} />
            <AddMarcaModal show={showModalMarca} handleClose={handleCloseMarca} />
            <AddAbarroteModal show={showModalAbarrote} handleClose={handleCloseAbarrote} />
        </div>
    );
};

export default Productos;
