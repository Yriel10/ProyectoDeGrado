import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "../Assest/productos.css";
import { DataContext } from '../context/Dataprovider';

export const Productos = ({
           idMedicamento,
           foto,
           categoria,
           precio,
           nombre
})=> {

 const value= useContext(DataContext);
 const addCarrito= value.addCarrito;
  return (
    <div>
         
      
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={foto} alt={nombre} />
            </div>
          </a>
          <div className="producto_footer">
            <h1>{nombre}</h1>
            <p> {categoria}</p>
            <p className="price">${precio}</p>
          </div>
          <div className="buttom">
            <button className="btn" onClick={()=>addCarrito(idMedicamento)}>Añadir al carrito</button>
            
          </div>
        </div>
        
      
    </div>
  )
}
