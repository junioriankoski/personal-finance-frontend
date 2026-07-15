import { useState } from "react";
import Login from "./Login";
import Registro from "./Registro";
import Transacoes from "./Transacoes";
import AdicionarTransacao from "./AdicionarTransacao";
import ExcluirTransacao from "./ExcluirTransacao";
import Saldo from "./Saldo";
import AdicionarCategoria from "./AdicionarCategoria";
import ExcluirCategoria from "./ExcluirCategoria";

function App() {
  const [logado, setLogado] = useState(() => {
    return !!localStorage.getItem('token')
  })
  const [atualizar, setAtualizar] = useState(0)
  const [mostrarRegistro, setMostrarRegistro] = useState(false)

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
          <AdicionarTransacao onAdicionada={() => setAtualizar(a => a + 1)} atualizar={atualizar} />
          <AdicionarCategoria onAdicionada={() => setAtualizar(a => a +1)}/>
          <ExcluirCategoria onExcluida={() => setAtualizar(a => a + 1)} atualizar={atualizar} />
          <ExcluirTransacao onExcluida={() => setAtualizar(a => a + 1)} atualizar={atualizar} />
          <Transacoes atualizar={atualizar} onAtualizada={() => setAtualizar(a => a + 1)} />
        </div>
      ) : (
        <div>
          {mostrarRegistro ? (
            <Registro onRegistro={() => setLogado(true)} />
          ) : (
            <Login onLogin={() => setLogado(true)} />
          )}
          <button onClick={() => setMostrarRegistro(!mostrarRegistro)}>
              {mostrarRegistro ? 'Já tenho conta' : 'Criar conta'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App