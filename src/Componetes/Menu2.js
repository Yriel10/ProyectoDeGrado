import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";
import "../Assest/menu.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";


function Menu(props) {
  const cookies= new Cookies();
  let navigate= useNavigate();
  const estado= cookies.get('id');
  const roles= cookies.get('rol');
  const rol = roles === undefined ? 'usuario' : roles.toString();
  const cerrarSesion=()=>{
    cookies.remove('id',{path:'/'});
    cookies.remove('nombres',{path:'/'});
    cookies.remove('apellidos',{path:'/'});
    cookies.remove('correo',{path:'/'});
    cookies.remove('rol',{path:'/'});
    navigate('/')

  }


  return (
    <div >
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Image
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
                <NavDropdown.Item href="/#nosotros">Nosotros</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div>
              <Icon path={mdiCartOutline} className="icon" />
              <span className="item-total">54</span>
            </div>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Buscar"
              />
              <Button className="warning">Buscar</Button>
            </Form>
            <NavDropdown
              title={
                <div className="">
                  <img
                    className="fotoPerfil"
                    src="../imagenes/nombreFarmacia.jpg"
                    alt=""
                  />
                </div>
              }
              id="basic-nav-dropdown" 
            >
              <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
              {(estado=== undefined) ?<NavDropdown.Item href="/login">Login</NavDropdown.Item>:<NavDropdown.Item href="/" onClick={()=>cerrarSesion()}>Logout</NavDropdown.Item>}
              {(rol=== 'Administrador') ?(<NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>):<NavDropdown.Item href="/"></NavDropdown.Item>}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Menu;
