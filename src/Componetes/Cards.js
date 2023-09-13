import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

function Cards() {
  const baseUrl = "https://localhost:7151/api/ofertas";
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
    <CardGroup>
      {data.map((gestor) => (
        gestor.foto && (
          <Card key={gestor.id}>
            <Card.Img variant="top" src={gestor.foto} />
            <Card.Body>
              <Card.Title>{gestor.nombre}</Card.Title>
              <Card.Text>{gestor.descripcion}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{gestor.fechaValidez}</small>
            </Card.Footer>
          </Card>
        )
      ))}
    </CardGroup>
  );
}

export default Cards;
