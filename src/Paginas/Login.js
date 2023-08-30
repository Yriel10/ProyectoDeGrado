import React, { useState, useEffect } from "react";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import Menu from "../Componetes/Menu2";
import Cookies from "universal-cookie";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Footers from "../Componetes/Footers";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";

function Login(props) {
  const baseUrl = "https://localhost:7151/api/usuario";
  const cookies = new Cookies();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  let navigate = useNavigate();
  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
    console.log(form);
    console.log(gestorSeleccionado);
  };

  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    idUsuario: "",
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    rol: "Usuario",
  });
  const registrarsePost = async () => {
    try {
      // Validar que los campos no estén vacíos antes de realizar la solicitud
      if (
        gestorSeleccionado.nombres.trim() === "" ||
        gestorSeleccionado.apellidos.trim() === "" ||
        gestorSeleccionado.correo.trim() === "" ||
        gestorSeleccionado.contrasena.trim() === ""
      ) {
        alert("Por favor, complete todos los campos del formulario");
        return;
      }
      delete gestorSeleccionado.idUsuario;
      const response = await axios.post(baseUrl, gestorSeleccionado);
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    } catch (error) {
      console.log(error);
    }
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const iniciarSesion = async () => {
    try {
      const response = await axios.get(
        baseUrl + `/${form.correo}/${form.contrasena}`
      );
      const usuario = response.data[0];
      if (usuario) {
        cookies.set("id", usuario.idUsuario, { path: "/" });
        cookies.set("nombres", usuario.nombres, { path: "/" });
        cookies.set("apellidos", usuario.apellidos, { path: "/" });
        cookies.set("correo", usuario.correo, { path: "/" });
        cookies.set("contrasena", usuario.contrasena, { path: "/" });
        cookies.set("rol", usuario.rol, { path: "/" });
        cookies.set("fotoPerfil", usuario.fotoPefil, { path: "/" });
        alert("Bienvenido:" + usuario.nombres + " " + usuario.apellidos);
        navigate("/");
      } else {
        alert("El usuario o la contraseña son incorrectos");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);


  return (
    <>
      <div>
        <Menu />
      </div>
      <div>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBInput
            wrapperClass="mb-4"
            label="Correo electronico"
            id="form1"
            type="email"
            name="correo"
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Contraseña"
            id="form2"
            type="password"
            name="contrasena"
            onChange={handleChange}
          />

          <div className="d-flex justify-content-between mx-3 mb-4">
            <a href="!#">¿Olvidaste tu contraseña?</a>
          </div>
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={() => iniciarSesion()}
          >
            {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </Button>

          <div className="text-center">
            <p>
              <br/>
              ¿No estas registrado?{" "}
              <button className="btn btn-outline-primary" onClick={() => abrirCerrarModalInsertar()}>
                Registrarse
              </button>
            </p>
          </div>
        </MDBContainer>
      </div>

      <Footers />
      <Modal show={modalInsertar}>
        <ModalHeader>Registrarse</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre</label>
            <br />
            <input
              type="texto"
              className="form-control "
              name="nombres"
              onChange={handleChange}
            />
            <br />
            <label>Apellido</label>
            <br />
            <input
              type="texto"
              className="form-control"
              name="apellidos"
              onChange={handleChange}
            />
            <br />
            <label>Correo</label>
            <br />
            <input
              type="texto"
              className="form-control"
              name="correo"
              onChange={handleChange}
            />
            <br />
            <label>Contraseña</label>
            <br />
            <input
              type="password"
              className="form-control"
              name="contrasena"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => registrarsePost()}>
            Registrarse
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
    </>
  );
}

export default Login;
