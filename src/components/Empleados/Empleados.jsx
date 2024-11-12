//Empleados.jsx
import React, { useState, useEffect } from "react";
import TableEmpleados from "../Empleados/TableEmpleado"; 
import EditEmpleadoModal from "../Empleados/EditEmpleadoModal"; 
import axios from "axios";

const Empleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null); 
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usuarios/api/usuarios");
        setEmpleados(response.data);
      } catch (error) {
        console.error("Error al obtener los empleados", error);
      }
    };

    fetchEmpleados();
  }, []);

  
  const handleEdit = (empleado) => {
    setSelectedEmpleado(empleado);
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedEmpleado(null); 
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usuarios/api/usuarios");
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error al obtener los empleados", error);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "40px" }}>Gestión de Empleados</h2>

      <TableEmpleados empleados={empleados} onEdit={handleEdit} /> 

      <EditEmpleadoModal
        show={showModal}
        handleClose={handleCloseModal}
        selectedEmpleado={selectedEmpleado} 
        fetchUsuarios={fetchUsuarios} 
      />
    </div>
  );
};

export default Empleado;

