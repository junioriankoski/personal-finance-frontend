import { useState } from "react";
import Login from "./Login";
import Transacoes from "./Transacoes";
import AdicionarTransacao from "./AdicionarTransacao";
import ExcluirTransacao from "./ExcluirTransacao";
import Saldo from "./Saldo";

function App() {
  const [logado, setLogado] = useState(() => {
    return !!localStorage.getItem('token')
  })
  const [atualizar, setAtualizar] = useState(0)

function handleLogout() {
  localStorage.removeItem('token')
  setLogado(false)
}

  return (
    <div>
      <h1>Personal Finance</h1>
      {logado ? (
        <div>
          <button onClick={handleLogout}>Sair</button>
          <Saldo atualizar={atualizar} />
          <AdicionarTransacao onAdicionada={() => setAtualizar(a => a + 1)} />
          <ExcluirTransacao onExcluida={() => setAtualizar(a => a + 1)} />
          <Transacoes atualizar={atualizar} />
        </div>
      ) : (
        <Login onLogin={() => setLogado(true)} />
      )}
    </div>
  );
}

export default App