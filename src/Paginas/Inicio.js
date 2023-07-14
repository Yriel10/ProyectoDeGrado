import React from 'react'
import Carrusel from "../Componetes/Carrusel";
import Cards from "../Componetes/Cards";
import Footers from "../Componetes/Footers";
import ResponsiveAppBar from "../Componetes/Menu";
import Menu from "../Componetes/Menu2";
import Mapa from '../Componetes/mapa';

export default function Inicio() {
  return (
    <>
    <div>
    <Menu/>
   </div>
   <div>
   <div className="carrusel">
     <Carrusel></Carrusel>
     <div className="cards" id='ofertas'>
       <Cards />
     </div>
     <div>
     </div>
     <div id='ubicacion'>
        <Mapa/>
     </div>
   </div>
   <div id='#acerca de'>
   <Footers></Footers>
   </div>
     </div>
     </>
    
  )
}
