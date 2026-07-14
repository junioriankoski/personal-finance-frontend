import { useState, useEffect } from "react";

function Saldo({ atualizar}) {
    const [saldo, setSaldo] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:8080/transacoes/saldo', {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(dados => setSaldo(dados))
    }, [atualizar])

    return (
        <div>
            <h2>Saldo: R$ {saldo !== null ? saldo.toFixed(2) : '...'}</h2>
        </div>
    )
}

export default Saldo