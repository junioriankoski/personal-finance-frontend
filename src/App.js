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
  const [tema, setTema] = useState(() => {
    return localStorage.getItem('tema') === 'true'
  })
  
function theme(){
  const novoTema = !tema
  setTema(novoTema)
  localStorage.setItem('tema', novoTema.toString())
}

function handleLogout() {
  localStorage.removeItem('token')
  setLogado(false)
}

  return (
    <div className={`${tema ? "dark" :""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-800">
        <button onClick={theme} className="fixed top-2 right-4">{tema ? "🌙" : "☀️"}</button>
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-white">Personal Finance</h1>
          {logado ? (
            <div className="space-y-6">
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sair
              </button>
              <Saldo atualizar={atualizar} />
              <AdicionarTransacao onAdicionada={() => setAtualizar(a => a + 1)} atualizar={atualizar} />
              <AdicionarCategoria onAdicionada={() => setAtualizar(a => a + 1)} />
              <ExcluirCategoria onExcluida={() => setAtualizar(a => a + 1)} atualizar={atualizar} />
              <ExcluirTransacao onExcluida={() => setAtualizar(a => a + 1)} atualizar={atualizar} />
              <Transacoes atualizar={atualizar} onAtualizada={() => setAtualizar(a => a + 1)} />
            </div>
          ) : (
          <div>
            {mostrarRegistro ? (
              <Registro onRegistro={() => setLogado(true)} />
            ) : (
              <Login onLogin={() => setLogado(true)} onCriarConta={() => setMostrarRegistro(true)} />
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default App