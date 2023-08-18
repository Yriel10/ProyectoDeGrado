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

export default function Pefil() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const id = cookies.get("id");
  const idU = id ? id.toString() : "";
  console.log(idU);

  useEffect(() => {
    if (id === undefined) {
      navigate("/login");
    }
  }, [id, navigate]);

  const baseUrl = "https://localhost:7151/api/usuario/" + idU;
  const [data, setData] = useState(null);

  const [modalEditar, setModalEditar] = useState(false);

  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    idUsuario: "",
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    rol: "Usuario",
    fotoPerfil: "",
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
    await axios
      .put(baseUrl + "/" + gestorSeleccionado.idUsuario, gestorSeleccionado)
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
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
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
  }, []);

  return (
    <div>
      <div>
        <Menu />
      </div>
      <div className="flex">
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
        <h3>Historial de compras</h3>
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
