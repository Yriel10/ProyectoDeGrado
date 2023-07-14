import React from "react";
import "../Assest/productos.css";
import IMG from "../Assest/imagenes/amoxicilina.png";
import Menu from "../Componetes/Menu2";

export default function Tienda() {
  return (
    <>
    <Menu/>
      <h1 className="title">Productos</h1>
      <div className="productos">
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG} alt="" />
            </div>
          </a>
          <div className="producto_footer">
            <h1>Producto</h1>
            <p> Categoria</p>
            <p className="price">180$</p>
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
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG} alt="" />
            </div>
          </a>
          <div className="producto_footer">
            <h1>Producto</h1>
            <p> Categoria</p>
            <p className="price">180$</p>
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
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG} alt="" />
            </div>
          </a>
          <div className="producto_footer">
            <h1>Producto</h1>
            <p> Categoria</p>
            <p className="price">180$</p>
          </div>
          <div className="buttom">
            <button className="btn">Añadir al carrito</button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div><div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG} alt="" />
            </div>
          </a>
          <div className="producto_footer">
            <h1>Producto</h1>
            <p> Categoria</p>
            <p className="price">180$</p>
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
    </>
  );
}
