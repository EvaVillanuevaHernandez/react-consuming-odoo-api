import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEmpresas_contratadoras from "./components/AddEmpresas_contratadoras";
import Empresas_contratadoras from "./components/Empresas_contratadoras";
import Empresas_contratadorasList from "./components/Empresas_contratadorasList";

import Empresas_contratadorasService from "./services/Empresas_contratadorasService";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      Empresas_contratadorasService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app/empresas_contratadoras.png" className="navbar-brand">
          <div className="contratador-logo" >
            <img src="/app/empresas_contratadoras.png" alt="Empresas_contratadoras" />
          </div>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/app/empresas_contratadoras"} className="nav-link">
              Empresas_contratadoras
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/app" element={<Empresas_contratadorasList />} />
          <Route path="/app/empresas_contratadoras" element={<Empresas_contratadorasList />} />
          <Route path="/app/add" element={<AddEmpresas_contratadoras />} />
          <Route path="/app/empresas_contratadoras/:id" element={<Empresas_contratadoras />} />
          <Route path="/" element={<Navigate to="/app" />} />
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
