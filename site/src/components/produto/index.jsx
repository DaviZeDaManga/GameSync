import './index.scss'
import { Link } from 'react-router-dom'

export default function ProdutoCard({imagem, nome, produtora, estado}) {

    return(
        <Link to={'/produto/3242'}>
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
                        <p>{produtora}</p>
                    </div>
                    <div className='info'>
                        <h3>{estado}</h3>
                    </div>
                </div>
            </section>  
        </Link>
    )
}