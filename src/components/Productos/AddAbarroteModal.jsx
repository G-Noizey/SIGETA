// src/components/Productos/AddProductoModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddAbarroteModal = ({ show, handleClose }) => {
    const [nombre, setNombre] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose(); 
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir Abarrote</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre Abarrote</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de la marca"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
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

export default AddAbarroteModal;
