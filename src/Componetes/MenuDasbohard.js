import "../Assest/Sidebar.css";
import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount,mdiMultimedia,mdiStore } from "@mdi/js";

function MenuDasbohard() {
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
            <NavLink to="" className="text-dark">Tienda</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuDasbohard;
