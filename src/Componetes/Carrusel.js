import Carousel from "react-bootstrap/Carousel";


function Carrusel() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../../imagenes/maestria-en-emergencia.jpg"
            alt="First slide"
             height={600}
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../../imagenes/en-generico-medicamentos-con-valor-anadido.jpg"
            alt="Second slide"
            height={600}
          />

          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../../imagenes/140311885_632088054188072_3586911874959006694_n.jpg"
            alt="Third slide"
            height={600}
          />

          <Carousel.Caption>
     
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carrusel;
