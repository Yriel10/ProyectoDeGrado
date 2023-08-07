import React, { useContext, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiClose,
  mdiArrowUpDropCircle,
  mdiArrowDownDropCircle,
  mdiDeleteCircle,
} from "@mdi/js";
import "../Assest/carro.css";
import { DataContext } from "../context/Dataprovider";

export const Carro = (props) => {
  const value = useContext(DataContext);
  const { carro, setCarro } = props;
  const carrito = value.carrito;
  const setCarrito = value.setCarrito;
  const [cantidadPorProducto, setCantidadPorProducto] = useState({});

  const toofalse = () => {
    setCarro(false);
  };

  const show1 = carro ? "carritos show" : "carritos";
  const show2 = carro ? "carrito show" : "carrito";

  const resta = (idMedicamento) => {
    if (cantidadPorProducto[idMedicamento] > 1) {
      setCantidadPorProducto({
        ...cantidadPorProducto,
        [idMedicamento]: cantidadPorProducto[idMedicamento] - 1,
      });
    }
  };

  const suma = (idMedicamento) => {
    setCantidadPorProducto({
      ...cantidadPorProducto,
      [idMedicamento]: (cantidadPorProducto[idMedicamento] || 1) + 1,
    });
  };

  const addToCart = (idMedicamento) => {
    const item = carrito.find((item) => item.idMedicamento === idMedicamento);
    if (item) {
      item.cantidad += cantidadPorProducto[idMedicamento] || 1; // Si no existe la clave, utiliza el valor predeterminado de 1
    } else {
      const producto = value.productos.find(
        (producto) => producto.idMedicamento === idMedicamento
      );
      if (producto) {
        setCarrito([...carrito, { ...producto, cantidad: cantidadPorProducto[idMedicamento] || 1 }]);
      }
    }
    setCantidadPorProducto({
      ...cantidadPorProducto,
      [idMedicamento]: 1, // Reiniciar la cantidad a 1 después de agregar al carrito
    });
  };

  const removeProducto = (idMedicamento) => {
    if (window.confirm("¿Quieres eliminar este artículo?")) {
      setCarrito(carrito.filter((item) => item.idMedicamento !== idMedicamento));
      setCantidadPorProducto({
        ...cantidadPorProducto,
        [idMedicamento]: 1, // Reiniciar la cantidad a 1 después de eliminar del carrito
      });
    }
  };

  return (
    <div className={show1}>
      <div className={show2}>
        <div className="carrito_close" onClick={toofalse}>
          <Icon path={mdiClose} className="icono" />
        </div>
        <h2>Su carrito</h2>

        <div className="carrito_center">
          {carrito.map((productos) => (
            <div className="carrito_item" key={productos.idMedicamento}>
              <img src={productos.foto} alt=""></img>

              <div>
                <h3>{productos.nombre}</h3>
                <p className="price">${productos.precio}</p>
              </div>
              <div>
                <Icon
                  path={mdiArrowUpDropCircle}
                  className="punto"
                  onClick={() => suma(productos.idMedicamento)}
                />
                <p className="cantidad">{cantidadPorProducto[productos.idMedicamento] || 1}</p>
                <Icon
                  path={mdiArrowDownDropCircle}
                  className="punto"
                  onClick={() => resta(productos.idMedicamento)}
                />
              </div>
              <div
                className="remove_item"
                onClick={() => removeProducto(productos.idMedicamento)}
              >
                <Icon path={mdiDeleteCircle} className="punto" />
              </div>
            </div>
          ))}
        </div>

        <div className="carrito_footer">
          <h3>Total: $4234</h3>
          <button className="btn">Comprar</button>
        </div>
      </div>
    </div>
  );
};
