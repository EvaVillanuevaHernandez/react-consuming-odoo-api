import React, { useEffect } from "react";
import { BrowserRouter as Router,Routes, Route, Link, Navigate } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import ProyectitoService from "./services/ProyectitoService";
import ProyectitoList from "./components/ProyectitoList";
function App() {
  
  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      ProyectitoService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {/* <a href="/app/proyectitos.png" className="navbar-brand">
          <div className="contratador-logo" >
            <img src="/app/empresas_contratadoras.png" alt="Proyectitos" />
          </div>
        </a> */}
        {/* <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/app/proyectitos"} className="nav-link">
              Empresas_contratadoras
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div> */}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/*" element={<ProyectitoList/>} />
          {/* <Route path="/app/proyectitos" element={<ProyectitoList />} /> */}
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
          />
        </Routes>
      </div>
    </div>
  );
}


export default App;
