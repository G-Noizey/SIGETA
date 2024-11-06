// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar los componentes principales
import LoginGeneral from '../components/Login/LoginGeneral';
import Dashboard from '../components/Menu/Dashboard';
import Empleados from '../components/Empleados/Empleados'; 
import Productos from '../components/Productos/Productos';
import Cobrar from '../components/Cobrar/Cobrar';
import ProductosDef from '../components/ProductosDef/ProductosDef';
import ReporteVentas from '../components/ReporteVentas/ReporteVentas';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto al LoginGeneral */}
        <Route path="/" element={<LoginGeneral />} />
        
        {/* Ruta al Dashboard sin protección */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Ruta por defecto dentro del Dashboard */}
          <Route index element={<Empleados />} /> {/* Esto carga Empleados por defecto */}
          {/* Otras rutas dentro del Dashboard */}
          <Route path="empleados" element={<Empleados />} />
          {/* Puedes agregar más rutas de empleados aquí */}
          <Route path="productos" element={<Productos />} />
          <Route path="cobrar" element={<Cobrar />} />
          <Route path="productos-defectuosos" element={<ProductosDef />} />
          <Route path="reporte-ventas" element={<ReporteVentas />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
