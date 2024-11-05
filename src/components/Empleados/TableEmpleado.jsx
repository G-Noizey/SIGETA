// src/components/Empleados/TableEmpleado.jsx
import React, { useState, useMemo } from 'react';
import { Table, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { FaEdit, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AddEmpleadoModal from './AddEmpleadoModal';

// Datos de ejemplo (puedes reemplazarlo con datos reales)
const data = [
    { nombre: 'Ejemplo Nombre', apellidoPaterno: 'Apellido Paterno', apellidoMaterno: 'Apellido Materno', edad: 30, telefono: '1234567890', correo: 'ejemplo@correo.com' },
    // Agrega más datos según sea necesario
];

const TableEmpleado = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [pageSize, setPageSizeState] = useState(5); // Estado para el tamaño de página

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const columns = useMemo(
        () => [
            { Header: 'Nombre', accessor: 'nombre' },
            { Header: 'Apellido Paterno', accessor: 'apellidoPaterno' },
            { Header: 'Apellido Materno', accessor: 'apellidoMaterno' },
            { Header: 'Edad', accessor: 'edad' },
            { Header: 'Teléfono', accessor: 'telefono' },
            { Header: 'Correo', accessor: 'correo' },
            {
                Header: 'Acciones',
                Cell: () => (
                    <Button variant="success">
                        <FaEdit />
                    </Button>
                )
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
        setPageSize, // Ajuste de tamaño de página de react-table
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize }, // Tamaño de página inicial
        },
        useGlobalFilter,
        usePagination
    );

    const { pageIndex } = state;

    const handleSearchChange = (e) => {
        const value = e.target.value || '';
        setGlobalFilter(value); // Establece el filtro global de react-table
        setSearchInput(value);
    };

    const updatePageSize = (e) => {
        const newSize = Number(e.target.value);
        setPageSizeState(newSize); // Actualiza el estado local
        setPageSize(newSize);      // Ajusta el tamaño en react-table
    };

    return (
        <div>
            <Button variant="success" onClick={handleShow} style={{ marginBottom: '30px', width: '12%' }}>
                Añadir
            </Button>

            {/* Input para el buscador */}
            <InputGroup className="mb-3" style={{ width: '300px', float: 'right' }}>
                <FormControl
                    placeholder="Buscar..."
                    value={searchInput}
                    onChange={handleSearchChange}
                />
            </InputGroup>

            <Table striped bordered hover {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {/* Controles de paginación */}
            <div className="pagination" style={{ float: 'right', marginTop: '10px' }}>
                <Button variant="link" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <FaArrowLeft />
                </Button>
                <span>
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>{' '}
                </span>
                <Button variant="link" onClick={() => nextPage()} disabled={!canNextPage}>
                    <FaArrowRight />
                </Button>
            </div>

            {/* Selector de cantidad de datos por página */}
            <div style={{ float: 'left', marginTop: '10px' }}>
                <Form.Group controlId="formPageSize">
                    <Form.Label>Filas por página: </Form.Label>
                    <Form.Control
                        as="select"
                        value={pageSize}
                        onChange={updatePageSize}
                        style={{ display: 'inline-block', width: 'auto', marginLeft: '10px' }}
                    >
                        {[5, 10, 20, 30, 40, 50].map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </div>

            <AddEmpleadoModal show={showModal} handleClose={handleClose} />
        </div>
    );
};

export default TableEmpleado;
