import React from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom" ;
import  Tienda  from '../Paginas/Tienda';
import Inicio from '../Paginas/Inicio';
import Login from '../Paginas/Login';

import Dashboard from '../Paginas/Dashboard';
import DashboardMultimedia from '../Paginas/DashboardMultimedia';
import {Carro} from '../Paginas/Carro'
import DashboardFacturas from '../Paginas/DashboarFacturas';
import DashboardProductos from '../Paginas/DashboarProductos';
import Checkout from '../Paginas/Checkout';
import Pefil from '../Paginas/Pefil';
import DashboardNotificaciones from '../Paginas/DashboardNotificaciones';
import DashboarOfertas from '../Paginas/DashboarOfertas';
import DashboardPedidos from '../Paginas/DashboardPedidos';
import Facturacion from '../Paginas/Facturacion';
import DashboardSolicitud from '../Paginas/DashboradSolicitud';
import DashboardInventario from '../Paginas/DashboardInventario';


export const  Paginas = ( ) => {
  return (
    <BrowserRouter>
    <Routes>
   <Route path="/tienda" element={<Tienda/> }/>
   <Route  path="/" element={<Inicio/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/carro' element={<Carro/>}/>

   <Route path='/dashboard' element={<Dashboard/>}/>
   <Route path='/dashboardMultimedia' element={<DashboardMultimedia/>}/>
   <Route path='/dashboardFactura' element={<DashboardFacturas/>}/>
   <Route path='/dashboardProductos' element={<DashboardProductos/>}/>
   <Route path='/dashboardOfertas' element={<DashboarOfertas/>}/>
   <Route path='/dashboardPedidos' element={<DashboardPedidos/>}/>
   <Route path='/dashboardSolicitud' element={<DashboardSolicitud/>}/>
   <Route path='/dashboardNotificaciones' element={<DashboardNotificaciones/>}/>
   <Route path='/pago' element={<Checkout />}/>
   <Route path='/perfil' element={<Pefil />}/>
   <Route path='/facturacion' element={<Facturacion />
   }/>
    <Route path='/dashboardInventario' element={<DashboardInventario />
   }/>
    </Routes>
    </BrowserRouter>
 
  )
}
