import React, { useContext } from "react";
import "../Assest/productos.css";
import Menu from "../Componetes/Menu2";
import Footers from "../Componetes/Footers";
import { DataContext } from "../context/Dataprovider";
import { Productos } from "../Componetes/Productos";

export default function Tienda() {
  const value = useContext(DataContext);
  const productos = value.productos;

  return (
    <>
      <div>
        <Menu />
      </div>
      <div>
        {productos.map((producto) => (
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
