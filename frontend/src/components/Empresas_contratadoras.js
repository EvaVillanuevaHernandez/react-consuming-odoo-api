import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import  Empresas_contratadorasDataService from "../services/Empresas_contratadorasService";

const EmpresasContratadoras = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialEmpresas_contratadorasState = {
    id: null,
    name:"",
    empresa: "",
    contrato: "",
    pago:"",
    horas:"",
    description:""
  };
  const [currentEmpresas_contratadoras, setCurrentEmpresas_contratadoras] = useState(initialEmpresas_contratadorasState);
  const [message, setMessage] = useState("");

  const getEmpresa = id => {
    Empresas_contratadorasDataService.get(id)
      .then(response => {
        setCurrentEmpresas_contratadoras(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getEmpresa(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentEmpresas_contratadoras({ ...currentEmpresas_contratadoras, [name]: value });
  };

  const updateEmpresas = () => {
    Empresas_contratadorasDataService.update(currentEmpresas_contratadoras.id, currentEmpresas_contratadoras)
      .then(response => {
        setMessage("The empresas_contratadoras was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteEmpresa = () => {
    Empresas_contratadorasDataService.remove(currentEmpresas_contratadoras.id)
      .then(response => {
        navigate("/app/empresas_contratadoras");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEmpresas_contratadoras ? (
        <div className="edit-form">
          <h4>Empresas Contratadoras</h4>
          <form>
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentEmpresas_contratadoras.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text"
                className="form-control"
                id="empresa"
                name="empresa"
                value={currentEmpresas_contratadoras.empresa}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pago">Pago</label>
              <input
                type="text"
                className="form-control"
                id="pago"
                name="pago"
                value={currentEmpresas_contratadoras.pago}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="horas">Horas</label>
              <input
                type="text"
                className="form-control"
                id="horas"
                name="horas"
                value={currentEmpresas_contratadoras.horas}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contrato">Contrato</label>
              <input
                type="text"
                className="form-control"
                id="contrato"
                name="contrato"
                value={currentEmpresas_contratadoras.contrato}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentEmpresas_contratadoras.description}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteEmpresa}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateEmpresas}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Empresas contratadoras...</p>
        </div>
      )}
    </div>
  );
};

export default EmpresasContratadoras;
