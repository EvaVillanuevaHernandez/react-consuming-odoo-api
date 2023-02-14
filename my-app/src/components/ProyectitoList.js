import React, { useState, useEffect } from "react";
import ProyectitoService from "../services/ProyectitoService";
import { Link } from "react-router-dom";

const ProyectitoList = () => {
  const [proyectitos, setProyectitos] = useState([]);
  const [currentProyectitos, setCurrentProyectitos] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchProyectito, setSearchProyectito] = useState("");

  useEffect(() => {
    retrieveProyectitos();
  }, []);

  const onChangeSearchProyectito = e => {
    const searchProyectito = e.target.value;
    setSearchProyectito(searchProyectito);
  };

  const retrieveProyectitos = () => {
    ProyectitoService.getAll()
      .then(response => {
        setProyectitos(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProyectitos();
    setCurrentProyectitos(null);
    setCurrentIndex(-1);
  };

  const setActiveProyectitos = (proyectitos, index) => {
    setCurrentProyectitos(proyectitos);
    setCurrentIndex(index);
  };

  const removeAllProyectitos = () => {
    ProyectitoService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByProyectito = () => {

    if(searchProyectito === '') {
      refreshList();
      return;
    }

    ProyectitoService.findByProyectito(searchProyectito)
      .then(response => {
        setProyectitos(response.data.result.response);
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
            value={searchProyectito}
            onChange={onChangeSearchProyectito}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByProyectito}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>ProyectitoList</h4>

        <ul className="list-group">
          {proyectitos &&
            proyectitos.map((proyectitos, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProyectitos(proyectitos, index)}
                key={index}
              >
                {proyectitos.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllProyectitos}>
          Remove All
        </button>

      </div>

      <div className="col-md-6">
        {currentProyectitos ? (
          <div>
            <h4>Proyectitos</h4>
            <div>
              <label>
                <strong>project:</strong>
              </label>{"project"}
              {currentProyectitos.project}
            </div>
            
            <Link
              to={"/app/proyectito/" + currentProyectitos.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Proyectitos...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProyectitoList;
