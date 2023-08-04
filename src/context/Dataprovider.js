import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la base de datos
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7151/api/Medicamento"
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const addCarrito = (idMedicamento) => {
    const check = carrito.every((item) => {
      return item.idMedicamento !== idMedicamento;
    });
    if (check) {
      const data = productos.filter((productos) => {
        return productos.idMedicamento === idMedicamento;
      });

      setCarrito([...carrito, ...data]);
    } else {
      alert("El producto ya fue seleccionado");
    }
  };


  return (
    <DataContext.Provider value={{ productos, addCarrito,setCarrito,
      carrito,
      setCarrito }}>
      {props.children}
    </DataContext.Provider>
  );
};
