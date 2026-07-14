import { useState } from "react";

function AtualizarTransacao({ onAtualizada, atualizar}) {
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')
    const [categoria, setCategoria] = useState('')
    const [categorias, setCategorias] = useState([])
}