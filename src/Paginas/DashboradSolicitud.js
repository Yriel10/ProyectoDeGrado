import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";

export default function DashboardSolicitud() {
  const baseUrl = "https://localhost:7151/api/solicitud";
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Estado para almacenar la información del usuario

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
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Correo</th>
                  <th>Descripción</th>
                  <th>Receta</th>
                   <th>Id Usuario</th>
                  <th>Estado</th>
                 
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((gestor) => (
                    <tr key={gestor.idSolicitud}>
                      <td>{gestor.idSolicitud}</td>
                      <td>{gestor.correo}</td>
                      <td>{gestor.descripcion}</td>
                      <td>{gestor.receta}</td>
                      <td>{gestor.idUsuario}</td>
                       <td>{gestor.estado}</td>
                      <td>
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
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
