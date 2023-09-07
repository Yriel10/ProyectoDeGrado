import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import Modal from "react-bootstrap/Modal"; // Importa el componente Modal
import TableContainer from "@mui/material/TableContainer"; // Import de Material-UI
import Table from "@mui/material/Table"; // Import de Material-UI
import TableBody from "@mui/material/TableBody"; // Import de Material-UI
import TableCell from "@mui/material/TableCell"; // Import de Material-UI
import TableHead from "@mui/material/TableHead"; // Import de Material-UI
import TableRow from "@mui/material/TableRow"; // Import de Material-UI
import TablePagination from "@mui/material/TablePagination"; // Import de Material-UI
import Paper from "@mui/material/Paper";

export default function DashboardAsistencia() {
  const baseUrl = "https://localhost:7151/api/asistencias";
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null); // Estado para almacenar la información de la factura seleccionada
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [filtro, setFiltro] = useState("");

 const peticionesGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        const datosFiltrados = filtrarDatos(response.data, filtro);
        setData(datosFiltrados); // Actualiza el estado de datos con los datos filtrados
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filtrarDatos = (datos, consulta) => {
    return datos.filter((dato) =>
      dato.nombre.toLowerCase().includes(consulta.toLowerCase())
    );
  };

  const peticionesPut = async (asistencia) => {
    try {
      asistencia.estado = "Atendido";

      const response = await axios.put(baseUrl + "/" + asistencia.idAsistencia, asistencia);
      if (response.status === 200) {
      } else {
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
    peticionesGet();
  };

  const peticionesPutincompleto = async (asistencia) => {
    try {
      asistencia.estado = "No Atendido";

      const response = await axios.put(baseUrl + "/" + asistencia.idAsistencia, asistencia);
      if (response.status === 200) {
      } else {
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
    peticionesGet();
  };

  // Función para mostrar el modal con la información de la factura seleccionada


const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    setPerPage(newPerPage);
    setCurrentPage(0); // Vuelve a la primera página cuando cambias las filas por página
  };

  useEffect(() => {
    peticionesGet();
  }, []);

  return (
    <div>
      <div>
        <div>
          <Menu />
        </div>
        <div className="flex">
          <MenuDasbohard />

          <div className="content">
            <br />
            <br />
            <br />
            <br />
            <TableContainer component={Paper}>
              <TablePagination
                rowsPerPageOptions={[1, 5, 10]}
                component="div"
                count={data.length}
                rowsPerPage={perPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} // Esta línea se ha modificado
              />
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>ID</TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Telefono</TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Nombre</TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Estado</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data
                    .slice(currentPage * perPage, (currentPage + 1) * perPage)
                    .map((gestor) => (
                    <TableRow key={gestor.idAsistencia}>
                      <TableCell>{gestor.idAsistencia}</TableCell>
                      <TableCell>{gestor.numeroTelefono}</TableCell>
                      <TableCell>{gestor.nombre}</TableCell>
                      <TableCell>{gestor.estado}</TableCell>
                      <TableCell>
                        <button
                          className="btn btn-primary"
                          onClick={() => peticionesPut(gestor)}
                        >
                          Atendido
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => peticionesPutincompleto(gestor)}
                        >
                          No Atendido
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
             </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <Footers />

        {/* Modal para mostrar la información de la factura */}
        <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de la Factura</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {facturaSeleccionada &&
              facturaSeleccionada.map((factura, index) => (
                <div key={index}>
                  <p>
                    ID de Factura: {factura.idFactura}
                    <br />
                    Detalles: {factura.nombreProducto}
                    <br />
                    Cantidad: {factura.cantidad}
                    <br />
                    Precio: {factura.precio}
                    <br />
                    Total: {factura.total}
                  </p>
                </div>
              ))}
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={() => setModalVisible(false)}
            >
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
