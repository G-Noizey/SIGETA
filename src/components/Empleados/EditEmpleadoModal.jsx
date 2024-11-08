//EditEmpleadoModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import SweetAlert from "sweetalert2";

const EditEmpleadoModal = ({ show, handleClose, empleado, fetchUsuarios }) => {
  const [empleadoData, setEmpleadoData] = useState(empleado);

  useEffect(() => {
    setEmpleadoData(empleado);
  }, [empleado]);
  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleadoData((prevEmpleado) => ({
      ...prevEmpleado,
      [name]: value,
    }));
  };

  const handleSave = async () => { 
    if (!empleadoData.id) {
      console.error("No se pudo encontrar el ID del empleado");
      SweetAlert.fire("Error", "El ID del empleado es necesario", "error");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:3000/modificar-usuario/${empleadoData.id}`,
        empleadoData
      );
      
      SweetAlert.fire("Éxito", "El empleado fue actualizado correctamente", "success");
      fetchUsuarios();  
      handleClose(); 
    } catch (error) {
      SweetAlert.fire("Error", "Hubo un problema al actualizar el empleado", "error");
      console.error(error);
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre"
              value={empleadoData?.nombre || ""}
              name="nombre"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formApellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa los apellidos"
              value={empleadoData?.apellidos || ""}
              name="apellidos"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEdad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              value={empleadoData?.edad || ""}
              name="edad"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={empleadoData?.telefono || ""}
              name="telefono"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={empleadoData?.correo || ""}
              name="correo"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formUsuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              value={empleadoData?.usuario || ""}
              name="usuario"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEmpleadoModal;

