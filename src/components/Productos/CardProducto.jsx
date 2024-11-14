import React from "react";
import { Card, Badge } from "react-bootstrap";
import { FaEdit, FaEye, FaExclamationTriangle } from "react-icons/fa";

const CardProducto = ({ producto }) => {
  const {
    nombre,
    precio,
    estado,
    imagen,
    cantidad,
    precioporkilo,
    gramos,
    esabarrote,
    codigo,
  } = producto;

  const displayStock = esabarrote ? gramos : cantidad;
  const displayPrecio = esabarrote ? precioporkilo : precio;

  const badgeColor =
    (esabarrote === 1 && displayStock < 201) ||
    (esabarrote === 0 && displayStock < 21)
      ? "danger"
      : "success";

  return (
    <Card style={{ width: "200px", position: "relative" }}>
      <Badge
        pill
        bg={badgeColor}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "0.8em",
          padding: "5px 10px",
          borderRadius: "50%",
        }}
      >
        {esabarrote === 1 ? `${displayStock} g` : `${displayStock} U`}
      </Badge>
      <Card.Img
        variant="top"
        src={imagen || "default-image.jpg"}
        style={{ height: "150px", objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>
          <strong>Precio:</strong> ${displayPrecio}
          <br />
          <strong>Estado:</strong> {estado === 1 ? "Activo" : "Inactivo"}
          <br />
          <strong>#</strong>
          {codigo}
        </Card.Text>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "5px",
          }}
        >
          <FaEdit style={{ cursor: "pointer" }} title="Editar" />
          <FaEye style={{ cursor: "pointer" }} title="Ver" />
          <FaExclamationTriangle
            style={{ cursor: "pointer", color: "red" }}
            title="Alerta"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProducto;
