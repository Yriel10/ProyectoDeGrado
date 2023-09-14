import React, { useState, useEffect } from "react";
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
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function DashboardProductos() {
  const baseUrl = "https://localhost:7151/api/medicamento";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [filtro, setFiltro] = useState("");

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
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    idMedicamento: "",
    nombre: "",
    foto: "",
    nombreFabricante: "",
    precio: "",
    categoria: "",
    cantidad: "",
    codigo: "",
    tipoMedicamento: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
    console.log(gestorSeleccionado);
  };
  const cookies = new Cookies();
  const hoy = new Date();
  const idUsuarioEditor = cookies.get("id");
  const [registroLogs, setRegistroLogs] = useState({
    idUsuario: idUsuarioEditor,
    accion: "Insertar",
    tabla: "Productos",
    registro: "",
    campo: "nombre, foto, nombreFabricante,  precio,  categoria,  cantidad,  codigo, tipoMedicamento",
    valorAntes: "Vacio",
    valorDespues: "",
    fecha: hoy,
    Usuario:"",
  });
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
  const RegistroPostEliminacion = async (medicamento) => {
    const registroLogsCopy = { ...registroLogs };
    console.log(registroLogsCopy,"2");
    console.log(medicamento,"3")
    registroLogsCopy.accion="Eliminar";
    registroLogsCopy.registro= JSON	.stringify(medicamento.idMedicamento)
    registroLogsCopy.valorAntes = JSON.stringify(medicamento)
    registroLogsCopy.valorDespues = JSON.stringify(medicamento.estado);
    console.log(registroLogsCopy,"4");
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
        setData(datosFiltrados); // Actualiza el estado de datos con los datos filtrados
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filtrarDatos = (datos, consulta) => {
    return datos.filter(
      (dato) =>
        dato.nombre.toLowerCase().includes(consulta.toLowerCase()) &&
        dato.estado !== "Eliminado"
    );
  };
const confirmarEliminacion= async(medicamento) =>{
    swal({
      title:"Eliminar" ,
      text: '¿Estas seguro que deseas eliminar el producto?',
      icon:"warning",
      buttons:["No","Si"]
    }).then(respuesta=>{
      if(respuesta){
        swal({text:"Se a eliminado",
      icon:"success"})
      peticionesPutEliminar(medicamento);
      }else{
        swal({text:"Se cancelo",
      icon:"error"})
      }

    })

  }
  const peticionesPutEliminar = async (medicamento) => {
    
    try {
      medicamento.estado = "Eliminado"; // Asegúrate de establecer el estado en "Eliminar" aquí
      const response = await axios.put(
        baseUrl + "/" + medicamento.idMedicamento,
        medicamento
      );
      if (response.status === 200) {
       
        peticionesGet();

      } else {
     

      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
  
    peticionesGet();
    RegistroPostEliminacion(medicamento);
  };
  
  const peticionesPost = async () => {
    if (!imageUrl) {
      console.log("La imagen aún no se ha cargado");
      return;
    }

    const postData = {
      nombre: gestorSeleccionado.nombre,
      nombreFabricante: gestorSeleccionado.nombreFabricante,
      categoria: gestorSeleccionado.categoria,
      precio: gestorSeleccionado.precio,
      cantidad: gestorSeleccionado.cantidad,
      codigo: gestorSeleccionado.codigo,
      tipoMedicamento: gestorSeleccionado.tipoMedicamento,
      foto: imageUrl,
    };

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
  const peticionesPut = async () => {
    if (imageUrl !== "") {
      gestorSeleccionado.foto = imageUrl;
    }
    await axios
      .put(baseUrl + "/" + gestorSeleccionado.idMedicamento, gestorSeleccionado)
      .then((response) => {
        var respuesta = response.data;
        var dataAuxiliar = data;
        dataAuxiliar.map((gestor) => {
          if (gestor.idMedicamento === gestorSeleccionado.idMedicamento) {
            gestor.nombre = respuesta.nombre;
            gestor.foto = respuesta.foto;
            gestor.nombreFabricante = respuesta.nombreFabricante;
            gestor.precio = respuesta.precio;
            gestor.categoria = respuesta.categoria;
            gestor.cantidad = respuesta.cantidad;
            gestor.codigo = respuesta.codigo;
            gestor.tipoMedicamento = respuesta.tipoMedicamento;
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

  const navigate = useNavigate();
  const roles = cookies.get("rol");
  useEffect(() => {
    if (roles === "Delivery") {
      navigate("/DashboardPedidos");
    }
  }, [roles, navigate]);

  useEffect(() => {
    peticionesGet();
  }, [filtro]);

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
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <TableContainer component={Paper}>
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
                      Precio
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      categoria
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {" "}
                      Cantidad
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {" "}
                      Codigo
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Receta
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {" "}
                      Foto
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
                      <TableRow key={gestor.idMedicamento}>
                        <TableCell>{gestor.idMedicamento}</TableCell>
                        <TableCell>{gestor.nombre}</TableCell>
                        <TableCell>{gestor.nombreFabricante}</TableCell>
                        <TableCell>{gestor.precio}</TableCell>
                        <TableCell>{gestor.categoria}</TableCell>
                        <TableCell>{gestor.cantidad}</TableCell>
                        <TableCell>{gestor.codigo}</TableCell>
                        <TableCell>
                          {gestor.tipoMedicamento ? "Si" : "No"}
                        </TableCell>
                        <TableCell style={{ width: "250px", height: "250px" }}>
                          {gestor.foto && (
                            <Image
                              publicId={gestor.foto}
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                            ></Image>
                          )}
                        </TableCell>
                        <TableCell>
                          <button
                            className="btn btn-primary"
                            onClick={() => seleccionarGestor(gestor, "Editar")}
                          >
                            Editar
                          </button>
                          {""}
                          <button className="btn btn-danger" onClick={()=>confirmarEliminacion(gestor)}>Eliminar</button>
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
                name="nombre"
                onChange={handleChange}
              />
              <br />
              <br />
              <label>Fabricante</label>
              <br />
              <input
                type="text"
                className="form-control "
                name="nombreFabricante"
                onChange={handleChange}
              />
              <br />
              <label>Categoria</label>
              <br />
              <input
                type="text"
                className="form-control "
                name="categoria"
                onChange={handleChange}
              />
              <br />
              <label>Precio</label>
              <br />
              <input
                type="number"
                className="form-control "
                name="precio"
                onChange={handleChange}
              />
              <br />
              <label>Cantidad</label>
              <br />
              <input
                type="number"
                className="form-control "
                name="cantidad"
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
              <label>Receta</label>
              <br />
              <input
                type="radio"
                name="tipoMedicamento"
                value={true}
                checked={gestorSeleccionado.tipoMedicamento === true}
                onChange={handleChange}
              />
              <label>Si</label>
              <br />
              <input
                type="radio"
                name="tipoMedicamento"
                value={false}
                checked={gestorSeleccionado.tipoMedicamento === false}
                onChange={handleChange}
              />
              <label>No</label>
              <br />
              <label>Foto</label>
              <br />
              <input
                type="file"
                className="form-control"
                name="foto"
                onChange={handleImageUpload}
              />
            </div>
            {imageUrl && (
              <div>
                <Image publicId={imageUrl}>
                  <Transformation width="50" crop="scale" />
                </Image>
              </div>
            )}
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
                  name="idMedicamento"
                  readOnly
                  value={gestorSeleccionado && gestorSeleccionado.idMedicamento}
                />
                <br />
                <label>Nombre</label>
                <br />
                <input
                  type="text"
                  className="form-control "
                  name="nombre"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.nombre}
                />
                <br />
                <label>Fabricante</label>
                <br />
                <input
                  type="text"
                  className="form-control "
                  name="nombreFabricante"
                  onChange={handleChange}
                  value={
                    gestorSeleccionado && gestorSeleccionado.nombreFabricante
                  }
                />
                <br />
                <label>Categoria</label>
                <br />
                <input
                  type="text"
                  className="form-control "
                  name="categoria"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.categoria}
                />
                <br />
                <label>Precio</label>
                <br />
                <input
                  type="number"
                  className="form-control "
                  name="precio"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.precio}
                />
                <br />
                <label>Cantidad</label>
                <br />
                <input
                  type="number"
                  className="form-control "
                  name="cantidad"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.cantidad}
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
                <label>Receta</label>
                <br />
                <input
                  type="radio"
                  name="tipoMedicamento"
                  checked={gestorSeleccionado.tipoMedicamento === true}
                  onChange={handleChange}
                />
                <label>Si</label>
                <br />
                <input
                  type="radio"
                  name="tipoMedicamento"
                  checked={gestorSeleccionado.tipoMedicamento === false}
                  onChange={handleChange}
                />
                <label>No</label>
                <br />
                <br />
                <label>Foto</label>
                <br />
                <input
                  type="file"
                  className="form-control"
                  name="foto"
                  onChange={handleImageUpload}
                />
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
