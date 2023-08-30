import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import Modal from "react-bootstrap/Modal"; // Importa el componente Modal

export default function DashboardFacturas() {
  const baseUrl = "https://localhost:7151/api/facturas";
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null); // Estado para almacenar la información de la factura seleccionada
  const [totalFacturas, setTotalFacturas] = useState(0);


  const peticionesGet = async () => {
    try {
      const response = await axios.get(baseUrl);
  
      if (response.status === 200) {
        setData(response.data);
  
        // Calcular el total sumando los totales de las facturas
        const total = response.data.reduce(
          (accumulator, factura) => accumulator + factura.total,
          0
        );
  
        setTotalFacturas(total); // Establecer el total en el estado
      } else {
        console.error("Error al obtener las facturas");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
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
          <br />
          <h3>Total: ${totalFacturas}</h3>
          <br />
          <a href="https://dashboard.stripe.com/"><button className="btn btn-primary" >Ver detalles de pagos </button></a>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Usuario ID</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((gestor) => (
                  <tr key={gestor.idFactura}>
                    <td>{gestor.idFactura}</td>
                    <td>{gestor.fecha}</td>
                    <td>{gestor.idUsuario}</td>
                    <td>${gestor.total}</td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-success"
                        onClick={() => mostrarModalFactura(gestor)} // Llama a la función para mostrar el modal
                      >
                        Ver factura
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footers />
      <div>
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
