import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const AddProductoModal = ({ show, handleClose, updateProductos }) => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [marca, setMarca] = useState("");

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/marcas");
        setMarcas(response.data);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };

    if (show) {
      fetchMarcas();
    }
  }, [show]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result.split(",")[1]);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombreLowerCase = nombre.toLowerCase();

    try {
      const response = await axios.get("http://localhost:3000/productos");
      const productos = response.data;
      const nombreExistente = productos.some(
        (producto) => producto.nombre.toLowerCase() === nombreLowerCase
      );

      if (nombreExistente) {
        Swal.fire({
          icon: "error",
          title: "Nombre duplicado",
          text: "El nombre del producto ya existe. Por favor elige otro nombre.",
        });
        return;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al verificar los nombres de productos.",
      });
      console.error("Error al verificar nombres de productos:", error);
      return;
    }

    const marcaNumerica = marca ? Number(marca) : 0;

    if (!marca || isNaN(marcaNumerica) || marcaNumerica === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor selecciona una marca válida.",
      });
      return;
    }

    const ultimafechasurtido = new Date().toISOString().split("T")[0];

    try {
      const response = await axios.post(
        "http://localhost:3000/productos/producto",
        {
          nombre,
          tipo,
          cantidad: cantidad || null,
          precio: precio || null,
          descripcion: descripcion || null,
          imagen,
          ultimafechasurtido,
          marca: marcaNumerica,
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Producto agregado correctamente",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          handleClose();
          setNombre("");
          setTipo("");
          setCantidad("");
          setPrecio("");
          setDescripcion("");
          setImagen(null);
          setMarca("");
          updateProductos();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data.message ||
          "Hubo un error al agregar el producto",
      });
      console.error("Error al agregar el producto:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre Producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              minLength={3}
              maxLength={30}
            />
          </Form.Group>

          <Form.Group controlId="formTipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el tipo de producto"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              minLength={3}
            />
          </Form.Group>

          <Form.Group controlId="formCantidad">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese la cantidad en unidades"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              min="1"
              max="10000"
              step="1"
            />
          </Form.Group>

          <Form.Group controlId="formPrecio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Ingrese el precio por unidad"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              min="0.01"
              max="10000"
            />
          </Form.Group>

          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese una descripción (opcional)"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              maxLength={200}
            />
          </Form.Group>

          <Form.Group controlId="formMarca">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              as="select"
              value={marca || ""}
              onChange={(e) => setMarca(e.target.value)}
              required
            >
              <option value="">Seleccione una marca</option>
              {marcas.map((marca) => (
                <option key={marca.idmarca} value={marca.idmarca}>
                  {marca.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formImagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          <Button variant="success" type="submit" style={{ marginTop: "20px" }}>
            Confirmar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductoModal;
