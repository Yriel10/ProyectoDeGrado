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
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";


export default function DashboardNotificaciones() {
  const baseUrl = "https://localhost:7151/api/notificaciones";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [filtro, setFiltro] = useState("");
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    descripcion: "",
    correo: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
    console.log(gestorSeleccionado);
  };
  const peticionesPost = async () => {
    delete gestorSeleccionado.id;
    await axios
      .post(baseUrl, gestorSeleccionado)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

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
      dato.correo.toLowerCase().includes(consulta.toLowerCase())
    );
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
  }, [filtro]);

  const cookies = new Cookies();
  const navigate = useNavigate();
  const roles = cookies.get("rol");
  useEffect(() => {
    if (roles === "Delivery") {
      navigate("/DashboardPedidos");
    }
  }, [roles, navigate]);
  return (
    <div><div>
    <div>
      <Menu />
    </div>
    <div className="flex">
      <MenuDasbohard />

      <div className="content">
        <br />
        <br />
        <button
              onClick={() => abrirCerrarModalInsertar()}
              className="btn btn-success"
            >
              Enviar Notificacion
            </button>
        <br />

        <br />
        <input
              type="text"
              className="form-control"
              placeholder="Buscar por correo..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
        <TableContainer component={Paper}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
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
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Correo</TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Mensaje</TableCell>

              </TableRow>
                </TableHead>
                <TableBody>
                {data
                    .slice(currentPage * perPage, (currentPage + 1) * perPage)
                    .map((gestor) => (
                <TableRow key={gestor.idNotificaciones}>
                  <TableCell >{gestor.idNotificaciones}</TableCell>
                  <TableCell >{gestor.correo}</TableCell>
                  <TableCell >{gestor.descripcion}</TableCell>
                  </TableRow>
                    ))}
                </TableBody>
                </Table>
                </TableContainer>
      </div>
      </div>
  <div>
  <Modal show={modalInsertar}>
          <ModalHeader>Enviar Mensaje</ModalHeader>
          <ModalBody>
            <div className="form-group">
             
              <label>Mensaje</label>
              <br />
              <input
                type="texto"
                className="form-control"
                name="descripcion"
                onChange={handleChange}
              />
              <br />
              <label>Correo</label>
              <br />
              <input
                type="texto"
                className="form-control"
                name="correo"
                onChange={handleChange}
              />
              <br />
             
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={() => peticionesPost()}
            >
              Enviar
            </button>
            {""}
            <button
              className="btn btn-danger"
              onClick={() => abrirCerrarModalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
  </div>
    <Footers />
  </div></div>
  )
}
