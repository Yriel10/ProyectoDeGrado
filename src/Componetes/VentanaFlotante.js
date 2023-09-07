import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiMessage } from '@mdi/js';
import "../Assest/VentanaFlotante.css"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import axios from "axios";

export default function VentanaFlotante() {
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    nombre: "",
    estado: "no atendido",
    numeroTelefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
  };

  const baseUrl = "https://localhost:7151/api/asistencias";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);

  const peticionesPost = async () => {
    try {
      await axios
        .post(baseUrl, gestorSeleccionado)
        .then((response) => {
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  return (
    <div>
      <button onClick={abrirCerrarModalInsertar} className="btn-flotante">
        <Icon path={mdiMessage} size={1} /> Asistencia
      </button>

      <div>
        <Modal show={modalInsertar}>
          <ModalHeader>Por favor digite su nombre y número telefónico para iniciar una conversación.</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={handleChange}
              />
              <br />
              <label>Telefono</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="numeroTelefono"
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionesPost()}>
              Iniciar
            </button>{" "}
       
            <button
              className="btn btn-danger"
              onClick={abrirCerrarModalInsertar} // Invoca abrirCerrarModalInsertar
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
