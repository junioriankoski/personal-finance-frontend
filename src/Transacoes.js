import { useState, useEffect } from "react"

function Transacoes({onAtualizada, atualizar}) {
    const [transacoes, setTransacoes] = useState([])
    const [transacaoSelecionada, setTransacaoSelecionada] = useState(null)
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch("http://localhost:8080/transacoes", {
            headers: { 'Authorization' : `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(dados => setTransacoes(dados))
    }, [atualizar])

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:8080/categorias', {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(dados => setCategorias(dados))
    }, [atualizar])

    async function handleSalvar() {
        const token = localStorage.getItem('token')
        const resposta = await fetch(`http://localhost:8080/transacoes/${transacaoSelecionada.id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                descricao: transacaoSelecionada.descricao,
                valor: Number(transacaoSelecionada.valor),
                data: transacaoSelecionada.data,
                tipo: transacaoSelecionada.tipo,
                categoriaId: transacaoSelecionada.categoriaId
            })
        })
        if (resposta.ok) {
            setTransacaoSelecionada(null)
            onAtualizada()
        }
    }

    return (
        <div className="bg-white rounded-lg p-4 shadow dark:bg-slate-600">
            <h2 className="text-black dark:text-white">Transações</h2>
            {transacoes.map(t => (
                <div key={t.id} className="text-black dark:text-white">
                    <span>{t.categoriaNome}</span>
                    <span> | {t.descricao}</span>
                    <span> - R$ {t.valor.toFixed(2)}</span>
                    <span> | {new Date(t.data + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
                    <span> | {t.tipo}</span>
                    <span onClick={() => {setTransacaoSelecionada(t)
                        console.log(t)
                    }}>✏️</span>
                </div>
            ))}
            {transacaoSelecionada && (
                <div className="bg-gray-300 rounded-lg p-4 shadow dark:bg-slate-600">
                    <h3 className="text-black dark:text-white">Editar Transação</h3>
                    <input
                        type="text"
                        value={transacaoSelecionada.descricao}
                        onChange={e => setTransacaoSelecionada({...transacaoSelecionada, descricao: e.target.value})}
                        className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
                        
                    />
                    <input        
                        type="number"
                        value={transacaoSelecionada.valor}
                        onChange={e => setTransacaoSelecionada({...transacaoSelecionada, valor: e.target.value})}
                        className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
                    />
                    <select className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
                        value={transacaoSelecionada.categoriaId || ''}
                        onChange={e => setTransacaoSelecionada({...transacaoSelecionada, categoriaId: Number(e.target.value)})}>
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(c => (
                            <option key={c.id} value={c.id}>{c.nome}</option>
                        ))}
                    </select>
                    <div className="flex justify-between mt-3">
                        <button onClick={() => setTransacaoSelecionada(null)} className="bg-red-500 text-white px-0 py-1 rounded hover:bg-red-600">Cancelar</button>
                        <button onClick={handleSalvar} className="bg-green-500 text-black px-0 py-1 rounded hover:bg-green-600">Salvar</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Transacoes