import React from "react";
import "../Assest/map.css";
export default function mapa() {
  return (
    <>
      <div className="element">
        <span className="Ubicacion">Ubicacion</span>
        <div className="columnas">
          <div className="maps">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d683.2225070110093!2d-70.16575245390588!3d18.254597079470898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea54520f79f2d61%3A0x42142e3703e5a5bd!2sFarmacia%20Jehov%C3%A1%20Rafha%20(Sanador)%20palenque!5e0!3m2!1ses-419!2sdo!4v1688958656335!5m2!1ses-419!2sdo"
              width="100%"
              height="350"
              style={{
                border: 0,
                allowfullscreen: "",
                loading: "lazy",
                referrerpolicy: "no-referrer-when-downgrade",
              }}
            ></iframe>
          </div>
          <div className="horario">
            <span className="titulo">Horario</span>
            <p>
              Lunes 8:00AM–09:00PM{<br />}
              Martes 8:00AM–09:00PM{<br />}
              Miércoles 8:00AM–09:00PM{<br />}
              Jueves 8:00AM–09:00PM{<br />}
              Viernes 8:00AM–05:00PM{<br />}
              Sábado Cerrado{<br />}
              Domingo 8:00AM–08:00PM{<br />}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
