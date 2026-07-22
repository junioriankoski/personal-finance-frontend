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
        <div className="bg-white rounded-lg p-4 shadow dark:bg-slate-600">
            <h2 className="text-black dark:text-white">Excluir Categoria</h2>
            <select className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
                value={categoria} onChange={e => setCategoria(e.target.value)} >
                    <option value=""> Selecione uma Categoria</option>
                    {categorias.map(c => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
            </select>
            <br />
            <button onClick={handleExcluir} className="bg-red-500 text-white px-0 py-1 rounded hover:bg-red-600">Excluir</button>
        </div>
    )
}

export default ExcluirCategoria