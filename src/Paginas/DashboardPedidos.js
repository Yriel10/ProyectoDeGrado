import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import Modal from "react-bootstrap/Modal"; // Importa el componente Modal

export default function DashboardPedidos() {
  const baseUrl = "https://localhost:7151/api/pedidos";
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null); // Estado para almacenar la información de la factura seleccionada

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

  const peticionesPut = async (pedido) => {
    try {
      pedido.estado = "Completo";

      const response = await axios.put(baseUrl + "/" + pedido.idPedido, pedido);
      if (response.status === 200) {
      } else {
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
    peticionesGet();
  };

  const peticionesPutincompleto = async (pedido) => {
    try {
      pedido.estado = "Incompleto";

      const response = await axios.put(baseUrl + "/" + pedido.idPedido, pedido);
      if (response.status === 200) {
      } else {
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
    peticionesGet();
  };

  // Función para mostrar el modal con la información de la factura seleccionada
  const mostrarModalFactura = async (gestor) => {
    try {
      const response = await axios.get(
        `https://localhost:7151/api/FacturaDetalle/${gestor.idFactura}`
      );

      if (response.status === 200) {
        console.log(response.data); // Depura la respuesta
        setFacturaSeleccionada(response.data); // Almacena el objeto de factura
        setModalVisible(true); // Muestra el modal
      } else {
        console.error("Error al obtener los detalles de la factura");
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
                  <th>Lugar de entrega</th>
                  <th>Entregar a</th>
                  <th>Numero de factura</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((gestor) => (
                    <tr key={gestor.idPedido}>
                      <td>{gestor.idPedido}</td>
                      <td>{gestor.lugarEntrega}</td>
                      <td>{gestor.nombre}</td>
                      <td>{gestor.idFactura}</td>
                      <td>{gestor.estado}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => mostrarModalFactura(gestor)} // Llama a la función para mostrar el modal
                        >
                          Ver factura
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
