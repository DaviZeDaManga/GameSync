import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { BuscarBatepaposMensagens } from "../../connection/batepapoAPI"

export default function Ultimamensagem(batepapo) {
    const [mensagens, setMensagens] = useState([])

    async function Mensagens() {
        try {
            let resposta = await BuscarBatepaposMensagens(batepapo)
            setMensagens(resposta)
        }
        catch {
            toast.warning("Mensagens do Bate-papo nâo retornados!")
        }  
    }

    useEffect(()=> {
        Mensagens()
    }, [mensagens])

    const [mensagem, setMensagem] = useState([])

    async function Mensagem() {
        let resposta = mensagens.slice(0, 1)
        setMensagem(resposta)
    }

    useEffect(()=> {
        Mensagem()
    }, [mensagens])

    return (
        <>
        {mensagens.map( item => 
        <p>{item.ds_mensagem}</p>
        )}
        </>
    )
}