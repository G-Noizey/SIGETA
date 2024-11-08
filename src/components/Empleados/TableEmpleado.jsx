import React, { useState, useEffect, useMemo } from "react";
import { Table, Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { FaEdit, FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import AddEmpleadoModal from "./AddEmpleadoModal";
import EditEmpleadoModal from "../Empleados/EditEmpleadoModal";
import axios from "axios";
import SweetAlert from "sweetalert2";

const TableEmpleado = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [pageSize, setPageSizeState] = useState(5);
  const [data, setData] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/usuarios");
      const usuariosData = response.data.map((usuario) => ({
        id: usuario.idusuario,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        edad: usuario.edad,
        telefono: usuario.telefono,
        correo: usuario.correo,
        usuario: usuario.usuario,
        estado: usuario.estado === 1 ? "Activo" : "Inactivo",
      }));
      setData(usuariosData);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (empleado) => {
    const isInactive = empleado.estado === "Inactivo";
    const action = isInactive ? "activar" : "inactivar";
    const message = isInactive
      ? `¿Estás seguro de activar nuevamente la cuenta de ${empleado.usuario}?`
      : `¿Estás seguro de inactivar la cuenta de ${empleado.usuario}?`;

    try {
      const result = await SweetAlert.fire({
        title: "Confirmación",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "No, cancelar",
      });

      if (result.isConfirmed) {
        const response = await axios.put(
          `http://localhost:3000/modificar-estado/${empleado.id}`,
          {
            estado: isInactive ? 1 : 0,
          }
        );

        if (response.status === 200) {
          console.log("Estado actualizado en la base de datos");
          await SweetAlert.fire(
            "Éxito",
            `Cuenta ${action}da correctamente`,
            "success"
          );
          await fetchUsuarios();
        }
      }
    } catch (error) {
      SweetAlert.fire(
        "Error",
        "Hubo un problema al cambiar el estado de la cuenta",
        "error"
      );
      console.error("Error en el manejo de estado:", error);
    }
  };

  const columns = useMemo(
    () => [
      { Header: "Nombre(s)", accessor: "nombre" },
      { Header: "Apellidos", accessor: "apellidos" },
      { Header: "Edad", accessor: "edad" },
      { Header: "Teléfono", accessor: "telefono" },
      { Header: "Correo", accessor: "correo" },
      { Header: "Usuario", accessor: "usuario" },
      { Header: "Estado", accessor: "estado" },
      {
        Header: "Acciones",
        Cell: ({ row }) => (
          <>
            <Button variant="success" onClick={() => handleEdit(row.original)}>
              <FaEdit />
            </Button>
            <Button
              variant={row.original.estado === "Activo" ? "danger" : "secondary"}
              onClick={() => handleDelete(row.original)}
              style={{ marginLeft: "10px" }}
            >
              <FaTrash />
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize },
    },
    useGlobalFilter,
    usePagination
  );

  const { pageIndex } = state;

  const handleSearchChange = (e) => {
    const value = e.target.value || "";
    setGlobalFilter(value);
    setSearchInput(value);
  };

  const updatePageSize = (e) => {
    const newSize = Number(e.target.value);
    setPageSizeState(newSize);
    setPageSize(newSize);
  };

  const handleEdit = (empleado) => {
    setSelectedEmpleado(empleado);
    setShowEditModal(true);
  };

  return (
    <div>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ marginBottom: "30px", width: "12%" }}
      >
        Añadir
      </Button>

      <InputGroup className="mb-3" style={{ width: "300px", float: "right" }}>
        <FormControl
          placeholder="Buscar..."
          value={searchInput}
          onChange={handleSearchChange}
        />
      </InputGroup>

      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="pagination" style={{ float: "right", marginTop: "10px" }}>
        <Button
          variant="link"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FaArrowLeft />
        </Button>
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <Button
          variant="link"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FaArrowRight />
        </Button>
      </div>

      <div style={{ float: "left", marginTop: "10px" }}>
        <Form.Group controlId="formPageSize">
          <Form.Label>Filas por página: </Form.Label>
          <Form.Control
            as="select"
            value={pageSize}
            onChange={updatePageSize}
            style={{
              display: "inline-block",
              width: "auto",
              marginLeft: "10px",
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>

      <AddEmpleadoModal
        show={showModal}
        handleClose={handleClose}
        fetchUsuarios={fetchUsuarios}
      />

      <EditEmpleadoModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        empleado={selectedEmpleado}
        fetchUsuarios={fetchUsuarios}
      />
    </div>
  );
};

export default TableEmpleado;
