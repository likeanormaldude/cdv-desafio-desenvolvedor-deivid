import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [codPreg, setCodPreg] = useState("");
  const [dataPreg, setDataPreg] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(codPreg, "\n", dataPreg);
  };

  const resetForm = () => {
    setCodPreg("");
    setDataPreg("");
  };

  const changePreg = (evt) => {
    setCodPreg(evt.target.value);
  };

  const changeDataPreg = (evt) => {
    setDataPreg(evt.target.value);
  };

  return (
    <div className="form">
      <h2 className="form__tituloForm">Histórico Ações Bolsa</h2>

      <div className="form__row">
        <label htmlFor="codPapel">Código de negociação do papel</label>
        <input
          type="text"
          className="form__input"
          name="codPapel"
          id="codPapel"
          onChange={changePreg}
          value={codPreg}
        />
      </div>

      <div className="form__row">
        <label htmlFor="dataPreg">Data do pregão</label>
        <input
          type="text"
          className="form__input"
          name="dataPreg"
          id="dataPreg"
          onChange={changeDataPreg}
          value={dataPreg}
        />
      </div>

      <div className="form__row">
        <button type="submit" className="btn-form" onClick={handleSubmit}>
          Buscar Dados
        </button>
        <button
          type="button"
          className="btn-form btn-reset"
          onClick={resetForm}
        >
          Limpar
        </button>
      </div>
    </div>
  );
}

export default Form;
