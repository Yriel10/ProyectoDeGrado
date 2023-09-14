import React from "react";
import IMG from "../Assest/imagenes/140591613_632466724150205_7129466572063121409_n.jpg";
import "../Assest/nosotros.css";
export default function Nosotros() {
  return (
    <div>
      <div>
        <span className="titulo">Nosotros</span>
        <p className="informacion">
          Este proyecto comenzó en el 2017 por Elvis Valdez y Yeleini Peguero
          cuando aún estos eran novios en Najayo la playa quedó nuestro primer
          local, luego por algunas exigencias del ministerio de Salud pública{" "}
          {<br />}tuvimos que cambiar de local, este se instaló en Sabana
          palenque y reabrimos nuestras puertas en el 2021{<br />} ya que el
          proceso se atrasó un tiempo por el COVID 19 y los procesos se tardaron
          más tiempo de lo requerido.{<br/>}Nuestra farmacia cuenta con contratos
          con farmacias mas grandes para poder obtener medicamentos que la comunidad necesita
          estamos trabajando para llevar la salud a nuestro municipio.
        </p>
       
     
      </div>
    </div>
  );
}
