import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import  ProyectitoDataService from "../services/ProyectitoService";
import { Link } from 'react-router-dom';
import './Proyectito.css';
const Proyectito = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialProyectitoState = {
    id: null,
    name:"",
    proyecto: "",
    asignada:"",
    estado:"",
    bolita:""
    
  };
  const [currentProyectito, setCurrentProyectito] = useState(initialProyectitoState);
  const [message, setMessage] = useState("");

  const getProyectito = id => {
    ProyectitoDataService.get(id)
      .then(response => {
        setCurrentProyectito(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getProyectito(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProyectito({ ...currentProyectito, [name]: value });
  };

  const updateProyectito = () => {
    ProyectitoDataService.update(currentProyectito.id, currentProyectito)
      .then(response => {
        setMessage("The proyectito was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProyectito = () => {
    ProyectitoDataService.remove(currentProyectito.id)
      .then(response => {
        navigate("/app/proyectito");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProyectito ? (
        <div className="edit-form">
          <h4>Proyectito</h4>
          <form>
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProyectito.name}
                onChange={handleInputChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="bolita">Estado</label>
              <input
                type="text"
                className="form-control"
                id="bolita"
                name="bolita"
                value={currentProyectito.bolita}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="btn-1" onClick={deleteProyectito}>
            Borrar
          </button>
          <button
          type="submit"
          className="btn-1"
          onClick={updateProyectito}>
          <Link to={`/app/proyectito`}>Actualizar</Link>
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Haga click en una tarea para ver su información...</p>
        </div>
      )}
    </div>
  );
};

export default Proyectito;
