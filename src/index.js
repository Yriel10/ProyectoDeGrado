import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import {BrowserRouter as Router} from 'react-router-dom'
import Inicio from "./Paginas/Inicio";
import { Paginas } from "./Routes/Paginas";
import { DataProvider } from "./context/Dataprovider";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
<DataProvider>
<Paginas/>
</DataProvider>
  </div>
);
