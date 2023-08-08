import "../Assest/Sidebar.css";
import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount,mdiMultimedia,mdiStore,mdiBookClock,mdiCreditCard } from "@mdi/js";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MenuDasbohard() {

  const cookies= new Cookies();
  const navigate= useNavigate();
  const roles= cookies.get('rol');

  useEffect(() => {
    if (roles !== "Administrador") {
      navigate("/"); 
    }
  }, [roles, navigate]);
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Icon path={mdiAccount} size={1} />
            <NavLink to="/dashboard" className="text-dark">Usuarios</NavLink>
          </li>
          <li>
          <Icon path={mdiMultimedia} size={1} />
            <NavLink to="/dashboardMultimedia" className="text-dark">Multimedias</NavLink>
          </li>
          <li>
          <Icon path={mdiStore} size={1} />
            <NavLink to="/dashboardProductos" className="text-dark">Tienda</NavLink>
          </li>
          <li>
          <Icon path={mdiCreditCard} size={1} />
            <NavLink to="" className="text-dark">Venta</NavLink>
          </li>
          <li>
          <Icon path={mdiBookClock} size={1} />
            <NavLink to="/dashboardFactura" className="text-dark">Historial de venta</NavLink>
          </li>
          
        </ul>
      </div>
    </>
  );
}

export default MenuDasbohard;
