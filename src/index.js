import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
