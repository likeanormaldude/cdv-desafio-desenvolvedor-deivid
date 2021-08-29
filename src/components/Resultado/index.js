import React, { useState } from "react";
import "./Resultado.css";

function Resultado() {
  const [codPreg, setCodPreg] = useState("");
  const [dataPreg, setDataPreg] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(codPreg, "\n", dataPreg);
  };

  const resetResultado = () => {
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
    <div className="resultado">
      <h2 className="resultado__tituloResultado">Resultados</h2>

      <div className="resultado__row">
        <span className="resultado__label">
          Preço do último negócio do papel-mercado no pregão
        </span>
        <span className="resultado__precoUltPapel">R$ 29,12</span>
      </div>
    </div>
  );
}

export default Resultado;
