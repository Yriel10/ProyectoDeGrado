import React from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom" ;
import  Tienda  from '../Paginas/Tienda';
import Inicio from '../Paginas/Inicio';
import Login from '../Paginas/Login';
import FormularioRegistro from '../Paginas/FormularioRegistro';



export const  Paginas = ( ) => {
  return (
    <BrowserRouter>
    <Routes>
   <Route path="/tienda" element={<Tienda/> }/>
   <Route exact path="/" element={<Inicio/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/registro' element={<FormularioRegistro/>}/>
    </Routes>
    </BrowserRouter>
 
  )
}
