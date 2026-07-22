import { useEffect, useState } from "react";

function ExcluirTransacao({ onExcluida, atualizar }) {
    const [transacao, setTransacao] = useState('')
    const [transacoes, setTransacoes] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:8080/transacoes`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(dados => setTransacoes(dados))
    }, [atualizar])

    async function excluirTransacao() {
        const token = localStorage.getItem('token')
        const resposta = await fetch(`http://localhost:8080/transacoes/${transacao}`, {
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
            <h2 className="text-black dark:text-white">Excluir Transação</h2>
            <select className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-white dark:border-slate-500"
                value={transacao} onChange={e => setTransacao(e.target.value)} >
                    <option value=""> Selecione uma Transação</option>
                    {transacoes.map(t => (
                        <option key={t.id} value={t.id}>{t.descricao}, R${t.valor.toFixed(2)}, {new Date(t.data).toLocaleDateString('pt-br')}</option>
                    ))}
            </select>
            <br />
            <button onClick={excluirTransacao} className="bg-red-500 text-white px-0 py-1 rounded hover:bg-red-600">Excluir</button>
        </div>
    )
}

export default ExcluirTransacao