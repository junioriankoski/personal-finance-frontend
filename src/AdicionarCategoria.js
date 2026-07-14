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
        <div>
            <h2>Adicionar Categoria</h2>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <br />
            <select
                value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="">Selecione o tipo</option>
                <option value="RECEITA">Receita</option>
                <option value="DESPESA">Despesa</option>
            </select>
            <br />
            <button onClick={handleCategoria}>Adicionar Categoria</button>
        </div>
    )
}

export default AdicionarCategoria
