import React, { useState, useEffect } from "react";
import Empresas_contratadorasDataService from "../services/Empresas_contratadorasService";
import { Link } from "react-router-dom";

const Empresas_contratadorasList = () => {
  const [empresas_contratadoras, setEmpresas_contratadoras] = useState([]);
  const [currentEmpresas_contratadoras, setCurrentEmpresas_contratadoras] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchEmpresa, setSearchEmpresa] = useState("");

  useEffect(() => {
    retrieveEmpresas_contratadoras();
  }, []);

  const onChangeSearchEmpresa = e => {
    const searchEmpresa = e.target.value;
    setSearchEmpresa(searchEmpresa);
  };

  const retrieveEmpresas_contratadoras = () => {
    Empresas_contratadorasDataService.getAll()
      .then(response => {
        setEmpresas_contratadoras(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveEmpresas_contratadoras();
    setCurrentEmpresas_contratadoras(null);
    setCurrentIndex(-1);
  };

  const setActiveEmpresas_contratadoras = (empresas_contratadoras, index) => {
    setCurrentEmpresas_contratadoras(empresas_contratadoras);
    setCurrentIndex(index);
  };

  const removeAllEmpresas_contratadoras = () => {
    Empresas_contratadorasDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByEmpresa = () => {

    if(searchEmpresa === '') {
      refreshList();
      return;
    }

    Empresas_contratadorasDataService.findByEmpresa(searchEmpresa)
      .then(response => {
        setEmpresas_contratadoras(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by empresa"
            value={searchEmpresa}
            onChange={onChangeSearchEmpresa}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByEmpresa}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Empresas_contratadoras List</h4>

        <ul className="list-group">
          {empresas_contratadoras &&
            empresas_contratadoras.map((empresas_contratadoras, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveEmpresas_contratadoras(empresas_contratadoras, index)}
                key={index}
              >
                {empresas_contratadoras.empresa}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllEmpresas_contratadoras}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentEmpresas_contratadoras ? (
          <div>
            <h4>Empresas contratadoras</h4>
            <div>
              <label>
                <strong>Número de contrato:</strong>
              </label>{" "}
              {currentEmpresas_contratadoras.name}
            </div>
            <div>
              <label>
                <strong>Empresa:</strong>
              </label>{" "}
              {currentEmpresas_contratadoras.empresa}
            </div>
            <div>
              <label>
                <strong>Tipo de contrato:</strong>
              </label>{" "}
              {currentEmpresas_contratadoras.contrato}
            </div>
            <div>
              <label>
                <strong>Pago por horas:</strong>
              </label>{" "}
              {currentEmpresas_contratadoras.pago}
            </div>

            <div>
              <label>
                <strong>Horas trabajadas:</strong>
              </label>{" "}
              {currentEmpresas_contratadoras.horas}
            </div>

            <div>
              <label>
                <strong>Descripción:</strong>
              </label>{" "}
              {currentEmpresas_contratadoras.description}
            </div>

            <Link
              to={"/app/empresas_contratadoras/" + currentEmpresas_contratadoras.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Empresas_contratadoras...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Empresas_contratadorasList;
