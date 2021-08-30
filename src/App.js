import "./App.css";
import Form from "./components/Form";
import Resultado from "./components/Resultado";

/*

  Olá! :)
  
  Eu sou o Deivid.

  - Para este projeto/teste, separei a aplicação em duas grandes partes: a interface e a API+Redis.
  Poderia ter usado container pra isolar a API, porém no momento não domino o Docker (por enquanto).

  - A interação entre os componentes foi feita usando Context API do React, para gerenciar o estado da aplicação. Desta forma,
  com mudanças simples de estado é possível controlar a renderização dos componentes.

  - No arquivo './api/stock.js' está basicamente toda a lógica de parsing de 'COTAHIST_M012021.TXT'. Também no arquivo './algorithm.txt' 
  disponibilizarei a lógica que consegui montar para o funcionamento do algoritmo.

  - Na branch 'dev', está todo o histórico de commits.

  - Tentei utilizar o que estava em meu domínio e sei que há muito espaço para melhorar. Estou aberto a novos conhecimentos e sugestões.

  - Qualquer dúvida, estou a disposição! Muito obrigado, gostei bastante deste desafio!

*/

function App() {
  return (
    <div className="App">
      <div className="container">
        <Form />
        <Resultado />
      </div>
    </div>
  );
}

export default App;
