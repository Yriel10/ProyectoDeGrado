import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Footers from "../Componetes/Footers";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import MenuDasbohard from "../Componetes/MenuDasbohard";

export default function DashboarOfertas() {
  const baseUrl = "https://localhost:7151/api/ofertas";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
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
    id: "",
    nombre: "",
    foto: "",
    descripcion: "",
    fechaValidez: "",
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
    gestorSeleccionado.foto = imageUrl;
    await axios
      .put(baseUrl + "/" + gestorSeleccionado.id, gestorSeleccionado)
      .then((response) => {
        var respuesta = response.data;
        var dataAuxiliar = data;
        dataAuxiliar.map((gestor) => {
          if (gestor.id === gestorSeleccionado.id) {
            gestor.nombre = respuesta.nombre;
            gestor.foto = respuesta.foto;
            gestor.descripcion=respuesta.descripcion;
            gestor.fechaValidez=respuesta.fechaValidez;
          }
        });
        abrirCerrarModalEditar();
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
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
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
              Nueva oferta
            </button>
            <br />
            <br />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Foto</th>
                  <th>Descripción</th>
                  <th>Fecha de validez</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((gestor) => (
                    <tr key={gestor.id}>
                      <td>{gestor.id}</td>
                      <td>{gestor.nombre}</td>
                      <td style={{ width: "250px", height: "250px" }}>
                        {gestor.foto && (
                          <Image
                            publicId={gestor.foto}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          ></Image>
                        )}
                      </td>
                      <td>{gestor.descripcion}</td>
                      <td>{gestor.fechaValidez}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => seleccionarGestor(gestor, "Editar")}
                        >
                          Editar
                        </button>
                        {""}
                        <button
                          className="btn btn-danger"
                          onClick={() => seleccionarGestor(gestor, "Eliminar")}
                        >
                          Eliminar
                        </button>
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
              <label>Descripción</label>
              <br />
              <input
                type="texto"
                className="form-control "
                name="descripcion"
                onChange={handleChange}
              />
              <label>Fecha de validez</label>
              <br />
              <input
                type="texto"
                className="form-control "
                name="fechaValidez"
                onChange={handleChange}
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
