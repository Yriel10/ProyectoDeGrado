import React, { useContext } from "react";
import "../Assest/productos.css";
import Menu from "../Componetes/Menu2";
import Footers from "../Componetes/Footers";
import { DataContext } from "../context/Dataprovider";
import { Productos } from "../Componetes/Productos";
import { useLocation } from "react-router-dom";


export default function Tienda() {
  const value = useContext(DataContext);
  const productos = value.productos;
  const { state } = useLocation();
  const productosFiltrados = state ? state.productos : value.productos;
  

  return (
    <>
      <div>
        <Menu />
      </div>
      <h1 className="title">Productos</h1>
      <div className="productos">
        {productosFiltrados.map((producto) => (
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
      <Footers />
    </>
  );
}
