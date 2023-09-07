import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total,setTotal]= useState(0);
  const [cantidadPorProducto, setCantidadPorProducto] = useState({});

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
      const data = productos.find((producto) => producto.idMedicamento === idMedicamento);
      if (data) {

        const newCarrito = [
          ...carrito,
          {
            ...data,
            cantidad: cantidadPorProducto[idMedicamento] || 1,
          },
        ];
        setCarrito(newCarrito);
      }
    } else {
      swal("El producto ya fue seleccionado");
    }
  };
  useEffect(() => {
    const dataCarrito = JSON.parse(localStorage.getItem("dataCarrito"));
    if (dataCarrito) {
      setCarrito(dataCarrito);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataCarrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const getTotal = () => {
      const res = carrito.reduce((prev, item) => {
        const cantidad = cantidadPorProducto[item.idMedicamento] || 1;
        return prev + item.precio * cantidad;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [carrito, cantidadPorProducto]);
  

  return (
    <DataContext.Provider
      value={{ productos, addCarrito, setCarrito, carrito, total, setTotal, cantidadPorProducto,setCantidadPorProducto }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
