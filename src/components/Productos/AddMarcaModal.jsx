import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddMarcaModal = ({ show, handleClose }) => {
    const [nombre, setNombre] = useState('');
    const [marcas, setMarcas] = useState([]);
    const [search, setSearch] = useState(''); 

    const fetchMarcas = async () => {
        try {
            const response = await axios.get("http://localhost:3000/marcas");
            if (response.data) {
                setMarcas(response.data); 
            }
        } catch (error) {
            console.error('Error al obtener las marcas:', error);
        }
    };

    useEffect(() => {
        fetchMarcas();
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/marcas", {
                nombre,
                estado: 1,
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Marca creada correctamente',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    setNombre(''); 
                    fetchMarcas(); 
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data.message || 'Hubo un error al crear la marca',
            });
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error('ID inválido para eliminar');
            return;
        }
    
        const confirmDelete = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        });
    
        if (confirmDelete.isConfirmed) {
            try {
                const response = await axios.put(`http://localhost:3000/marcas/borrar/${id}`);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Marca eliminada correctamente',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        fetchMarcas(); 
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar marca',
                    text: error.response?.data.message || 'Hubo un error al eliminar la marca',
                });
                console.error('Error al eliminar la marca:', error); 
            }
        } else {
            console.log('Eliminación cancelada');
        }
    };
    
    
    
    

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredMarcas = marcas.filter((marca) => {
        const nombreMatch = marca.nombre.toLowerCase().includes(search.toLowerCase());
        return nombreMatch;
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir Marca</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombre" style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de la marca"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            style={{ marginRight: '10px' }} 
                            minLength={3} 
                            maxLength={30}
                        />
                        <Button variant="success" type="submit">
                            Confirmar
                        </Button>
                    </Form.Group>
                </Form>

                <Form.Group controlId="formSearch" style={{ marginTop: '20px' }}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por nombre"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Form.Group>

                <Table striped bordered hover style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Nombre Marca</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMarcas.length > 0 ? (
                            filteredMarcas.map((marca) => (
                                <tr key={marca.id}>
                                    <td>{marca.nombre}</td>
                                    <td>
                                        <Button variant="secondary">Modificar</Button>
                                    </td>
                                    <td>
                                    <Button variant="dark" onClick={() => handleDelete(marca.idmarca)}>Eliminar</Button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>
                                    No se encontraron marcas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default AddMarcaModal;
