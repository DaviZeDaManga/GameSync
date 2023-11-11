import { useEffect, useState } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

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

    function espera (ms) {          
        return new Promise ( resolve => {              
            setTimeout(() => {resolve('')}, ms);          
        })        
    } 

    const [verificarrecarregar, setVerificarrecarregar] = useState(0)

    async function RecarregarPage() {
        if (recarregarpage == true) {
            for (let i = 1; i >= 0; i--) {
                await espera(1000)

                if (i == 0) {
                    window.location.reload()
                }
            }
        }
        else{
            alert("Vai recarregar n hahahah")
        }
    }




    

    return(
        <Link to={tipoprodurl + id}>
            <section className='produto'>
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
        </Link>
    )
}