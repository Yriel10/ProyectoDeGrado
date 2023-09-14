import React, { useState, useEffect, useRef } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import Modal from "react-bootstrap/Modal"; // Importa el componente Modal
import TableContainer from "@mui/material/TableContainer"; // Import de Material-UI
import Table from "@mui/material/Table"; // Import de Material-UI
import TableBody from "@mui/material/TableBody"; // Import de Material-UI
import TableCell from "@mui/material/TableCell"; // Import de Material-UI
import TableHead from "@mui/material/TableHead"; // Import de Material-UI
import TableRow from "@mui/material/TableRow"; // Import de Material-UI
import TablePagination from "@mui/material/TablePagination"; // Import de Material-UI
import Paper from "@mui/material/Paper";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function DashboardFacturas() {
  const baseUrl = "https://localhost:7151/api/facturas";
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null); // Estado para almacenar la información de la factura seleccionada
  const [totalFacturas, setTotalFacturas] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const componentRef = useRef();

  const peticionesGet = async () => {
    try {
      const response = await axios.get(baseUrl);

      if (response.status === 200) {
        const filteredData = response.data.filter((factura) => {
          const facturaDate = new Date(factura.fecha);
          const startDateObj = startDate ? new Date(startDate) : null;
          const endDateObj = endDate ? new Date(endDate) : null;

          if (startDateObj && endDateObj) {
            // Filtra por un rango de fechas si ambos valores están presentes
            return facturaDate >= startDateObj && facturaDate <= endDateObj;
          } else if (startDateObj) {
            // Filtra por fechas mayores o iguales a startDate si endDate no está presente
            return facturaDate >= startDateObj;
          } else if (endDateObj) {
            // Filtra por fechas menores o iguales a endDate si startDate no está presente
            return facturaDate <= endDateObj;
          }

          // Si no se establecen fechas de inicio ni fin, muestra todos los datos
          return true;
        });

        // Actualiza el estado 'data' con los datos filtrados
        setData(filteredData);
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
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    setPerPage(newPerPage);
    setCurrentPage(0); // Vuelve a la primera página cuando cambias las filas por página
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => swal("Print Success"),
  });
  useEffect(() => {
    peticionesGet();
  }, [startDate, endDate]);

  const cookies = new Cookies();
  const navigate = useNavigate();
  const roles = cookies.get("rol");
  useEffect(() => {
    if (roles === "Delivery") {
      navigate("/DashboardPedidos");
    }
  }, [roles, navigate]);
  useEffect(() => {
    let total = 0;
    data.forEach((factura) => {
      total += factura.total;
    });
    setTotalFacturas(total);
  }, [data]);

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
          <h3>Total de ventas: ${totalFacturas}</h3>
          <br />
          <h4>Historial de Factuas</h4>
          <a href="https://dashboard.stripe.com/">
            <button className="btn btn-success">Ver detalles de pagos </button>
          </a>
          <div>
            <button className="btn btn-primary" onClick={handlePrint}>
              Imprimir
            </button>
            <br />
            <label>Desde:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>Hasta:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <TableContainer component={Paper} ref={componentRef}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
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
                  <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                    ID
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Fecha
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Usuario ID
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(currentPage * perPage, (currentPage + 1) * perPage)
                  .map((gestor) => (
                    <TableRow key={gestor.idFactura}>
                      <TableCell>{gestor.idFactura}</TableCell>
                      <TableCell>{gestor.fecha}</TableCell>
                      <TableCell>{gestor.idUsuario}</TableCell>
                      <TableCell>${gestor.total}</TableCell>
                      <TableCell>
                        {" "}
                        <button
                          className="btn btn-success"
                          onClick={() => mostrarModalFactura(gestor)} // Llama a la función para mostrar el modal
                        >
                          Ver factura
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
