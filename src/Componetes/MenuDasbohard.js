import "../Assest/Sidebar.css";
import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount,mdiMultimedia,mdiStore,mdiBookClock,mdiPackageVariant,mdiSale,mdiBell,mdiListBox,mdiTextBoxEditOutline,mdiAssistant } from "@mdi/js";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MenuDasbohard() {

  const cookies= new Cookies();
  const navigate= useNavigate();
  const roles= cookies.get('rol');

  useEffect(() => {
    if (roles === "Usuario" || roles === "Cliente" ||roles=== undefined) {
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
          <Icon path={mdiPackageVariant} size={1} />
            <NavLink to="/dashboardPedidos" className="text-dark">Pedidos</NavLink>
          </li>
          <li>
          <Icon path={mdiBookClock} size={1} />
            <NavLink to="/dashboardFactura" className="text-dark">Historial de venta</NavLink>
          </li>
          <li>
          <Icon path={mdiSale} size={1} />
            <NavLink to="/dashboardOfertas" className="text-dark">Ofertas</NavLink>
          </li>
          <li>
          <Icon path={mdiBell} size={1} />
            <NavLink to="/dashboardNotificaciones" className="text-dark">Notificaciones</NavLink>
          </li>
          <li>
          <Icon path={mdiListBox} size={1} />
            <NavLink to="/dashboardSolicitud" className="text-dark">Solicitudes</NavLink>
          </li>
          <li>
          <Icon path={mdiTextBoxEditOutline} size={1} />
            <NavLink to="/dashboardInventario" className="text-dark">Inventario</NavLink>
          </li>
          <li>
          <Icon path={mdiAssistant} size={1} />
            <NavLink to="/dashboardAsistencia" className="text-dark">Asistencia</NavLink>
          </li>
          
          
          
        </ul>
      </div>
    </>
  );
}

export default MenuDasbohard;
