import React from 'react';
import IMG from "../Assest/imagenes/amoxicilina.png";
import "../Assest/productos.css";

export const Productos = ({
           idMedicamento,
           foto,
           categoria,
           precio,
           nombre
})=> {


  return (
    <div>
          <h1 className="title">Productos</h1>
      <div className="productos">
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={foto} alt={nombre} />
            </div>
          </a>
          <div className="producto_footer">
            <h1>{nombre}</h1>
            <p> {categoria}</p>
            <p className="price">{precio}$</p>
          </div>
          <div className="buttom">
            <button className="btn">Añadir al carrito</button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
