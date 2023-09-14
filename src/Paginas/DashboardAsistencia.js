import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import Modal from "react-bootstrap/Modal";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function DashboardAsistencia() {
  const baseUrl = "https://localhost:7151/api/asistencias";
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [filtro, setFiltro] = useState("");
  const [mostrarNoAtendidos, setMostrarNoAtendidos] = useState(false); // Nuevo estado para controlar el filtro

  const peticionesGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        const datosFiltrados = filtrarDatos(response.data, filtro);
        setData(datosFiltrados);
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
      const response = await axios.put(
        baseUrl + "/" + asistencia.idAsistencia,
        asistencia
      );
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
      const response = await axios.put(
        baseUrl + "/" + asistencia.idAsistencia,
        asistencia
      );
      if (response.status === 200) {
      } else {
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
    peticionesGet();
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    setPerPage(newPerPage);
    setCurrentPage(0);
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
  }, [filtro]); // Agregar filtro a las dependencias del efecto

  // Filtrar las asistencias "No Atendidas" si el estado mostrarNoAtendidos está habilitado
  const asistenciasFiltradas = mostrarNoAtendidos
    ? data.filter((asistencia) => asistencia.estado === "No Atendido")
    : data;

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
            <label>
              <input
                type="checkbox"
                checked={mostrarNoAtendidos}
                onChange={() => setMostrarNoAtendidos(!mostrarNoAtendidos)}
              />{" "}
              Mostrar No Atendidos
            </label>
            <TableContainer component={Paper}>
              <TablePagination
                rowsPerPageOptions={[1, 5, 10]}
                component="div"
                count={asistenciasFiltradas.length}
                rowsPerPage={perPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      ID
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Telefono
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Nombre
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Estado
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asistenciasFiltradas
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
      </div>
    </div>
  );
}
