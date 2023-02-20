import React, { useState } from "react";
import ProyectitoDataService from "../services/ProyectitoService";

const AddProyectito = () => {
  const initialContratadorState = {
    id: null,
    name:"",
    proyecto:"",
    asignada:"",
    tags:""
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
      
    };

    ProyectitoDataService.create(data)
      .then(response => {
        setProyectito({
          id: response.data.id,
          name:response.data.id,
          proyecto: response.data.proyecto,
          
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
          <button className="btn btn-success" onClick={newProyectito}>
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

          {/* <div className="form-group">
            <label htmlFor="proyecto">Nombre del proyecto</label>
            <input
              type="text"
              className="form-control"
              id="proyecto"
              required
              value={proyectito.proyecto}
              onChange={handleInputChange}
              name="proyecto"
            />
          </div> */}

          {/* <div className="form-group">
            <label htmlFor="asignada">Asignada a</label>
            <input
              type="text"
              className="form-control"
              id="asignada"
              required
              value={proyectito.asignada}
              onChange={handleInputChange}
              name="asignada"
            />
          </div> */}

          {/* <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              className="form-control"
              id="tags"
              required
              value={proyectito.tags}
              onChange={handleInputChange}
              name="tags"
            />
          </div> */}
          <button onClick={saveProyectito} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProyectito;
