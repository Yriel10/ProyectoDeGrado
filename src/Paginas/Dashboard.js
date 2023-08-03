import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import "../Assest/Sidebar.css";

export default function Dashboard() {
  const baseUrl = "https://localhost:7151/api/usuario";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    idUsuario: "",
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    rol: "Usuario",
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
          }
        });
        abrirCerrarModalEditar();
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
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((gestor) => (
                  <tr key={gestor.idUsuario}>
                    <td>{gestor.idUsuario}</td>
                    <td>{gestor.nombres}</td>
                    <td>{gestor.apellidos}</td>
                    <td>{gestor.correo}</td>
                    <td>{gestor.rol}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => seleccionarGestor(gestor, "Editar")}
                      >
                        Editar
                      </button>
                      {""}
                      <button className="btn btn-danger">Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
                  name="nombres"
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
                  type="tecto"
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
