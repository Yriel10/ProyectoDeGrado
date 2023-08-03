
import "../Assest/Sidebar.css";
import { Link } from "react-router-dom";

function MenuDasbohard() {
  return (
   <>
   <div className="sidebar">
    <ul>
      <li>
        <Link to="">Usuarios</Link>
      </li>
      <li>
        <Link to="">Multimedias</Link>
      </li>
      <li>
        <Link to="">Medicamentos</Link>
      </li>
    </ul>

   </div>
   </>
  );
}

export default MenuDasbohard;
