import React, { useState, useEffect, useRef } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Footers from "../Componetes/Footers";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import "../Assest/Sidebar.css";
import TableContainer from "@mui/material/TableContainer"; // Import de Material-UI
import Table from "@mui/material/Table"; // Import de Material-UI
import TableBody from "@mui/material/TableBody"; // Import de Material-UI
import TableCell from "@mui/material/TableCell"; // Import de Material-UI
import TableHead from "@mui/material/TableHead"; // Import de Material-UI
import TableRow from "@mui/material/TableRow"; // Import de Material-UI
import TablePagination from "@mui/material/TablePagination"; // Import de Material-UI
import Paper from "@mui/material/Paper";
import swal from "sweetalert";
import { useReactToPrint } from "react-to-print";
import Cookies from "universal-cookie";

export default function DashboardInventario() {
  const baseUrl = "https://localhost:7151/api/inventarios";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [filtro, setFiltro] = useState("");
  const componentRef = useRef();
  const cookies = new Cookies();
  const hoy = new Date();
  const idUsuarioEditor = cookies.get("id");
  
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    idInventario: "",
    nombreProducto:"",
    fabricante: "",
    fechaEntrada: "",
    fechaVencimiento: "",
    cantidadEntregada: "",
    codigo: "",
    estado:"Activo",
    claseCSS:""
   
  });
  const [registroLogs, setRegistroLogs] = useState({
    idUsuario: idUsuarioEditor,
    accion: "Insertar",
    tabla: "Inventario",
    registro: 1,
    campo: "nombreProducto,fabricante,fechaEntrada,fechaVencimiento,cantidadEntregada,codigo",
    valorAntes: "Vacio",
    valorDespues: "",
    fecha: hoy,
    Usuario:"",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
    console.log(gestorSeleccionado);
  };
  const RegistroPost = async (gestorSeleccionado) => {
    const registroLogsCopy = { ...registroLogs };
    registroLogsCopy.valorDespues = JSON.stringify(gestorSeleccionado);
  
    await axios
      .post("https://localhost:7151/api/logs", registroLogsCopy)
      .then((response) => {
        setData(data.concat(response.data));
    
      })
      .catch((error) => {
        console.log(error);
        console.log(registroLogsCopy)
      });
  };
  

  const peticionesGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        const datosFiltrados = filtrarDatos(response.data, filtro);
        console.log(datosFiltrados); // Agrega esto para depurar
        setData(datosFiltrados); // Actualiza el estado de datos con los datos filtrados
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filtrarDatos = (datos, consulta) => {
    const productosConAlertas = datos.map((producto) => {
      const hoy = new Date(); // Mueve la declaración de hoy aquí
      const fechaVencimiento = new Date(producto.fechaVencimiento);
      const diferenciaDias = Math.floor(
        (fechaVencimiento - hoy) / (1000 * 60 * 60 * 24)
      );
    
      let claseCSS = "";
      if (diferenciaDias <= 30 && diferenciaDias > 0) {
        claseCSS = "amarillo";
      } else if (diferenciaDias <= 0) {
        claseCSS = "rojo";
      }
    
      return {
        ...producto,
        claseCSS: claseCSS,
      };
  });  

    return productosConAlertas.filter(
      (dato) =>
        dato.nombreProducto.toLowerCase().includes(consulta.toLowerCase()) &&
        dato.estado !== "Eliminado" 
      

    );
  };
 

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => swal("Print Success"),
  });

  const peticionesPost = async () => {
    const postData = {
      nombreProducto: gestorSeleccionado.nombreProducto,
      fabricante: gestorSeleccionado.fabricante,
      cantidadEntregada: gestorSeleccionado.cantidadEntregada,
      fechaVencimiento: gestorSeleccionado.fechaVencimiento,
      fechaEntrada: gestorSeleccionado.fechaEntrada,
      codigo: gestorSeleccionado.codigo,
      estado: gestorSeleccionado.estado
    };
    console.log(postData)
    try {
      const response = await axios.post(baseUrl, postData, {
        headers: {
          "Content-Type": "application/json", // Asegúrate de incluir este encabezado
        },
      });
      setData([...data, response.data]);
      RegistroPost(gestorSeleccionado);
      abrirCerrarModalInsertar();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  


  
  
  const confirmarEliminacion= async(inventario) =>{
    swal({
      title:"Eliminar" ,
      text: '¿Estas seguro que deseas eliminar el producto?',
      icon:"warning",
      buttons:["No","Si"]
    }).then(respuesta=>{
      if(respuesta){
        swal({text:"Se a eliminado",
      icon:"success"})
      peticionesPutEliminar(inventario);
      }else{
        swal({text:"Se cancelo",
      icon:"error"})
      }

    })

  }
  const peticionesPutEliminar = async (inventario) => {
    
    try {
      inventario.estado = "Eliminado"; // Asegúrate de establecer el estado en "Eliminar" aquí

      const response = await axios.put(
        baseUrl + "/" + inventario.idInventario,
        inventario
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
  
  const peticionesPut = async () => {
    await axios
      .put(baseUrl + "/" + gestorSeleccionado.idInventario, gestorSeleccionado)
      .then((response) => {
        var respuesta = response.data;
        var dataAuxiliar = data;
        dataAuxiliar.map((gestor) => {
          if (gestor.idInventario === gestorSeleccionado.idInventario) {
            
            gestor.nombreProducto= respuesta.nombreProducto;
            gestor.fabricante= respuesta.fabricante;
            gestor.fechaEntrada= respuesta.fechaEntrada;
            gestor.fechaVencimiento= respuesta.fechaVencimiento;
            gestor.cantidadEntregada= respuesta.cantidadEntregada;
            gestor.codigo= respuesta.codigo;
            
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
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    setPerPage(newPerPage);
    setCurrentPage(0); // Vuelve a la primera página cuando cambias las filas por página
  };

  useEffect(() => {


    peticionesGet();
  }, [filtro]);

// Ejecuta esta función cada vez que los datos se actualicen
  
  
  
  
  
  
  ///////////////////////////////////////////////////////////////////////////////
  return (
    <CloudinaryContext cloudName="dxy6tbr7v">
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
              Insertar producto nuevo
            </button>
            <br />
            <button className="btn btn-primary" onClick={handlePrint}>
            Imprimir
          </button>
          <br />
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <TableContainer component={Paper} ref={componentRef}>
              <TablePagination
                rowsPerPageOptions={[1, 5, 10]}
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
                      Nombre
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Fabricante
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Fecha de entrega
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Fecha de vencimiento
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {" "}
                      Cantidad Recibida
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {" "}
                      Codigo
                    </TableCell>

                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {" "}
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(currentPage * perPage, (currentPage + 1) * perPage)
                    .map((gestor) => (
                      <TableRow key={gestor.idInventario}  >
                        <TableCell>{gestor.idInventario}</TableCell>
                        <TableCell>{gestor.nombreProducto}</TableCell>
                        <TableCell>{gestor.fabricante}</TableCell>
                        <TableCell>{gestor.fechaEntrada}</TableCell>
                        <TableCell className={gestor.claseCSS}>{gestor.fechaVencimiento}</TableCell>
                        <TableCell>{gestor.cantidadEntregada}</TableCell>
                        <TableCell>{gestor.codigo}</TableCell>
                        <TableCell>
                          <button
                            className="btn btn-primary"
                            onClick={() => seleccionarGestor(gestor, "Editar")}
                          >
                            Editar
                          </button>
                          {""}
                          <button className="btn btn-danger" onClick={()=> confirmarEliminacion(gestor)}>Eliminar</button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <Modal show={modalInsertar}>
          <ModalHeader>Insertar</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre</label>
              <br />
              <input
                type="text"
                className="form-control "
                name="nombreProducto"
                onChange={handleChange}
              />
              <br />
              <br />
              <label>Fabricante</label>
              <br />
              <input
                type="text"
                className="form-control "
                name="fabricante"
                onChange={handleChange}
              />
              <br />
              <label>Fecha de entrega</label>
              <br />
              <input
                type="date"
                className="form-control "
                name="fechaEntrada"
                onChange={handleChange}
              />
              <br />
              <label>Fecha de vencimiento</label>
              <br />
              <input
                type="date"
                className="form-control "
                name="fechaVencimiento"
                onChange={handleChange}
              />
              <br />
              <label>Cantidad Recibida</label>
              <br />
              <input
                type="number"
                className="form-control "
                name="cantidadEntregada"
                onChange={handleChange}
              />
              <br />
              <label>Codigo</label>
              <br />
              <input
                type="number"
                className="form-control "
                name="codigo"
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
                  type="number"
                  className="form-control "
                  name="idInventario"
                  readOnly
                  value={gestorSeleccionado && gestorSeleccionado.idInventario}
                />
                <br />
                <label>Nombre de producto</label>
                <br />
                <input
                  type="text"
                  className="form-control "
                  name="nombreProducto"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.nombreProducto}
                />
                <br />
                <label>Fabricante</label>
                <br />
                <input
                  type="text"
                  className="form-control "
                  name="fabricante"
                  onChange={handleChange}
                  value={
                    gestorSeleccionado && gestorSeleccionado.fabricante
                  }
                />
                <br />
                <label>Fecha de entrega</label>
                <br />
                <input
                  type="tex"
                  className="form-control "
                  name="fechaEntrada"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.fechaEntrada}
                />
                <br />
                <label>Fecha de vencimiento</label>
                <br />
                <input
                  type="tex"
                  className="form-control "
                  name="fechaVencimiento"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.fechaVencimiento}
                />
                <br />
                <label>Cantidad entregada</label>
                <br />
                <input
                  type="number"
                  className="form-control "
                  name="cantidadEntregada"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.cantidadEntregada}
                />
                <br />
                <label>Codigo</label>
                <br />
                <input
                  type="number"
                  className="form-control "
                  name="codigo"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.codigo}
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
        <Footers />
      </div>
    </CloudinaryContext>
  );
}
