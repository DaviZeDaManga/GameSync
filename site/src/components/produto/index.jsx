import { useEffect, useState, useRef } from 'react'
import './index.scss'
import { Link, useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

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


    const ref = useRef()
    const navigate = useNavigate()
    const [carregando, setCarregando] = useState(false)

    function Navegar() {
        ref.current.continuousStart();
        setCarregando(true);

        setTimeout(() => {
            navigate(tipoprodurl+id)
            
            if(recarregarpage == true) {
                window.location.reload()
            }
        }, 3000)
    }


    

    return(
        <>
        <LoadingBar
        color='#FFFFFF'
        ref={ref}
        />

        <section onClick={Navegar} className='produto'>
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
        </section>  
        </>
    )
}