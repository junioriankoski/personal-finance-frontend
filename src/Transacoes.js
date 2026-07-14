import { useState, useEffect } from "react"

function Transacoes({atualizar}) {
    const [transacoes, setTransacoes] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch("http://localhost:8080/transacoes", {
            headers: { 'Authorization' : `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(dados => setTransacoes(dados))
    }, [atualizar])

    return (
        <div>
            <h2>Transações</h2>
            {transacoes.map(t => (
                <div key={t.id}>
                    <span>{t.categoriaNome}</span>
                    <span> - {t.descricao}</span>
                    <span> - R$ {t.valor.toFixed(2)}</span>
                    <span> - {t.tipo}</span>
                </div>
            ))}
        </div>
    )
}

export default Transacoes