import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddEmpleadoModal = ({ show, handleClose, setUsuarios }) => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoEmpleado = {
            nombre, apellidos, contrasena, edad, telefono, correo, usuario
        };
        try {
            const response = await axios.post('http://localhost:3000/crear-usuario', nuevoEmpleado);
            Swal.fire({
                icon: 'success',
                title: 'Empleado creado exitosamente',
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                setNombre('');
                setApellidos('');
                setContrasena('');
                setEdad('');
                setTelefono('');
                setCorreo('');
                setUsuario('');
                handleClose();
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Hubo un error al crear el empleado',
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir Empleado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombre" style={{ marginBottom: '15px' }}>
                        <Form.Label>Nombre(s)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            minLength={5} 
                            maxLength={50}
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellidos" style={{ marginBottom: '15px' }}>
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el apellido paterno"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            minLength={5} 
                            maxLength={50}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEdad" style={{ marginBottom: '15px' }}>
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese la edad"
                            value={edad}
                            onChange={(e) => {
                                const value = Math.max(1, e.target.value); 
                                setEdad(value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formTelefono" style={{ marginBottom: '15px' }}>
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            minLength={10} 
                            maxLength={12}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCorreo" style={{ marginBottom: '15px' }}>
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese el correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            minLength={12} 
                            maxLength={50}
                        />
                    </Form.Group>
                    

                    <Form.Group controlId="formUsuario" style={{ marginBottom: '15px' }}>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa el usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            minLength={5} 
                            maxLength={30}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContrasena" style={{ marginBottom: '15px' }}>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingresa la contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            minLength={9} 
                            maxLength={20}
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
