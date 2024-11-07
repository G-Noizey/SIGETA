// src/components/Productos/AddProductoModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddProductoModal = ({ show, handleClose }) => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [estado, setEstado] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ nombre, precio, estado, stock, imagen });
        // Aquí puedes manejar la lógica para agregar el nuevo producto
        handleClose(); // Cierra el modal después de agregar
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del producto"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPrecio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese el precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el estado (Disponible, Agotado)"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese el stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formImagen">
                        <Form.Label>Imagen URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="URL de la imagen"
                            value={imagen}
                            onChange={(e) => setImagen(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" style={{ marginTop: '20px' }}>
                        Confirmar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductoModal;
