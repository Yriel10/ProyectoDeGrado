import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Footers from "../Componetes/Footers";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import MenuDasbohard from "../Componetes/MenuDasbohard";
import "../Assest/Sidebar.css";

export default function DashboardInventario() {
  const baseUrl = "https://localhost:7151/api/medicamento";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
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
  useEffect(() => {
    peticionesGet();
  }, []);

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
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Fabricante</th>
                  <th>Precio</th>
                  <th>categoria</th>
                  <th> Cantidad</th>
                  <th> Codigo</th>
                  <th>Receta</th>
                  <th> Foto</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((gestor) => (
                    <tr key={gestor.idMedicamento}>
                      <td>{gestor.idMedicamento}</td>
                      <td>{gestor.nombre}</td>
                      <td>{gestor.nombreFabricante}</td>
                      <td>{gestor.precio}</td>
                      <td>{gestor.categoria}</td>
                      <td>{gestor.cantidad}</td>
                      <td>{gestor.codigo}</td>
                      <td>{gestor.tipoMedicamento ? "Si" : "No"}</td>
                      <td style={{ width: "250px", height: "250px" }}>
                        {gestor.foto && (
                          <Image
                            publicId={gestor.foto}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          ></Image>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => seleccionarGestor(gestor, "Editar")}
                        >
                          Editar
                        </button>
                        {""}
                        <button className="btn btn-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
