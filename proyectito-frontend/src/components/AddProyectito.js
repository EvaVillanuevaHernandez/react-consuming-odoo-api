import React, { useState } from "react";
import ProyectitoDataService from "../services/ProyectitoService";
import './AddProyectito.css';
const AddProyectito = () => {
  const initialContratadorState = {
    id: null,
    name:"",
    proyecto:"",
    asignada:"",
    bolita:""
  };
  const [proyectito, setProyectito] = useState(initialContratadorState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProyectito({ ...proyectito, [name]: value });
  };

  const saveProyectito = () => {
    var data = {
      name: proyectito.name,
      proyecto: proyectito.proyecto,
      bolita:proyectito.bolita,
      
    };

    ProyectitoDataService.create(data)
      .then(response => {
        setProyectito({
          id: response.data.id,
          name:response.data.id,
          proyecto: response.data.proyecto,
          bolita: response.data.bolita
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProyectito = () => {
    setProyectito(initialContratadorState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Se ha añadido correctamente!</h4>
          <button className="btn-env" onClick={newProyectito}>
            Añadir
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Nombre de la tarea</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={proyectito.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
       
          <button onClick={saveProyectito} className="btn-env"
          >
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProyectito;
