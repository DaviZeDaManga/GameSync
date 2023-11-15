import { useEffect, useState, useRef } from 'react'
import './index.scss'
import { Link, useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { motion } from 'framer-motion'

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
    })          

    return(
        <>

        <Link to={tipoprodurl+id}>
            <motion.div
            className='produto'
            whileHover={{scale: 0.97}}
            whileTap={{scale: 0.93}}
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
        </Link>
         
        </>
    )
}