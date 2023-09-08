import React, { useContext, useState } from "react";
import "../Assest/productos.css";
import Menu from "../Componetes/Menu2";
import Footers from "../Componetes/Footers";
import { DataContext } from "../context/Dataprovider";
import { Productos } from "../Componetes/Productos";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";

export default function Tienda() {
  const value = useContext(DataContext);
  const productos = value.productos;
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const productosFiltrados = state ? state.productos : value.productos;
  const baseUrl = "https://localhost:7151/api/solicitud";
  
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    descripcion: "",
    receta: "",
    correo:"",
    idUsuario: "1",
    estado:"incompleto"
  });
 
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
    console.log(gestorSeleccionado);
  };
  const peticionesPost = async () => {
    gestorSeleccionado.receta = imageUrl;
    console.log("Sending: ", gestorSeleccionado); 
    await axios
      .post(baseUrl, gestorSeleccionado)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log("Error Details:", error.response.data);  // More detailed error message
        alert(error)
      });
  };
   // Filtrar los productos para excluir los que tienen estado "Eliminado"
const productosNoEliminados = productosFiltrados.filter(
  (producto) => producto.estado !== "Eliminado"
);
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  return (
    <>
      <div>
        <Menu />
      </div>
      <h1 className="title">Productos</h1>
      <button className="btn btn-primary" onClick={abrirCerrarModalInsertar}>Solictar Medicamento</button>
      <div className="productos">
        {productosNoEliminados.map((producto) => (
          <Productos
            key={producto.idMedicamento}
            idMedicamento={producto.idMedicamento}
            foto={producto.foto}
            categoria={producto.categoria}
            precio={producto.precio}
            nombre={producto.nombre}
          />
        ))}
      </div>
      <CloudinaryContext cloudName="dxy6tbr7v">
      <div>
      <Modal show={modalInsertar}>
          <ModalHeader>Solicitar  Medicamento</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre del Medicamento</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="descripcion"
                onChange={handleChange}
              />
              <br />
              <label>correo</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="correo"
                onChange={handleChange}
              />
              <br />

              <label>receta</label>
              <br />
              <input
                type="file"
                className="form-control"
                name="receta"
                onChange={handleImageUpload}
              />
        
            {imageUrl && (
              <div>
                <Image publicId={imageUrl}>
                  <Transformation width="50" crop="scale" />
                </Image>
              </div>
            )}

            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionesPost()}>
              Solicitar
            </button>{" "}
       
            <button
              className="btn btn-danger"
              onClick={abrirCerrarModalInsertar} // Invoca abrirCerrarModalInsertar
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
        
      </div>
      
      <Footers />
      </CloudinaryContext>
    </>
  );
}
