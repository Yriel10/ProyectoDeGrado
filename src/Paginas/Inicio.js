import React from "react";
import Carrusel from "../Componetes/Carrusel";
import Cards from "../Componetes/Cards";
import Footers from "../Componetes/Footers";
import Menu from "../Componetes/Menu2";
import Mapa from "../Componetes/mapa";
import Nosotros from "../Componetes/Nosotros";
import VentanaFlotante from "../Componetes/VentanaFlotante";

export default function Inicio() {
  return (
    <>
      <div>
        <Menu />
      </div>
      <div className="carrusel">
        <Carrusel></Carrusel>
      </div>
      
      <div className="cards" id="ofertas">
        <Cards />
      </div>
      <div id="ubicacion">
        <Mapa />
      </div>
      <div id="nosotros">
        <Nosotros />
      </div>
      <div>
        <VentanaFlotante/>
      </div>
      <div >
        <Footers></Footers>
      </div>
    </>
  );
}
