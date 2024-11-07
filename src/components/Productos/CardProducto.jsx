// src/components/CardProducto.jsx
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaEdit, FaEye, FaExclamationTriangle } from 'react-icons/fa';

const CardProducto = ({ producto }) => {
    const { nombre, precio, estado, imagen, stock } = producto;

    return (
        <Card style={{ width: '200px', position: 'relative' }}>
            {/* Círculo de stock en la esquina superior derecha */}
            <Badge
                pill
                bg={stock > 0 ? "success" : "danger"}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '0.8em',
                    padding: '5px 10px',
                    borderRadius: '50%'
                }}
            >
                {stock}
            </Badge>

            {/* Imagen del producto */}
            <Card.Img 
                variant="top" 
                src={imagen} 
                style={{ height: '150px', objectFit: 'cover' }} 
            />

            <Card.Body>
                {/* Información del producto */}
                <Card.Title>{nombre}</Card.Title>
                <Card.Text>
                    <strong>Precio:</strong> ${precio}<br />
                    <strong>Estado:</strong> {estado}
                </Card.Text>

                {/* Iconos en la parte inferior derecha */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                    <FaEdit style={{ cursor: 'pointer' }} title="Editar" />
                    <FaEye style={{ cursor: 'pointer' }} title="Ver" />
                    <FaExclamationTriangle style={{ cursor: 'pointer', color: 'red' }} title="Alerta" />
                </div>
            </Card.Body>
        </Card>
    );
};

export default CardProducto;
