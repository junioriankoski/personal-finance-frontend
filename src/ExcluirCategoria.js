import { useState, useEffect } from "react";

function ExcluirCategoria ({ onExcluida, atualizar}) {
    const [categoria, setCategoria] = useState('')
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:8080/categorias`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(dados => setCategorias(dados))
    }, [atualizar])

    async function handleExcluir() {
        const token = localStorage.getItem('token')
        const resposta = await fetch(`http://localhost:8080/categorias/${categoria}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
        })
        if (resposta.ok) {
            onExcluida()
        }
    }
    return (
        <div>
            <h2>Excluir Categoria</h2>
            <select 
                value={categoria} onChange={e => setCategoria(e.target.value)} >
                    <option value=""> Selecione uma Categoria</option>
                    {categorias.map(c => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
            </select>
            <br />
            <button onClick={handleExcluir}>Excluir Categoria</button>
        </div>
    )
}

export default ExcluirCategoria