import React from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom" ;
import  Tienda  from '../Paginas/Tienda';
import Inicio from '../Paginas/Inicio';
import Login from '../Paginas/Login';



export const  Paginas = ( ) => {
  return (
    <BrowserRouter>
    <Routes>
   <Route path="/tienda" element={<Tienda/> }/>
   <Route path="/" element={<Inicio/>}/>
   <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
 
  )
}
