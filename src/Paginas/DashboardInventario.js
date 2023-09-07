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

export default function DashboardInventario() {
  const baseUrl = "https://localhost:7151/api/inventarios";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [filtro, setFiltro] = useState("");


  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    idInventario: "",
    nombreProducto:"",
    fabricante: "",
    fechaEntrada: "",
    fechaVencimiento: "",
    cantidadEntregada: "",
    codigo: "",
    estado:"Activo"
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
    return datos.filter((dato) =>
      dato.nombreProducto.toLowerCase().includes(consulta.toLowerCase())
    );
  };
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
                      <TableRow key={gestor.idInentario}>
                        <TableCell>{gestor.idInventario}</TableCell>
                        <TableCell>{gestor.nombreProducto}</TableCell>
                        <TableCell>{gestor.fabricante}</TableCell>
                        <TableCell>{gestor.fechaEntrada}</TableCell>
                        <TableCell>{gestor.fechaVencimiento}</TableCell>
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
                          <button className="btn btn-danger">Eliminar</button>
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
