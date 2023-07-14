import React from 'react'
import Menu from '../Componetes/Menu2'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Footers from '../Componetes/Footers';

export default function FormularioRegistro() {
  return (
    <div>
        <Menu/>
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage:''}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px', background:'linear-gradient(0deg, rgba(7,212,255,1) 0%, rgba(24,234,118,1) 100%)'}}>
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
    </MDBContainer>
        <Footers/>
    </div>
  )
}
