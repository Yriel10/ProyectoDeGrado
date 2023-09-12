import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Footers from "../Componetes/Footers";
import "../Assest/Sidebar.css";
import { Image } from "cloudinary-react";
import "../Assest/perfil.css";
import TableContainer from "@mui/material/TableContainer"; // Import de Material-UI
import Table from "@mui/material/Table"; // Import de Material-UI
import TableBody from "@mui/material/TableBody"; // Import de Material-UI
import TableCell from "@mui/material/TableCell"; // Import de Material-UI
import TableHead from "@mui/material/TableHead"; // Import de Material-UI
import TableRow from "@mui/material/TableRow"; // Import de Material-UI
import TablePagination from "@mui/material/TablePagination"; // Import de Material-UI
import Paper from "@mui/material/Paper";

export default function Pefil() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const id = cookies.get("id");
  const idU = id ? id.toString() : "";
  console.log(idU);
  const baseUrlFactura = `https://localhost:7151/api/Facturas/ByUsuario/${idU}`;
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null); // Estado para almacenar la información de la factura seleccionada
  const [totalFacturas, setTotalFacturas] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filtro, setFiltro] = useState("");
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [dataFactura, setDataFactura] = useState([]);


const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
console.log(baseUrlFactura);

  useEffect(() => {
    if (id === undefined) {
      navigate("/login");
    }
  }, [id, navigate]);

  const baseUrl = "https://localhost:7151/api/usuario/" + idU;
  const [data, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "SistemaFarmacia"); // Reemplaza con tu upload preset de Cloudinary
    axios
      .post("https://api.cloudinary.com/v1_1/dxy6tbr7v/image/upload", formData)
      .then((response) => {
        setImageUrl(response.data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
const peticionesGetFactura = async () => {
  try {
    const response = await axios.get(baseUrlFactura);

    if (response.status === 200) {
      const filteredData = response.data.filter((factura) => {
        const facturaDate = new Date(factura.fecha);
        const startDateObj = startDate ? new Date(startDate) : null;
        const endDateObj = endDate ? new Date(endDate) : null;

        // Filtra por un rango de fechas si ambos valores están presentes
        const fechaFilter = (!startDateObj || facturaDate >= startDateObj) &&
          (!endDateObj || facturaDate <= endDateObj);

   
        
        // Combinamos ambos filtros
        return fechaFilter;
        
      });

      // Actualiza el estado 'dataFactura' con los datos filtrados
      setDataFactura(filteredData);

  
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
    
  
  const [modalEditar, setModalEditar] = useState(false);

  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    idUsuario: "",
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    rol: "Usuario",
    fotoPerfil: "",
    estado: "activo",
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
    try {
      const response = await axios.get(baseUrl);
      console.log("API Response:", response.data);
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const peticionesPut = async () => {
  
    if (imageUrl !== "") {
      gestorSeleccionado.fotoPerfil = imageUrl;
    }
    await axios
      .put(baseUrl,gestorSeleccionado)
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
        // Llama a 'peticionesGet' para actualizar otros datos si es necesario
        peticionesGet();
        // Cierra el modal después de que todo se haya completado
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
 
      });
      abrirCerrarModalEditar();
      peticionesGet();
  };
  
  
  const seleccionarGestor = (gestor, caso) => {
    setGestorSeleccionado(gestor);
    caso === "Editar" && abrirCerrarModalEditar();
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  useEffect(() => {
    peticionesGet();
    peticionesGetFactura();
    console.log("Fecha de inicio:", startDate);
console.log("Fecha de fin:", endDate);


    
  }, [startDate, endDate]);

  return (
    <div >
      <div >
        <Menu />
      </div>
      <div className="content">
        <div className="perfil">
          
        {data && (
        <div>
    <Image
      cloudName="dxy6tbr7v"
      publicId={data.fotoPerfil}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
       
    />
          <br />
          <h4>Nombre:</h4>
          <h6>{data.nombres}</h6>
          <h4>Apellido:</h4>
          <h6>{data.apellidos}</h6>
          <h4>Correo:</h4>
          <h6>{data.correo}</h6>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => seleccionarGestor(data, "Editar")}
          >
            Editar
          </button>
       
        </div>
         )}
       
        </div>

       <div>
        
      
       </div>
     <div>
     <h3>Historial de compras</h3>
     
      </div>
      <div>
      <div className="flex">
            <div className="content">
          <div>
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

          <TableContainer component={Paper}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={dataFactura.length}
                rowsPerPage={perPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} // Esta línea se ha modificado
              />
              <Table>
                <TableHead>
                  <TableRow>
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>ID</TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Fecha</TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Usuario ID</TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Total</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                {dataFactura
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
        <div>
          <Modal show={modalEditar}>
            <ModalHeader>Editar usuario</ModalHeader>
            <ModalBody>
              <div className="form-group">
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
                <label>Foto de perfil</label>
                <br />
                <input
                  type="file"
                  className="form-control"
                  name="fotoPerfil"
                  onChange={handleImageUpload}
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
