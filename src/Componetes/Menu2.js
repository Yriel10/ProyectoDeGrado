import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";
import "../Assest/menu.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Carro } from "../Paginas/Carro";
import { DataContext } from "../context/Dataprovider";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Image } from "cloudinary-react";

function Menu(props) {
  const value = useContext(DataContext);
  const carrito = value.carrito;
  const [filtro, setFiltro] = useState("");
  const cookies = new Cookies();
  let navigate = useNavigate();
  const estado = cookies.get("id");

  const roles = cookies.get("rol");
  const foto = cookies.get("fotoPerfil");
  const fotoPerfil = foto ? foto.toString() : "https://res.cloudinary.com/dxy6tbr7v/image/upload/v1691128847/SistemaFarmacia/nombreFarmacia_exzjuw.jpg";
  console.log(fotoPerfil)
  const perfil = "https://res.cloudinary.com/dxy6tbr7v/image/upload/v1691128847/SistemaFarmacia/nombreFarmacia_exzjuw.jpg"; // Valor predeterminado en caso de que foto sea undefined

  const rol = roles === undefined ? "usuario" : roles.toString();

  const cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("nombres", { path: "/" });
    cookies.remove("apellidos", { path: "/" });
    cookies.remove("correo", { path: "/" });
    cookies.remove("rol", { path: "/" });
    cookies.remove("fotoPerfil", { path: "/" });
    navigate("/");
  };
  const filtrarDatos = (datos, consulta) => {
    return datos.filter((dato) =>
      dato.nombre.toLowerCase().includes(consulta.toLowerCase())
    );
  };

  const [carro, setCarro] = useState(false);
  console.log(foto);
  return (
    <>
      <div>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <img
              className="img"
              src="../imagenes/nombreFarmacia.jpg"
              width={50}
              height={50}
            />
            <Navbar.Brand href="/">Jehova Rapha</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link to="/" href="/">
                  Inicio
                </Nav.Link>
                <Nav.Link to="/tienda" href="tienda">
                  Tienda
                </Nav.Link>

                <NavDropdown title="Acerca de" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/#ofertas">Ofertas</NavDropdown.Item>
                  <NavDropdown.Item href="/#ubicacion">
                    Ubicacion
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/#nosotros">
                    Nosotros
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <div onClick={() => setCarro((prevState) => !prevState)}>
                <Icon path={mdiCartOutline} className="icon" />

                <span className="item-total">{carrito.length}</span>
              </div>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Buscar"
                  className="me-2"
                  aria-label="Buscar"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
                <Button
                  className="btn btn-primary"
                  onClick={() => {
                    const productosFiltrados = filtrarDatos(
                      value.productos,
                      filtro
                    );
                    navigate("/tienda", {
                      state: { productos: productosFiltrados },
                    });
                  }}
                >
                  Buscar
                </Button>
              </Form>
              <NavDropdown
                title={
                  <div className="dropdown-menuPerfil">
                    <Image
                      cloudName="dxy6tbr7v"
                      className="fotoPerfil"
                      publicId={perfil}
                      alt=""
                    />
                  </div>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                {estado === undefined ? (
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/" onClick={() => cerrarSesion()}>
                    Logout
                  </NavDropdown.Item>
                )}
                {rol === "Administrador" || rol=== "Cajero" || rol==="Delivery" ? (
                  <NavDropdown.Item href="/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/"></NavDropdown.Item>
                )}
              </NavDropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Carro carro={carro} setCarro={setCarro} />
      </div>
    </>
  );
}

export default Menu;
