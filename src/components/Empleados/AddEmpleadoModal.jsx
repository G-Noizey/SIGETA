// src/components/Empleados/AddEmpleadoModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddEmpleadoModal = ({ show, handleClose }) => {
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para añadir el empleado
        console.log({ nombre, apellidoPaterno, apellidoMaterno, edad, telefono, correo });
        handleClose(); // Cierra el modal
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir Empleado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombre" style={{ marginBottom: '15px' }}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellidoPaterno" style={{ marginBottom: '15px' }}>
                        <Form.Label>Apellido Paterno</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el apellido paterno"
                            value={apellidoPaterno}
                            onChange={(e) => setApellidoPaterno(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellidoMaterno" style={{ marginBottom: '15px' }}>
                        <Form.Label>Apellido Materno</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el apellido materno"
                            value={apellidoMaterno}
                            onChange={(e) => setApellidoMaterno(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEdad" style={{ marginBottom: '15px' }}>
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese la edad"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formTelefono" style={{ marginBottom: '15px' }}>
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCorreo" style={{ marginBottom: '15px' }}>
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese el correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Confirmar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEmpleadoModal;
