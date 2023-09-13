import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import TableContainer from "@mui/material/TableContainer"; // Import de Material-UI
import Table from "@mui/material/Table"; // Import de Material-UI
import TableBody from "@mui/material/TableBody"; // Import de Material-UI
import TableCell from "@mui/material/TableCell"; // Import de Material-UI
import TableHead from "@mui/material/TableHead"; // Import de Material-UI
import TableRow from "@mui/material/TableRow"; // Import de Material-UI
import TablePagination from "@mui/material/TablePagination"; // Import de Material-UI
import Paper from "@mui/material/Paper";

export default function DashboardLogs() {
  const baseUrl = "https://localhost:7151/api/logs";
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Estado para almacenar la información del usuario
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const peticionesGet = async () => {
    try {
      const response = await axios.get(baseUrl);

      if (response.status === 200) {
        const filteredData = response.data.filter((factura) => {
          const facturaDate = new Date(factura.fecha);
          const startDateObj = startDate ? new Date(startDate) : null;
          const endDateObj = endDate ? new Date(endDate) : null;

          if (startDateObj && endDateObj) {
            // Filtra por un rango de fechas si ambos valores están presentes
            return facturaDate >= startDateObj && facturaDate <= endDateObj;
          } else if (startDateObj) {
            // Filtra por fechas mayores o iguales a startDate si endDate no está presente
            return facturaDate >= startDateObj;
          } else if (endDateObj) {
            // Filtra por fechas menores o iguales a endDate si startDate no está presente
            return facturaDate <= endDateObj;
          }

          // Si no se establecen fechas de inicio ni fin, muestra todos los datos
          return true;
        });

        // Actualiza el estado 'data' con los datos filtrados
        setData(filteredData);
      } else {
        console.error("Error al obtener las facturas");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const mostrarModalCliente = async (gestor) => {
    try {
      const response = await axios.get(
        `https://localhost:7151/api/usuario/${gestor.idUsuario}`
      );

      if (response.status === 200) {
        console.log(response.data); // Depura la respuesta
        setUsuarioSeleccionado(response.data); // Almacena el objeto de usuario
        setModalVisible(true); // Muestra el modal
      } else {
        console.error("Error al obtener los detalles de la usuario");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
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
  }, [startDate, endDate]);

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
            <h3>Historial de acciones</h3>
            <br />
            <label>Desde:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>Hasta:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <br />
            <TableContainer component={Paper}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
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
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      ID
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Acción
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Tabla
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Registros cambiados
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Campo
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Valor Anterior
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Valor Actualizado
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Fecha
                    </TableCell>

                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Id Usuario
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(currentPage * perPage, (currentPage + 1) * perPage)
                    .map((gestor) => (
                      <TableRow key={gestor.idLogs}>
                        <TableCell>{gestor.idLogs}</TableCell>
                        <TableCell>{gestor.accion}</TableCell>
                        <TableCell>{gestor.tabla}</TableCell>
                        <TableCell>{gestor.registro}</TableCell>
                        <TableCell>{gestor.campo}</TableCell>
                        <TableCell>{gestor.valorAntes}</TableCell>
                        <TableCell>{gestor.valorDespues}</TableCell>
                        <TableCell>{gestor.fecha}</TableCell>

                        <TableCell>{gestor.idUsuario}</TableCell>
                        <TableCell>
                          <button
                            className="btn btn-success"
                            onClick={() => mostrarModalCliente(gestor)}
                          >
                            Ver Usuario
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

        {/* Modal para mostrar la información de la usuario */}
        <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {usuarioSeleccionado && (
              <div>
                <p>
                  ID de usuario: {usuarioSeleccionado.idUsuario}
                  <br />
                  Nombre: {usuarioSeleccionado.nombres}
                  <br />
                  Apellido: {usuarioSeleccionado.apellidos}
                  <br />
                  Correo: {usuarioSeleccionado.correo}
                  <br />
                </p>
              </div>
            )}
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
