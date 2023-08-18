import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import 'react-bootstrap'
import { useState } from "react";
import { useEffect, useContext } from "react";
import Cookies from "universal-cookie"
import axios from "axios";
import { DataContext } from "../context/Dataprovider";
import Menu from "../Componetes/Menu2";


const stripePromise = loadStripe(
  "pk_test_51NdQwhK5dimFIS68dRSAh9fs2t7uGmuU3wwQr5QgHS80YkY8sll0kbt4TraeVxHsu5N6ljKyX71PUIspbBIfj2YF00n0rI48wh"
);
const CheckoutForm = ({ cartTotal }) => {

console.log(cartTotal)
    const element= useElements();
    const stripe = useStripe();

  const handleSubmit = async (e) => {
    e.preventDefault();

   const {error, paymentMethod}= await stripe.createPaymentMethod({
        type:'card',
        card: element.getElement(CardElement)
    });
if (!error){
  const { id } = paymentMethod;

  try {
    const response = await axios.post("https://localhost:7151/api/PagoLinea", {
      id,
      amount: cartTotal 
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error al realizar el pago:", error);
  }
} else {
  console.log(error.message);
}
};

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      {/*debo poner los productos a comprar aqui*/}
      <div className="form-group">

      <CardElement className="form-control"/>
      </div>
   
      <button className="btn btn-primary" onClick={handleSubmit}>Comprar</button>
    </form>
  );
};
export default function Checkout() {
  const [cartTotal, setCartTotal] = useState(0);
  const { setTotal } = useContext(DataContext);

  useEffect(() => {
    // Obtiene el total almacenado en la cookie usando universal-cookie
    const cookies = new Cookies();
    const cartTotalFromCookie = cookies.get("cartTotal");
    
    // Si hay un valor en la cookie, establece el total actual
    if (cartTotalFromCookie) {
      setCartTotal(parseFloat(cartTotalFromCookie));
    }
  }, []);

  const handleVerTotalClick = () => {
    setTotal(cartTotal); // Actualizar el total en el contexto
    window.location.reload(); // Recargar la página
  };
  return (
    <>
    <div>
      <Menu/>
    </div>
    <Elements stripe={stripePromise}>
        <div className="container p-4">
            <div className="row">
                <div className="col-sm-9 bg-light p-3 border">
                <h2>Total del Carrito: ${cartTotal}</h2>
                <button onClick={handleVerTotalClick} className="btn btn-primary">ver total</button>
                <CheckoutForm cartTotal={cartTotal}/>
                </div>
            </div>
        </div>

    </Elements>
    </>
  );
}