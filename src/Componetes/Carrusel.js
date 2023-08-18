import Carousel from "react-bootstrap/Carousel";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

function Carrusel() {
  const baseUrl = "https://localhost:7151/api/multimedias";
  const [data, setData] = useState([]);

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
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    peticionesGet();
  }, []);


  return (
    <div>
      <Carousel>
      
          {data.map((gestor)=>(
           gestor.foto && ( 
            <Carousel.Item>
           <Image
            className="d-block w-100"
            cloudName="dxy6tbr7v"
            publicId={gestor.foto}
           
          />
          </Carousel.Item>)
          ))}
        
      </Carousel>
    </div>
  );
}

export default Carrusel;
