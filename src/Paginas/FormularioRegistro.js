import React from 'react'
import Menu from '../Componetes/Menu2'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';
import Footers from '../Componetes/Footers';
import '../Assest/registro.css'

export default function FormularioRegistro() {
  return (
    <>
    <div>
        <Menu/>
       
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{background:''}}>
        <div className='registro'>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Crear cuenta</h2>
          <MDBInput wrapperClass='mb-4' label='Nombre' size='lg' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Apellido' size='lg' id='form2' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Correo electronico' size='lg' id='form3' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Contraseña' size='lg' id='form4' type='password'/>
          <MDBInput wrapperClass='mb-4' label='Repite la contraseña' size='lg' id='form5' type='password'/>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Registrarse</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      </div>
    </MDBContainer>
  
        <Footers/>
        
    </div>
    </>
  )
}
