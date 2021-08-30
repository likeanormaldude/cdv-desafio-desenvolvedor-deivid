import React, { useState } from "react";
import "./Form.css";
import { useDataLayerValue } from "../../DataLayer";
import axios from "../../axios";

function Form() {
  const [codPapel, setCodPapel] = useState("PETR3");
  const [dataPreg, setDataPreg] = useState("19/01/2021");
  const [{}, dispatch] = useDataLayerValue();

  const toggleResultado = (vBool) => {
    dispatch({
      type: "SET_SEARCHED_DB",
      searchedOnDB: vBool,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (codPapel == "" || dataPreg == "") {
      alert("Preencha todos os campos do formulário");
      toggleResultado(false);
      return false;
    }

    const ptt = new RegExp("\\d{2}/\\d{2}/\\d{4}", "g");

    if (!ptt.test(dataPreg)) {
      // Havia tentado achar um plugin de máscara. Porém não encontrei um que fosse de rápida implementação.
      alert("Insira uma data no formato dd/mm/YYYY");
      toggleResultado(false);
      return false;
    }

    // Run loader gif
    dispatch({
      type: "SET_LOADER",
      loading: true,
    });

    // Set searched DB to render Resultado
    toggleResultado(true);

    //
    axios
      .get("/fetch", {
        params: {
          codPapel,
          dataPreg,
        },
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((rs) => {
        dispatch({
          type: "SET_DATA",
          data: {
            precoUltPregao: rs.data.precoUltPregao,
          },
        });

        // Results ready! Hide loader image.
        dispatch({
          type: "SET_LOADER",
          loading: false,
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
