import React, { useState, useEffect } from "react";
import Menu from "../Componetes/Menu2";
import axios from "axios";
import Footers from "../Componetes/Footers";
import MenuDasbohard from "../Componetes/MenuDasbohard";

export default function DashboardSolicitud() {
  const baseUrl = "https://localhost:7151/api/solicitud";
  const [data, setData] = useState([]);
 

  const peticionesGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionesPut = async (solicitud) => {
    try {
      solicitud.estado = 'Completo'; // Asegúrate de establecer el estado en "completo" aquí
  
      const response = await axios.put(baseUrl + "/" + solicitud.idSolicitud, solicitud);
      if (response.status === 200) {
       
      } else {
        console.error("Error al actualizar la solicitud.");
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
    peticionesGet();
  };

  const peticionesPutincompleto = async (solicitud) => {
    try {
      solicitud.estado = 'Incompleto'; // Asegúrate de establecer el estado en "completo" aquí
  
      const response = await axios.put(baseUrl + "/" + solicitud.idSolicitud, solicitud);
      if (response.status === 200) {
       peticionesGet();
      } else {
        console.error("Error al actualizar la solicitud.");
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
    peticionesGet();
  };
  
  
  

  useEffect(() => {
    peticionesGet();
  }, []);
  return (
    <div>
      <div>
        <div>
          <Menu />
        </div>
        <div className="flex">
          <MenuDasbohard />

          <div className="content">
            <br />
            <br />
            <br />
            <br />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Correo</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Id Usuario</th>
               
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((gestor) => (
                    <tr key={gestor.idSolicitud}>
                      <td>{gestor.idSolicitud}</td>
                      <td>{gestor.correo}</td>
                      <td>{gestor.descripcion}</td>
                      <td>{gestor.estado}</td>
                      <td>{gestor.idUsuario}</td>'
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => peticionesPut(gestor)}
                        >
                          Completado
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => peticionesPutincompleto(gestor)}
                        >
                          Incompleto
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <Footers />
      </div>
    </div>
  );
}
