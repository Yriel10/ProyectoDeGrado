import Carousel from "react-bootstrap/Carousel";
import POR1 from '../Assest/imagenes/Por1.png';
import POR2 from '../Assest/imagenes/por2.png';
import POR3 from '../Assest/imagenes/por3.png';

function Carrusel() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={POR1}
            alt="First slide"
   
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={POR2}
            alt="Second slide"

          />

          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={POR3}
            alt="Third slide"
          />

          <Carousel.Caption>
     
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carrusel;
