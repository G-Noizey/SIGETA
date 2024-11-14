// Productos.jsx

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import CardProducto from './CardProducto';
import AddProductoModal from './AddProductoModal';
import AddMarcaModal from './AddMarcaModal';
import AddAbarroteModal from './AddAbarroteModal';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalMarca, setShowModalMarca] = useState(false);
    const [showModalAbarrote, setShowModalAbarrote] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleShowMarca = () => setShowModalMarca(true);
    const handleCloseMarca = () => setShowModalMarca(false);
    const handleShowAbarrote = () => setShowModalAbarrote(true);
    const handleCloseAbarrote = () => setShowModalAbarrote(false);

    // Nueva función para actualizar productos
    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/productos'); 
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Gestión de productos</h2>

            <Button variant="success" onClick={handleShow} style={{ marginBottom: '30px', width: '12%', marginRight: '40px' }}>
                Añadir Producto
            </Button>
            <Button variant="success" onClick={handleShowAbarrote} style={{ marginBottom: '30px', width: '12%', marginRight: '40px' }}>
                Añadir Abarrote
            </Button>
            <Button variant="success" onClick={handleShowMarca} style={{ marginBottom: '30px', width: '12%' }}>
                Añadir Marca
            </Button>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <CardProducto key={producto.idproducto} producto={producto} />
                    ))
                ) : (
                    <p>No hay productos disponibles</p>
                )}
            </div>

            <AddProductoModal show={showModal} handleClose={handleClose} updateProductos={fetchProductos} />
            <AddMarcaModal show={showModalMarca} handleClose={handleCloseMarca} />
            <AddAbarroteModal show={showModalAbarrote} handleClose={handleCloseAbarrote} updateProductos={fetchProductos} />
        </div>
    );
};

export default Productos;
