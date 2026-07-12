import { useState } from "react";
import Login from "./Login";
import Transacoes from "./Transacoes";

function App() {
  const [logado, setLogado] = useState(false)

  return (
    <div>
      <h1>Personal Finance</h1>
      {logado ? (
        <Transacoes />
      ) : (
        <Login onLogin={() => setLogado(true)} />
      )}
    </div>
  );
}

export default App