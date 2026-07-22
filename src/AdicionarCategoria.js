import { useState } from "react";

function AdicionarCategoria({ onAdicionada }) {
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('')


    async function handleCategoria() {
        const token = localStorage.getItem('token')
        const resposta = await fetch('http://localhost:8080/categorias', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({nome, tipo: tipo.toUpperCase()})
        })
        if (resposta.ok) {
            onAdicionada()
            setNome('')
            setTipo('')
        }
    }

    return (
        <div className="bg-white rounded-lg p-4 shadow dark:bg-slate-600">
            <h2 className="text-black dark:text-white">Adicionar Categoria</h2>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
            />
            <br />
            <select className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
                value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="">Selecione o tipo</option>
                <option value="RECEITA">Receita</option>
                <option value="DESPESA">Despesa</option>
            </select>
            <br />
            <button onClick={handleCategoria} className="bg-green-500 text-black px-0 py-1 rounded hover:bg-green-600">Adicionar</button>
        </div>
    )
}

export default AdicionarCategoria
