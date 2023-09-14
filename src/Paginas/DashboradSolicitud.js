import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import TableContainer from "@mui/material/TableContainer"; // Import de Material-UI
import Table from "@mui/material/Table"; // Import de Material-UI
import TableBody from "@mui/material/TableBody"; // Import de Material-UI
import TableCell from "@mui/material/TableCell"; // Import de Material-UI
import TableHead from "@mui/material/TableHead"; // Import de Material-UI
import TableRow from "@mui/material/TableRow"; // Import de Material-UI
import TablePagination from "@mui/material/TablePagination"; // Import de Material-UI
import Paper from "@mui/material/Paper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function DashboardSolicitud() {
  const baseUrl = "https://localhost:7151/api/solicitud";
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Estado para almacenar la información del usuario
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [filtro, setFiltro] = useState("");
  const [mostrarNoAtendidos, setMostrarNoAtendidos] = useState(false); // Nuevo estado para controlar el filtro


  const peticionesGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionesPut = async (solicitud) => {
    try {
      solicitud.estado = "Completo"; // Asegúrate de establecer el estado en "completo" aquí

      const response = await axios.put(
        baseUrl + "/" + solicitud.idSolicitud,
        solicitud
      );
      if (response.status === 200) {
      } else {
        console.error("Error al actualizar la solicitud.");
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
    peticionesGet();
  };

  const peticionesPutincompleto = async (solicitud) => {
    try {
      solicitud.estado = "Incompleto"; // Asegúrate de establecer el estado en "completo" aquí

      const response = await axios.put(
        baseUrl + "/" + solicitud.idSolicitud,
        solicitud
      );
      if (response.status === 200) {
        peticionesGet();
      } else {
        console.error("Error al actualizar la solicitud.");
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
    peticionesGet();
  };

  const filtrarDatos = (datos, consulta) => {
    return datos.filter(
      (dato) =>
        dato.nombre.toLowerCase().includes(consulta.toLowerCase()) &&
        dato.estado !== "Eliminado"
    );
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
  const cookies = Cookies();
  const navigate = useNavigate();
  const roles = cookies.get("rol");
  useEffect(() => {
    if (roles === "Delivery") {
      navigate("/DashboardPedidos");
    }
  }, [roles, navigate]);
  useEffect(() => {
    peticionesGet();
  }, [filtro]);
  const asistenciasFiltradas = mostrarNoAtendidos
  ? data.filter((asistencia) => asistencia.estado === "Incompleto")
  : data;
  return (
    <div>
        <CloudinaryContext cloudName="dxy6tbr7v">
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
            <label>
              <input
                type="checkbox"
                checked={mostrarNoAtendidos}
                onChange={() => setMostrarNoAtendidos(!mostrarNoAtendidos)}
              />{" "}
              Mostrar Incompleto
            </label>
            <br />
            <TableContainer component={Paper}>
              <TablePagination
                rowsPerPageOptions={[1, 5, 10]}
                component="div"
                count={asistenciasFiltradas.length}
                rowsPerPage={perPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} // Esta línea se ha modificado
              />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>ID</TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Correo</TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Descripción</TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Receta</TableCell>
                     <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Id Usuario</TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Estado</TableCell>
          
        
                  </TableRow>
                </TableHead>
                <TableBody>
                {asistenciasFiltradas
                    .slice(currentPage * perPage, (currentPage + 1) * perPage)
                    .map((gestor) => (
                    <TableRow key={gestor.idSolicitud}>
                      <TableCell>{gestor.idSolicitud}</TableCell>
                      <TableCell>{gestor.correo}</TableCell>
                      <TableCell>{gestor.descripcion}</TableCell>
                      <TableCell style={{ width: "250px", height: "250px" }}>
                        {gestor.receta && (
                            <Image
                              publicId={gestor.foto}
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                            ></Image>
                          )}
                        
                        </TableCell>
                      <TableCell>{gestor.idUsuario}</TableCell>
                       <TableCell>{gestor.estado}</TableCell>
                      <TableCell>
                        <button
                          className="btn btn-success"
                          onClick={() => mostrarModalCliente(gestor)}
                        >
                          Ver Usuario
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => peticionesPut(gestor)}
                        >
                          Completado
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => peticionesPutincompleto(gestor)}
                        >
                          Incompleto
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
      </CloudinaryContext>
    </div>
  );
}
