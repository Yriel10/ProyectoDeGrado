import Carousel from "react-bootstrap/Carousel";


function Carrusel() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../../imagenes/carrusel1.jpg"
            alt="First slide"
             height={600}
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../../imagenes/carrusel3.jpg"
            alt="Second slide"
            height={600}
          />

          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../../imagenes/carruse1.jpg"
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
