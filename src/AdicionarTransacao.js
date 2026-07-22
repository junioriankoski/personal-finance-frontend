import { useEffect, useState } from "react";

function AdicionarTransacao({ onAdicionada, atualizar}) {
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')
    const [categoria, setCategoria] = useState('')
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:8080/categorias', {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(dados =>{
            setCategorias(dados)
        })
    }, [atualizar])

    async function handleTransacao() {
        const categoriaEscolhida = categorias.find(c => c.id === Number(categoria))
        const tipoAuto = categoriaEscolhida ? categoriaEscolhida.tipo : ''
        const token = localStorage.getItem('token')
        const resposta = await fetch('http://localhost:8080/transacoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({descricao, valor, data, tipo: tipoAuto, categoriaId: categoria})
        })
        if (resposta.ok) {
            onAdicionada()
            setDescricao('')
            setValor('')
            setData('')
            setCategoria('')
        }
    }

    return (
        <div className="bg-white rounded-lg p-4 shadow dark:bg-slate-600">
            <h2 className="text-black dark:text-white">Adicionar Transações</h2>
            <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
            />
            <br />
            <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={e => setValor(e.target.value)}
                className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
            />
            <br />
            <input
                type="date"
                placeholder="Data"
                value={data}
                onChange={e => setData(e.target.value)}
                className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
            />
            <br />
            <select className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
                value={categoria} onChange={e => setCategoria(e.target.value)} >
                    <option value=""> Selecione uma categoria</option>
                    {categorias.map(c => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
            </select>
            <br />
            <button onClick={handleTransacao} className="bg-green-500 text-black px-0 py-1 rounded hover:bg-green-600">Adicionar</button>
        </div>
    )
}

export default AdicionarTransacao