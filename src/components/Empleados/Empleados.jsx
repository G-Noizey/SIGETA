// Empleado.jsx
import React, { useState } from 'react';
import TableEmpleados from './TableEmpleado'; // Asegúrate de importar el componente TableEmpleados

const Empleado = () => {
    const [empleados, setEmpleados] = useState([
        { nombre: 'Juan', apellidos: 'Pérez', edad: 30, telefono: '123456789', correo: 'juan@example.com' },
        { nombre: 'Ana', apellidos: 'García', edad: 25, telefono: '987654321', correo: 'ana@example.com' },
        { nombre: 'Pedro', apellidos: 'Martínez', edad: 40, telefono: '123987456', correo: 'pedro@example.com' },
    ]);

    // Función para editar empleado (puedes actualizar estos datos según sea necesario)
    const handleEdit = (empleado) => {
        console.log('Editar empleado', empleado);
        // Aquí puedes abrir un modal o llevar al usuario a un formulario para editar los datos PENDIENTE NO HACER
    };

    return (
        <div>
            <h2 style={{marginBottom: '40px'}}>Gestión de Empleados</h2>

            
            <TableEmpleados empleados={empleados} onEdit={handleEdit} />
        </div>
    );
};

export default Empleado;
