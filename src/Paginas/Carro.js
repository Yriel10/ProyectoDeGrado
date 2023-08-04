import React from "react";
import Icon from "@mdi/react";
import {
  mdiClose,
  mdiArrowUpDropCircle,
  mdiArrowDownDropCircle,
  mdiDeleteCircle,
} from "@mdi/js";
import card from "../Assest/imagenes/Amoxicilina-1-1200x600.png";
import "../Assest/carro.css";


export const Carro = (props) => {
    const {carro, setCarro} = props;

  const toofalse = () => {
    setCarro(false);
  };

    const show1= carro ? 'carritos show':'carritos';
    const show2= carro ? 'carrito show': 'carrito'
  return (
    <div className={show1}>
      <div className={show2}>
        <div className="carrito_close" onClick={toofalse}>
          <Icon path={mdiClose} className="icono" />
        </div>
        <h2>Su carrito</h2>
        <div className="carrito_center">
          <div className="carrito_item">
            <img src={card} alt=""></img>

            <div>
              <h3>Title</h3>
              <p className="price">$345</p>
            </div>
            <div>
              <Icon path={mdiArrowUpDropCircle} className="punto" />
              <p className="cantidad">1</p>
              <Icon path={mdiArrowDownDropCircle} className="punto" />
            </div>
            <div className="remove_item">
            <Icon path={mdiDeleteCircle} className="punto" />
            </div>
          </div>
        </div>
        <div className="carrito_footer">
          <h3>Total: $4234</h3>
          <button className="btn">Comprar</button>
        </div>
      </div>
    </div>
  );
};
