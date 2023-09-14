import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Footers from "../Componetes/Footers";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import TableContainer from "@mui/material/TableContainer"; // Import de Material-UI
import Table from "@mui/material/Table"; // Import de Material-UI
import TableBody from "@mui/material/TableBody"; // Import de Material-UI
import TableCell from "@mui/material/TableCell"; // Import de Material-UI
import TableHead from "@mui/material/TableHead"; // Import de Material-UI
import TableRow from "@mui/material/TableRow"; // Import de Material-UI
import TablePagination from "@mui/material/TablePagination"; // Import de Material-UI
import Paper from "@mui/material/Paper"; // Import de Material-UI
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function DashboardMultimedia() {
  const baseUrl = "https://localhost:7151/api/multimedias";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [filtro, setFiltro] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "SistemaFarmacia");
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
    id: "",
    nombre: "",
    foto: "",
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
      dato.nombre.toLowerCase().includes(consulta.toLowerCase())
    );
  };

  const peticionesPost = async () => {
    delete gestorSeleccionado.id;
    gestorSeleccionado.foto = imageUrl;
    await axios
      .post(baseUrl, gestorSeleccionado)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const peticionesPut = async () => {
    if (imageUrl !== "") {
      gestorSeleccionado.foto = imageUrl;
    }
    await axios
      .put(baseUrl + "/" + gestorSeleccionado.id, gestorSeleccionado)
      .then((response) => {
        var respuesta = response.data;
        var dataAuxiliar = data;
        dataAuxiliar.map((gestor) => {
          if (gestor.id === gestorSeleccionado.id) {
            gestor.nombre = respuesta.nombre;
            gestor.foto = respuesta.foto;
          }
        });
        abrirCerrarModalEditar();

        peticionesGet();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const peticionesDelete = async () => {
    await axios
      .delete(baseUrl + "/" + gestorSeleccionado.id)
      .then(() => {
        setData(data.filter((gestor) => gestor.id !== gestorSeleccionado.id));
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const seleccionarGestor = (gestor, caso) => {
    setGestorSeleccionado(gestor);
    if (caso === "Editar") {
      abrirCerrarModalEditar();
    } else if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
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

  useEffect(() => {
    peticionesGet();
  }, [filtro]);

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const cookies = Cookies();
  const navigate = useNavigate();
  const roles = cookies.get("rol");
  useEffect(() => {
    if (roles === "Delivery") {
      navigate("/DashboardPedidos");
    }
  }, [roles, navigate]);
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
              onClick={() => setModalInsertar(true)}
              className="btn btn-success"
            >
              Insertar nueva portada
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
                      Foto
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(currentPage * perPage, (currentPage + 1) * perPage)
                    .map((gestor) => (
                      <TableRow key={gestor.id}>
                        <TableCell>{gestor.id}</TableCell>
                        <TableCell>{gestor.nombre}</TableCell>
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
                          </button>{" "}
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              seleccionarGestor(gestor, "Eliminar")
                            }
                          >
                            Eliminar
                          </button>
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
                type="texto"
                className="form-control "
                name="nombre"
                onChange={handleChange}
              />
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
                  type="texto"
                  className="form-control "
                  name="nombre"
                  readOnly
                  value={gestorSeleccionado && gestorSeleccionado.id}
                />
                <br />
                <label>Nombre</label>
                <br />
                <input
                  type="texto"
                  className="form-control "
                  name="nombre"
                  onChange={handleChange}
                  value={gestorSeleccionado && gestorSeleccionado.nombre}
                />
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
        <div>
          <Modal show={modalEliminar}>
            <ModalBody>¿Está seguro de eliminar el registro?</ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={peticionesDelete}>
                Si
              </button>
              <button
                className="btn btn-secondary"
                onClick={abrirCerrarModalEliminar}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
        </div>
        <Footers />
      </div>
    </CloudinaryContext>
  );
}
