import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png"; // Asegúrate de que la ruta sea correcta según la estructura de tu proyecto
import axios from "axios";
import Swal from "sweetalert2";

const LoginGeneral = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/usuarios/login", {
        usuario,
        contrasena,
      });
  
      if (response.status === 200) {
        const { rol } = response.data; 
  
      
        sessionStorage.setItem("usuario", usuario);
        sessionStorage.setItem("rol", rol);
  
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "/dashboard";
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data.message || "Error en el inicio de sesión",
      });
    }
  };
  

  const formStyles = {
    width: "400px",
    fontFamily: "Roboto, sans-serif",
  };

  const inputStyles = {
    fontFamily: "Roboto, sans-serif",
    height: "50px",
    marginBottom: "20px",
  };

  const buttonStyles = {
    width: "100%",
    height: "50px",
    backgroundColor: "#3C964D",
    borderColor: "#3C964D",
    fontFamily: "Roboto, sans-serif",
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh", fontFamily: "Roboto, sans-serif" }}
    >
      <div className="text-center">
        {/* Logo en la parte superior */}
        <img
          src={logo}
          alt="Logo"
          style={{ width: "200px", marginBottom: "20px" }}
        />{" "}
        {/* Ajusta el tamaño según sea necesario */}
        <Form style={formStyles}>
          <Form.Group controlId="formUsuario">
            <Form.Label style={{ marginRight: "260px" }}>
              Correo Electrónico:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su correo"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              style={inputStyles} // Aplicando estilos a los inputs
            />
          </Form.Group>

          <Form.Group controlId="formContrasena">
            <Form.Label style={{ marginRight: "400px" }}>
              Contraseña:
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={inputStyles} // Aplicando estilos a los inputs
            />
          </Form.Group>

          <Link
            style={{
              color: "black",
              fontFamily: "Roboto, sans-serif",
              display: "block",
              marginBottom: "20px",
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <Link>
            <Button
              variant="primary"
              style={buttonStyles}
              onClick={handleLogin}
            >
              Confirmar
            </Button>
          </Link>

          {error && (
            <Alert variant="danger" style={{ marginTop: "20px" }}>
              {error}
            </Alert>
          )}
        </Form>
      </div>
    </div>
  );
};

export default LoginGeneral;
