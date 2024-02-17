import { useEffect, useRef, useState } from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import LoadingBar from "react-top-loading-bar";

export default function ProdutoCard({id, imagem, nome, produtora, lancamento, tipo, recarregarpage}) {
    const [tipoprodurl, setTipoprodurl] = useState('/produto/')
    const [tipoprod, setTipoprod] = useState('Jogo')

    useEffect(()=> {
        if(tipo == 'conquista') {
            setTipoprodurl('/conquistas/')
            setTipoprod("Conquista")
        }
        else if (tipo == 'complemento') {
            setTipoprod("Complemento")
        }
        else if (tipo == 'jogar') {
            setTipoprodurl('/games/jogar/')
            setTipoprod('Jogar')
        }
    })       
    
    const navigate = useNavigate()
    const ref = useRef()

    function Navegar() {
        ref.current.continuousStart()

        setTimeout(() => {
            ref.current.complete()
            navigate(tipoprodurl + id)
        }, 1500);
    }
    

    return(
        <>
        <LoadingBar color="#f11946" ref={ref} />

        <motion.div
        className='produto'
        whileHover={{scale: 0.97}}
        whileTap={{scale: 0.93}}
        onClick={()=>(Navegar())}
        >
            <div className='imagem-produto'>
                <div className='sombra'>
                    <div className='linha'></div>
                </div>
                <div className='produtoIMG'>
                    <img src={imagem}/>
                </div>
            </div>
            <div className='informacoes'>
                <div className='dados'>
                    <a>{nome}</a>
                    <p>{tipoprod}</p>
                </div>
                <div className='info'>
                    <h3>{lancamento}</h3>
                </div>
            </div>
        </motion.div>  

         
        </>
    )
}