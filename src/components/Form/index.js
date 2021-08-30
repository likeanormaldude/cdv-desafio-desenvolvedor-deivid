import React, { useState } from "react";
import "./Form.css";
import { useDataLayerValue } from "../../DataLayer";
import axios from "../../axios";

function Form() {
  const [codPapel, setCodPapel] = useState("");
  const [dataPreg, setDataPreg] = useState("");
  const [{}, dispatch] = useDataLayerValue();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //console.log(codPapel, "\n", dataPreg);

    axios
      .get("/fetch", {
        params: {
          codPapel,
          dataPreg,
        },
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((rs) => {
        var debug = 1;
        dispatch({
          type: "SET_DATA",
          data: {
            precoUltPregao: rs.data.precoUltPregao,
          },
        });
      });
  };

  const resetForm = () => {
    setCodPapel("");
    setDataPreg("");
  };

  const changePreg = (evt) => {
    setCodPapel(evt.target.value);
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
          value={codPapel}
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
