// Dashboard.jsx
import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { FaSignOutAlt, FaUser, FaBox, FaClipboardList, FaExclamationTriangle, FaChartLine } from 'react-icons/fa'; // Importando iconos
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/Logo.png'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const Dashboard = () => {
    const rol = sessionStorage.getItem("rol");
    const navLinks = [
        ...(rol === "1" ? [{ path: 'empleados', label: 'Empleados', icon: <FaUser /> }] : []),
        { path: 'productos', label: 'Productos', icon: <FaBox /> },
        { path: 'cobrar', label: 'Cobrar', icon: <FaClipboardList /> },
        ...(rol === "1" ? [
          { path: 'productos-defectuosos', label: 'Productos defectuosos', icon: <FaExclamationTriangle /> },
          { path: 'reporte-ventas', label: 'Reporte de ventas', icon: <FaChartLine /> }
        ] : [])
      ];
    

    const handleLogout = () => {
        sessionStorage.removeItem("usuario");
        sessionStorage.removeItem("rol");
        window.location.href = "/";
      };
      

    return (
        <div style={{ fontFamily: 'Roboto, sans-serif' }}> {/* Aplica la fuente Roboto a todo el componente */}
            {/* Barra de navegación */}
            <Navbar bg="light" variant="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand style={{ fontFamily: 'Roboto, sans-serif', marginLeft: '100px' }}>SIGETA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={handleLogout} className="nav-link logout-link">
                                <FaSignOutAlt style={{ marginRight: '20px' }} /> Cerrar sesión
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Contenido principal */}
            <Container fluid>
                <Row>
                    {/* Sidebar */}
                    <Col md={2} className="bg-light sidebar">
                        <div className="text-center my-3">
                            <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '30px' }} />
                        </div>
                        <Nav className="flex-column">
                            {navLinks.map((link, index) => (
                                <Link style={{ marginLeft: '40px' }}  to={link.path} className="nav-link" key={index}>
                                    {link.icon} {link.label}
                                </Link>
                            ))}
                        </Nav>
                    </Col>

                    {/* Contenido dinámico */}
                    <Col md={10} className="main-content" style={{ padding: '30px' }}>
                        <Outlet /> {/* Este outlet renderiza el contenido dinámico */}
                    </Col>
                </Row>
            </Container>

            {/* Estilos personalizados */}
            <style>{`
                .sidebar {
                    position: relative;
                    height: 100vh;
                    padding: 20px;
                    background-color: #f8f9fa;
                }
                .nav-link {
                    color: black;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    transition: background-color 0.5s ease;
                    font-family: 'Roboto'; /* Mantener Ropa Sans en los enlaces */
                    border-radius: 15px;
                }
                .nav-link:hover {
                    background-color: #286B22;
                    color: white;
                    border-radius: 15px;
                }
                .logout-link {
                    transition: none;
                }
                .logout-link:hover {
                    background-color: transparent;
                    color: black;
                }
                .nav-link svg {
                    margin-right: 20px;
                    border-radius: 15px;
                }
            `}</style>
        </div>
    );
}

export default Dashboard;
