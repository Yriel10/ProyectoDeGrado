import React, { useState,useEffect } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
from 'mdb-react-ui-kit';
import Menu from '../Componetes/Menu2';
import Cookies from 'universal-cookie';
import axios from 'axios';
import md5 from 'md5';
import Button from 'react-bootstrap/Button';



function Login() {
  const baseUrl="https://localhost:7151/api/usuario";
  const cookies = new Cookies();

  const [form, setForm]=useState({
    correo:'',
    contrasena:''
  });
  const handleChange=e=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]:value
    });
    console.log(form);
  }
  const iniciarSesion=async()=>{
    await axios.get(baseUrl+`/${form.correo}/${(form.contrasena)}`)
      .then(response =>{
        return response.data;
      }).then(response=>{
        if(response.length>0){
          var respuesta=response[0];
          console.log(respuesta);
        }else{
          alert('El usuario o la contraseña son incorrectos')
        }
      })
      .catch(error=>{
        console.log(error);
      })
  }
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    
    <>
    <div>
      < Menu/>
    </div>
    <div>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' name='correo' onChange={handleChange}/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name='contrasena'onChange={handleChange}/>
   

      <div className="d-flex justify-content-between mx-3 mb-4">

        <a href="!#">Forgot password?</a>
      </div>
      <Button
      variant="primary"
      disabled={isLoading}
      onClick={()=>iniciarSesion()}
    >
      {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
    </Button>
    
      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>

      </div>

    </MDBContainer>
    </div>
    </>
  );
}

export default Login;