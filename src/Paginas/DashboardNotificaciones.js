import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";


export default function DashboardNotificaciones() {
  const baseUrl = "https://localhost:7151/api/notificaciones";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);

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
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  useEffect(() => {
    peticionesGet();
  }, []);
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
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Correo</th>
              <th>Mensaje</th>

            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((gestor) => (
                <tr key={gestor.idNotificaciones}>
                  <td>{gestor.idNotificaciones}</td>
                  <td>{gestor.correo}</td>
                  <td>{gestor.descripcion}</td>

           
                </tr>
              ))}
          </tbody>
        </table>
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
