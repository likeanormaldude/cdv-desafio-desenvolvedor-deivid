import React from "react";
import "./Resultado.css";
import { useDataLayerValue } from "../../DataLayer";
import loader from "../../img/gear2.gif";

function Resultado() {
  const [{ data, loading, searchedOnDB }, dispatch] = useDataLayerValue();

  return (
    searchedOnDB && (
      <div className="resultado">
        <h2 className="resultado__tituloResultado">Resultados</h2>

        {loading ? (
          <div className="containerLoader">
            <img src={loader} alt="Loader" className="loader-gear" />
          </div>
        ) : (
          <div className="resultado__row">
            <div className="resultado__records">
              {Object.keys(data).length > 0 ? (
                <div className="resultado_hasRecords">
                  <p className="resultado__label">
                    Preço do último negócio do papel-mercado no pregão
                  </p>
                  <p className="resultado__precoUltPapel">
                    {data.precoUltPregao}
                  </p>
                </div>
              ) : (
                <div className="resultado_noRecords">
                  <label className="resultado__labelNoResults">
                    Nenhum resultado foi encontrado
                  </label>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default Resultado;
