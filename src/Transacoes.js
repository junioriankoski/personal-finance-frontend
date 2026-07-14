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
        <div>
            <h2>Transações</h2>
            {transacoes.map(t => (
                <div key={t.id}>
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
                <div>
                    <h3>Editar Transação</h3>
                    <input
                        type="text"
                        value={transacaoSelecionada.descricao}
                        onChange={e => setTransacaoSelecionada({...transacaoSelecionada, descricao: e.target.value})}
                    />
                    <input        
                        type="number"
                        value={transacaoSelecionada.valor}
                        onChange={e => setTransacaoSelecionada({...transacaoSelecionada, valor: e.target.value})}
                    />
                    <select
                        value={transacaoSelecionada.categoriaId || ''}
                        onChange={e => setTransacaoSelecionada({...transacaoSelecionada, categoriaId: Number(e.target.value)})}>
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(c => (
                            <option key={c.id} value={c.id}>{c.nome}</option>
                        ))}
                    </select>
                    <button onClick={() => setTransacaoSelecionada(null)}>Cancelar</button>
                    <button onClick={handleSalvar}>Salvar</button>
                
                </div>
            )}
        </div>
    )
}

export default Transacoes