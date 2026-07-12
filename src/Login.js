import { useState } from 'react'

function Login({ onLogin}) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function handleLogin() {
        const resposta = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({ email, senha})
        })
        const dados = await resposta.json()
        if (dados.token) {
            localStorage.setItem('token', dados.token)
            onLogin()
        }
    }


    return (
        <div>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Entrar</button>
        </div>
    )
}

export default Login