import { useState } from 'react'

function Login({ onLogin, onCriarConta}) {
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
        <div className='bg-white rounded-lg p-4 shadow'>
            <h2 className="text-gray-800 text-sm">Login</h2>
            <input className='border border-gray-300 rounded px-3 py-2 w-full mb-3'
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input className='border border-gray-300 rounded px-3 py-2 w-full mb-3'
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
            />
            <div className="flex justify-between mt-3">
                <button onClick={handleLogin} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800">
                    Entrar
                </button>
                <button onClick={onCriarConta} className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-800">
                    Criar conta
                </button>
            </div>
        </div>
    )
}

export default Login