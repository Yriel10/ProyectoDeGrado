import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Footers from "../Componetes/Footers";
import { Image, Transformation } from "cloudinary-react";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

export default function Dashboard() {
  const baseUrl = "https://localhost:7151/api/usuario";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);

  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    idUsuario: "",
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    rol: "Usuario",
    fotoPerfil: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
    console.log(gestorSeleccionado);
  };

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
  const peticionesPost = async () => {
    delete gestorSeleccionado.idUsuario;
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
  const peticionesPut = async () => {
    await axios
      .put(baseUrl + "/" + gestorSeleccionado.idUsuario, gestorSeleccionado)
      .then((response) => {
        var respuesta = response.data;
        var dataAuxiliar = data;
        dataAuxiliar.map((gestor) => {
          if (gestor.idUsuario === gestorSeleccionado.idUsuario) {
            gestor.nombres = respuesta.nombres;
            gestor.apellidos = respuesta.apellidos;
            gestor.correo = respuesta.correo;
            gestor.contrasena = respuesta.contrasena;
            gestor.rol = respuesta.rol;
            gestor.fotoPerfil = respuesta.fotoPerfil;
          }
        });
        abrirCerrarModalEditar();
        peticionesGet();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const seleccionarGestor = (gestor, caso) => {
    setGestorSeleccionado(gestor);
    caso === "Editar" && abrirCerrarModalEditar();
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  useEffect(() => {
    peticionesGet();
  }, []);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    setPerPage(newPerPage);
    setCurrentPage(0); // Vuelve a la primera página cuando cambias las filas por página
  };

  ///////////////////////////////////////////////////////////////////////////////
  return (
    <div>
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
            Insertar nuevo usuario
          </button>
          <br />
          <br />
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
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Foto</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(currentPage * perPage, (currentPage + 1) * perPage)
                  .map((gestor) => (
                    <TableRow key={gestor.idUsuario}>
                      <TableCell>{gestor.idUsuario}</TableCell>
                      <TableCell>{gestor.nombres}</TableCell>
                      <TableCell>{gestor.apellidos}</TableCell>
                      <TableCell>{gestor.correo}</TableCell>
                      <TableCell>{gestor.rol}</TableCell>
                      <TableCell style={{ width: "250px", height: "250px" }}>
                        {gestor.fotoPerfil && (
                          <Image
                            cloudName="dxy6tbr7v"
                            publicId={gestor.fotoPerfil}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          >
                            <Transformation width="50" crop="scale" />
                          </Image>
                        )}
                      </TableCell>
                      <TableCell>
                        <button
                          className="btn btn-primary"
                          onClick={() => seleccionarGestor(gestor, "Editar")}
                        >
                          Editar
                        </button>
                        <button className="btn btn-danger">Eliminar</button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Modal show={modalInsertar}>
          <ModalHeader>Insertar nuevo usuario</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre</label>
              <br />
              <input
                type="texto"
                className="form-control "
                name="nombres"
                onChange={handleChange}
              />
              <br />
              <label>Apellido</label>
              <br />
              <input
                type="texto"
                className="form-control"
                name="apellidos"
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
              <label>Contraseña</label>
              <br />
              <input
                type="password"
                className="form-control"
                name="contrasena"
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
              Insertar
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
        <div>
          <Modal show={modalEditar}>
            <ModalHeader>Editar usuario</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID</label>
                <br />
                <input
                  type="texto"
                  className="form-control "
                  name="idUsuario"
                  readOnly
                  value={gestorSeleccionado && gestorSeleccionado.idUsuario}
                />
                <br />
                <label>Nombre</label>
                <br />
                <input
                  type="texto"
                  className="form-control "
                  name="nombres"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.nombres}
                />
                <br />
                <label>Apellido</label>
                <br />
                <input
                  type="texto"
                  className="form-control"
                  name="apellidos"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.apellidos}
                />
                <br />
                <label>Correo</label>
                <br />
                <input
                  type="texto"
                  className="form-control"
                  name="correo"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.correo}
                />
                <br />
                <label>Contraseña</label>
                <br />
                <input
                  type="password"
                  className="form-control"
                  name="contrasena"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.contrasena}
                />
                <br />
                <label>Rol</label>
                <br />
                <input
                  type="texto"
                  className="form-control"
                  name="rol"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.rol}
                />
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-primary"
                onClick={() => peticionesPut()}
              >
                Editar
              </button>
              {""}
              <button
                className="btn btn-danger"
                onClick={() => abrirCerrarModalEditar()}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
      <Footers />
    </div>
  );
}
