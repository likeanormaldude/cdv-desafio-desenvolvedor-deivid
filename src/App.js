import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Resultado from "./components/Resultado";

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
