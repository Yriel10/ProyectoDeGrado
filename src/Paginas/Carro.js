import React, { useContext } from "react";
import Icon from "@mdi/react";
import {
  mdiClose,
  mdiTriangle,
  mdiTriangleDown,
  mdiDeleteCircle,
} from "@mdi/js";
import "../Assest/carro.css";
import { DataContext } from "../context/Dataprovider";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const Carro = (props) => {
  const value = useContext(DataContext);
  const { carro, setCarro } = props;
  const carrito = value.carrito;
  const setCarrito = value.setCarrito;
  const cantidadPorProducto = value.cantidadPorProducto;
  const total = value.total;
  const setCantidadPorProducto = value.setCantidadPorProducto;
  let navigate = useNavigate();
  const setCartTotal = value.setTotal;

  const toofalse = () => {
    setCarro(false);
  };

  const show1 = carro ? "carritos show" : "carritos";
  const show2 = carro ? "carrito show" : "carrito";

  const resta = (idMedicamento) => {
    if (cantidadPorProducto[idMedicamento] > 1) {
      const updatedCantidadPorProducto = {
        ...cantidadPorProducto,
        [idMedicamento]: cantidadPorProducto[idMedicamento] - 1,
      };
      setCantidadPorProducto(updatedCantidadPorProducto);
      
      // Actualizar el carrito con la nueva cantidad
      const updatedCarrito = carrito.map((item) => {
        if (item.idMedicamento === idMedicamento) {
          return {
            ...item,
            cantidad: updatedCantidadPorProducto[idMedicamento],
          };
        }
        return item;
      });
      setCarrito(updatedCarrito);

      // Actualizar el almacenamiento local
      localStorage.setItem("dataCarrito", JSON.stringify(updatedCarrito));
    }
  };

  const suma = (idMedicamento) => {
    const updatedCantidadPorProducto = {
      ...cantidadPorProducto,
      [idMedicamento]: (cantidadPorProducto[idMedicamento] || 1) + 1,
    };
    setCantidadPorProducto(updatedCantidadPorProducto);

    // Actualizar el carrito con la nueva cantidad
    const updatedCarrito = carrito.map((item) => {
      if (item.idMedicamento === idMedicamento) {
        return {
          ...item,
          cantidad: updatedCantidadPorProducto[idMedicamento],
        };
      }
      return item;
    });
    setCarrito(updatedCarrito);

    // Actualizar el almacenamiento local
    localStorage.setItem("dataCarrito", JSON.stringify(updatedCarrito));
  };
  const addToCart = () => {
    let calculatedTotal = 0;
    carrito.forEach((producto) => {
      calculatedTotal +=
        (cantidadPorProducto[producto.idMedicamento] || 1) * producto.precio;
    });

    localStorage.setItem("cartTotal", calculatedTotal);
    setCartTotal(calculatedTotal); // Actualizar el estado del total
    const cookies = new Cookies();
    cookies.set("cartTotal", calculatedTotal, { path: "/pago" });
    navigate("/pago");
  };

  const removeProducto = (idMedicamento) => {
    swal({
      title:"Eliminar" ,
      text: '¿Quieres eliminar este articulo?',
      icon:"warning",
      buttons:["No","Si"]
    }).then(respuesta=>{
      if(respuesta){
        swal({text:"Se a eliminado",
      icon:"success"})
      setCarrito(
        carrito.filter((item) => item.idMedicamento !== idMedicamento)
      );
      setCantidadPorProducto({
        ...cantidadPorProducto,
        [idMedicamento]: 1, // Reiniciar la cantidad a 1 después de eliminar del carrito
      });
    }

  })
  

  };
  return (
    <div className={show1}>
      <div className={show2}>
        <div className="carrito_close" onClick={toofalse}>
          <Icon path={mdiClose} className="icono" />
        </div>
        <h2>Su carrito</h2>

        <div className="carrito_center">
          {carrito.length === 0 ? (
            <h2
              style={{
                textAlign: "center",
                fontSize: "3rem",
              }}
            >
              carrito Vacio
            </h2>
          ) : (
            <>
              {carrito.map((productos) => (
                <div className="carrito_item" key={productos.idMedicamento}>
                  <img src={productos.foto} alt=""></img>

                  <div>
                    <h3>{productos.nombre}</h3>
                    <p className="price">${productos.precio}</p>
                  </div>
                  <div>
                    <Icon
                      path={mdiTriangle}
                      className="punto"
                      onClick={() => suma(productos.idMedicamento)}
                    />
                    <p className="cantidad">
                      {cantidadPorProducto[productos.idMedicamento] || 1}
                    </p>
                    <Icon
                      path={mdiTriangleDown}
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
            </>
          )}
        </div>

        <div className="carrito_footer">
          <h3>Total: ${total}</h3>
          <button className="btn" onClick={() => addToCart()}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};
