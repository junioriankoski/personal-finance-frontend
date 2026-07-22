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
    <div className="bg-white rounded-lg p-4 shadow dark:bg-slate-600">
        <h2 className="text-gray-500 text-sm dark:text-white">Saldo atual</h2>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            R$ {saldo !== null ? saldo.toFixed(2) : '...'}
        </p>
    </div>
)
}

export default Saldo