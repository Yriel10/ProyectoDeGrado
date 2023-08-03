import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la base de datos
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7151/api/Medicamento');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ productos }}>
      {props.children}
    </DataContext.Provider>
  );
};
