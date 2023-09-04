import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import Footers from "../Componetes/Footers";
import IMG from "../Assest/imagenes/nombreFarmaciasinfondo.png";
import Cookies from "universal-cookie";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfFactura from "./PdfFactura";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";

export default function Facturacion() {
  const cookies = new Cookies();
  const nombres = cookies.get("nombres");
  const apellidos = cookies.get("apellidos");
  const idUsuario = cookies.get("id");
  const carrito = JSON.parse(localStorage.getItem("dataCarrito"));
  const total = JSON.parse(localStorage.getItem("cartTotal"));
  const fechaActual = new Date();
  const day = fechaActual.getDate();
  const month = fechaActual.getMonth() + 1;
  const year = fechaActual.getFullYear();
  const formattedDate = `${day < 10 ? "0" : ""}${day}/${
    month < 10 ? "0" : ""
  }${month}/${year}`;
  const urlFactura = "https://localhost:7151/api/facturas"; //
  const urlDetalle = "https://localhost:7151/api/detalles"; //
  const baseUrl = "https://localhost:7151/api/pedidos";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [facturaCreated, setFacturaCreated] = useState(false);
  const [idFactura, setIdFactura] = useState(null);
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    nombre: "",
    lugarEntrega: "",
    estado: "incompleto",
    idFactura: "",
  });
  // Función para crear la factura
  const createFactura = async () => {
    try {
      const response = await axios.post(urlFactura, {
        fecha: fechaActual,
        idUsuario: idUsuario,
        total: total,
      });

      // Verifica si la factura se creó correctamente
      if (response.status === 201) {
        setFacturaCreated(true);
        setIdFactura(response.data.idFactura); // Almacena el idFactura en el estado
      } else {
        console.error("Error al crear la factura.");
      }
    } catch (error) {
      console.error("Error al crear la factura:", error);
    }
  };

  // Función para crear los detalles de la factura
  const createDetalles = async () => {
    try {
      // Itera sobre los elementos del carrito y envía los detalles
      for (const item of carrito) {
        const detalleData = {
          nombreProducto: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          idFactura: idFactura, // Utiliza el idFactura obtenido anteriormente
          idUsuario: idUsuario,
        };

        const response = await axios.post(urlDetalle, detalleData); // Corregido aquí

        if (response.status === 201) {
          console.log("Detalles creados correctamente.");
        } else {
          console.error("Error al crear los detalles de la factura.");
        }
      }
    } catch (error) {
      console.error("Error al crear los detalles de la factura:", error);
    }
  };

  const peticionesPost = async () => {
    // Asegúrate de que idFactura tiene un valor válido
    if (idFactura !== null) {
      // Convierte idFactura en una cadena (string)
      const idFacturaString = idFactura.toString();

      // Agrega idFactura al objeto gestorSeleccionado
      gestorSeleccionado.idFactura = idFacturaString;

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
    } else {
      console.error("idFactura es nulo o inválido.");
    }
  };
  const updateMedicamentoCantidad = async (nombreProducto, cantidad) => {
    try {
      const response = await axios.put(`https://localhost:7151/api/Medicamento/ActualizarCantidad?nombreProducto=${nombreProducto}&cantidad=${cantidad}`);


        if (response.status === 204) {
            console.log(`Cantidad de ${nombreProducto} actualizada correctamente.`);
        } else if (response.status === 400) {
            console.error(`Error al actualizar la cantidad de ${nombreProducto}: Cantidad inválida.`);
        } else if (response.status === 404) {
            console.error(`Error al actualizar la cantidad de ${nombreProducto}: Medicamento no encontrado.`);
        } else {
            console.error(`Error al actualizar la cantidad de ${nombreProducto}.`);
        }
    } catch (error) {
        console.error(`Error al actualizar la cantidad de ${nombreProducto}:`, error);
    }
};

  
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
    console.log(gestorSeleccionado);
  };

  // Efecto que se ejecuta inmediatamente después de cargar la página
  useEffect(() => {
    createFactura(); // Crea la factura
  }, []); // El arreglo vacío [] asegura que el efecto se ejecute solo una vez al cargar la página

  // Efecto que se ejecuta cuando la factura se crea correctamente
  useEffect(() => {
    if (facturaCreated && idFactura) {
      createDetalles(); // Crea los detalles de la factura
  
      // Actualiza la cantidad de medicamentos en la tabla Medicamento
      for (const item of carrito) {
        updateMedicamentoCantidad(item.nombre, item.cantidad);
      }
    }
  }, [facturaCreated, idFactura]);
  
  return (
    <div>
      <div>
        <Menu />
      </div>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              <h1>
                <img alt="" src={IMG} width={70} /> Jehova Rapha{" "}
              </h1>
            </div>
            <div className="col-xs-6 text-right">
              <div className="panel panel-default">
                <div className="panel-heading"></div>
                <div className="panel-body">
                  <h4>FACTURA:{idFactura}</h4>
                </div>
              </div>
            </div>

            <hr />

            <h1 style={{ textAlign: "center" }}>FACTURA</h1>

            <div className="row">
              <div className="col-xs-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4>Fecha:{formattedDate}</h4>
                  </div>
                  <div className="panel-body">
                    <h4>Comprador :{nombres + " " + apellidos}</h4>
                  </div>
                </div>
              </div>
            </div>
            <pre></pre>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    <h4>Cantidad</h4>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <h4>Concepto</h4>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <h4>Precio unitario</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Mapea los elementos del carrito y muestra la información */}
                {carrito.map((item) => (
                  <tr key={item.idMedicamento}>
                    <td style={{ textAlign: "center" }}>{item.cantidad}</td>
                    <td style={{ textAlign: "center" }}>{item.nombre}</td>
                    <td className=" text-right" style={{ textAlign: "center" }}>
                      ${item.precio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total:{total}</h3>

            <div className="row">
              <div className="col-xs-4">
                <h1>
                  <a href=" ">
                    <img alt="" src="image/qr.png" />
                  </a>
                </h1>
              </div>
              <div className="col-xs-8">
                <div
                  className="panel panel-info"
                  style={{ textAlign: "right" }}
                >
                  <h6>
                    {" "}
                    "LA ALTERACI&Oacute;N, FALSIFICACI&Oacute;N O
                    COMERCIALIZACI&Oacute;N ILEGAL DE ESTE DOCUMENTO ESTA PENADO
                    POR LA LEY"
                  </h6>
                </div>
                <PDFDownloadLink document={<PdfFactura />}>
                  <button className="btn btn-primary">Descargar Factura</button>
                </PDFDownloadLink>

                <button
                  className="btn btn-success"
                  onClick={() => abrirCerrarModalInsertar()}
                >
                  Entrega
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <br />
        <Footers />
      </div>
      <Modal show={modalInsertar}>
        <ModalHeader>Entrega</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Lugar de Entrega</label>
            <br />
            <input
              type="texto"
              className="form-control "
              name="lugarEntrega"
              onChange={handleChange}
            />
            <br />
            <label>Entregar a</label>
            <br />
            <input
              type="texto"
              className="form-control"
              name="nombre"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionesPost()}>
            Pedir
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
  );
}
