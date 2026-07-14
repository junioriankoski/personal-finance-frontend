import { useEffect, useState } from "react";

function ExcluirTransacao({onExcluida}) {
    const [transacao, setTransacao] = useState('')
    const [transacoes, setTransacoes] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:8080/transacoes`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(dados => setTransacoes(dados))
    }, [])

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
        <div>
            <h2>Excluir Transação</h2>
            <select 
                value={transacao} onChange={e => setTransacao(e.target.value)} >
                    <option value=""> Selecione uma Transação</option>
                    {transacoes.map(t => (
                        <option key={t.id} value={t.id}>{t.descricao}, R${t.valor.toFixed(2)}, {new Date(t.data).toLocaleDateString('pt-br')}</option>
                    ))}
            </select>
            <br />
            <button onClick={excluirTransacao}>Excluir Transação</button>
        </div>
    )
}

export default ExcluirTransacao