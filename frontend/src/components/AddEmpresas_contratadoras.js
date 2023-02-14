import React, { useState } from "react";
import Empresas_contratadorasDataService from "../services/Empresas_contratadorasService";

const AddEmpresas_contratadoras = () => {
  const initialContratadorState = {
    id: null,
    name:"",
    empresa: "",
    contrato: "",
    pago: "",
    horas: "",
    description: ""
  };
  const [empresas_contratadoras, setEmpresas_contratadoras] = useState(initialContratadorState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmpresas_contratadoras({ ...empresas_contratadoras, [name]: value });
  };

  const saveEmpresas_contratadoras = () => {
    var data = {
      name: empresas_contratadoras.name,
      empresa: empresas_contratadoras.empresa,
      contrato: empresas_contratadoras.contrato,
      pago: empresas_contratadoras.pago,
      horas: empresas_contratadoras.horas,
      description: empresas_contratadoras.description
    };

    Empresas_contratadorasDataService.create(data)
      .then(response => {
        setEmpresas_contratadoras({
          id: response.data.id,
          name:response.data.id,
          empresa: response.data.empresa,
          contrato: response.data.contrato,
          pago: response.data.pago,
          horas: response.data.horas,
          description: response.data.description
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEmpresas_contratadoras = () => {
    setEmpresas_contratadoras(initialContratadorState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newEmpresas_contratadoras}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Número del contrato</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={empresas_contratadoras.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="empresa">Nombre de la empresa</label>
            <input
              type="text"
              className="form-control"
              id="empresa"
              required
              value={empresas_contratadoras.empresa}
              onChange={handleInputChange}
              name="empresa"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrato">Tipo de contrato</label>
            <input
              type="text"
              className="form-control"
              id="contrato"
              required
              value={empresas_contratadoras.contrato}
              onChange={handleInputChange}
              name="contrato"
            />
          </div>

          
          <div className="form-group">
            <label htmlFor="pago">Pago por horas</label>
            <input
              type="text"
              className="form-control"
              id="pago"
              required
              value={empresas_contratadoras.pago}
              onChange={handleInputChange}
              name="pago"
            />
          </div>

          
          <div className="form-group">
            <label htmlFor="horas">Horas trabajadas</label>
            <input
              type="text"
              className="form-control"
              id="horas"
              required
              value={empresas_contratadoras.horas}
              onChange={handleInputChange}
              name="horas"
            />
          </div>

          
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={empresas_contratadoras.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveEmpresas_contratadoras} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddEmpresas_contratadoras;
