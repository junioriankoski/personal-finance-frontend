import { useState } from "react";

function Registro({ onRegistro}) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function handleRegistro() {
        const resposta = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({nome, email, senha})
        })
        const dados = await resposta.json()
        if (dados.token) {
            localStorage.setItem('token', dados.token)
            onRegistro()
        }
    }

    return (
        <div>
            <h2>Registrar</h2>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <br />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
            />
            <br />
            <button onClick={handleRegistro}>Registrar</button>
        </div>
    )
}

export default Registro