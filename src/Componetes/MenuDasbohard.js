import React, { useEffect } from "react";
import "../Assest/Sidebar.css";
import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiMultimedia,
  mdiStore,
  mdiBookClock,
  mdiPackageVariant,
  mdiSale,
  mdiBell,
  mdiListBox,
  mdiTextBoxEditOutline,
  mdiAssistant,
  mdiClipboardTextClock,
} from "@mdi/js";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function MenuDasbohard() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const roles = cookies.get("rol");

  useEffect(() => {
    if (roles === "Usuario" || roles === "Cliente" || roles === undefined) {
      navigate("/");
    }
  }, [roles, navigate]);

  // Define qué elementos de menú mostrar según el valor de 'roles'
  const renderMenuItems = () => {
    if (roles === "Cajero") {
      return (
        <>
          <li>
            <Icon path={mdiAccount} size={1} />
            <NavLink to="/dashboard" className="text-dark">
              Usuarios
            </NavLink>
          </li>
          <li>
            <Icon path={mdiMultimedia} size={1} />
            <NavLink to="/dashboardMultimedia" className="text-dark">
              Multimedias
            </NavLink>
          </li>
          <li>
            <Icon path={mdiStore} size={1} />
            <NavLink to="/dashboardProductos" className="text-dark">
              Tienda
            </NavLink>
          </li>
          <li>
            <Icon path={mdiPackageVariant} size={1} />
            <NavLink to="/dashboardPedidos" className="text-dark">
              Pedidos
            </NavLink>
          </li>
          <li>
            <Icon path={mdiBookClock} size={1} />
            <NavLink to="/dashboardFactura" className="text-dark">
              Historial de venta
            </NavLink>
          </li>
          <li>
            <Icon path={mdiSale} size={1} />
            <NavLink to="/dashboardOfertas" className="text-dark">
              Ofertas
            </NavLink>
          </li>
          <li>
            <Icon path={mdiBell} size={1} />
            <NavLink to="/dashboardNotificaciones" className="text-dark">
              Notificaciones
            </NavLink>
          </li>
          <li>
            <Icon path={mdiListBox} size={1} />
            <NavLink to="/dashboardSolicitud" className="text-dark">
              Solicitudes
            </NavLink>
          </li>
          <li>
            <Icon path={mdiTextBoxEditOutline} size={1} />
            <NavLink to="/dashboardInventario" className="text-dark">
              Inventario
            </NavLink>
          </li>
          <li>
            <Icon path={mdiAssistant} size={1} />
            <NavLink to="/dashboardAsistencia" className="text-dark">
              Asistencia
            </NavLink>
          </li>
        </>
      );
    } else if (roles === "Delivery") {
      return (
        <>
          <li>
            <Icon path={mdiPackageVariant} size={1} />
            <NavLink to="/dashboardPedidos" className="text-dark">
              Pedidos
            </NavLink>
          </li>
        </>
      );
    } else {
      // El valor de 'roles' es diferente de "Cajero" y "Delivery", muestra el menú completo
      return (
        <>
          <li>
            <Icon path={mdiAccount} size={1} />
            <NavLink to="/dashboard" className="text-dark">
              Usuarios
            </NavLink>
          </li>
          <li>
            <Icon path={mdiMultimedia} size={1} />
            <NavLink to="/dashboardMultimedia" className="text-dark">
              Multimedias
            </NavLink>
          </li>
          <li>
            <Icon path={mdiStore} size={1} />
            <NavLink to="/dashboardProductos" className="text-dark">
              Tienda
            </NavLink>
          </li>
          <li>
            <Icon path={mdiPackageVariant} size={1} />
            <NavLink to="/dashboardPedidos" className="text-dark">
              Pedidos
            </NavLink>
          </li>
          <li>
            <Icon path={mdiBookClock} size={1} />
            <NavLink to="/dashboardFactura" className="text-dark">
              Historial de venta
            </NavLink>
          </li>
          <li>
            <Icon path={mdiSale} size={1} />
            <NavLink to="/dashboardOfertas" className="text-dark">
              Ofertas
            </NavLink>
          </li>
          <li>
            <Icon path={mdiBell} size={1} />
            <NavLink to="/dashboardNotificaciones" className="text-dark">
              Notificaciones
            </NavLink>
          </li>
          <li>
            <Icon path={mdiListBox} size={1} />
            <NavLink to="/dashboardSolicitud" className="text-dark">
              Solicitudes
            </NavLink>
          </li>
          <li>
            <Icon path={mdiTextBoxEditOutline} size={1} />
            <NavLink to="/dashboardInventario" className="text-dark">
              Inventario
            </NavLink>
          </li>
          <li>
            <Icon path={mdiAssistant} size={1} />
            <NavLink to="/dashboardAsistencia" className="text-dark">
              Asistencia
            </NavLink>
          </li>
          <li>
            <Icon path={mdiClipboardTextClock} size={1} />
            <NavLink to="/dashboardLogs" className="text-dark">
              Historial de acciones
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <div className="sidebar">
      <ul>{renderMenuItems()}</ul>
    </div>
  );
}

export default MenuDasbohard;
