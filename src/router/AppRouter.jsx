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
import ProtectedRoute from '../router/ProtectedRoute';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto al LoginGeneral */}
        <Route path="/" element={<LoginGeneral />} />

        {/* Ruta protegida para el Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} allowedRoles={["0", "1"]} />}>
        <Route index element={<ProtectedRoute element={Productos} allowedRoles={["0", "1"]} />} />
          <Route element={<ProtectedRoute element={Empleados} allowedRoles={["1"]} />} /> 
          <Route path="empleados" element={<ProtectedRoute element={Empleados} allowedRoles={["1"]} />} />
          <Route path="productos" element={<ProtectedRoute element={Productos} allowedRoles={["0", "1"]} />} />
          <Route path="cobrar" element={<ProtectedRoute element={Cobrar} allowedRoles={["0", "1"]} />} />
          <Route path="productos-defectuosos" element={<ProtectedRoute element={ProductosDef} allowedRoles={["1"]} />} />
          <Route path="reporte-ventas" element={<ProtectedRoute element={ReporteVentas} allowedRoles={["1"]} />} />
        </Route>
      </Routes>
    </Router>
  );
};


export default AppRouter;
