import './index.scss'
import { motion } from 'framer-motion';
import ProdutoCard from '../../../components/produto';
import { BuscarJogoID, ListarTodosJogos } from '../../../connection/productAPI';
import { BuscarImagem } from '../../../connection/productAPI';
import { useState, useEffect } from 'react'
import BarraLateral from '../../../components/barraLateral';
import { Link } from 'react-router-dom';

export default function Pesquisa() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [rotate, setRotate] = useState(0);
    const [escalapesquisa, setEscalapesquisa] = useState(1)
    const [pesquisa, setPesquisa] = useState(false)
    const [games, setGames] = useState (false)
    const [tgames, setTgames] = useState ([])

    async function TodosGames() {
        const resposta = await ListarTodosJogos()
        setTgames(resposta)
    }
    
    useEffect(()=> {
        TodosGames()
    }, [])










    const [escolhido, setEscolhido] = useState(0)

    const [xescolher, setXescolher] = useState(0)
    const [yescolher, setYescolher] = useState(0)

    const [xescolha, setXescolha] = useState(0)
    const [yescolha, setYescolha] = useState(0)

    const [nomefiltro, setNomefiltro] = useState('oi')

    useEffect(() => {
        if(escolhido == 1 || escolhido == 2 || escolhido == 3 ) {
            setYescolher(3000)
            setYescolha(-3000)
        }
        else {
            setYescolher(0)
            setYescolha(0)
        }
    }, [escolhido])

    useEffect(()=> {
        if(escolhido == 1) {
            setNomefiltro("Promoções")
        }
        else if(escolhido == 2) {
            setNomefiltro("GameGrupos")
        }
        else if(escolhido == 3) {
            setNomefiltro("Surpreenda-me")
        }
        else {
            setEscolhido('none')
        }
    }, [escolhido])




    const [idaleatorio, setIdaleatorio] = useState(0)
    const [jogoall, setJogoall] = useState([])

    function Idaleatorio() {
        const numeroAleatorio = Math.floor(Math.random() * 20) + 1;
        setIdaleatorio(numeroAleatorio)
    }


    async function GameAleatorio() {
        let resposta = await BuscarJogoID(idaleatorio)
        setJogoall(resposta)
    }

    useEffect(() => {
        GameAleatorio()
    }, [idaleatorio])

    console.log(jogoall)

    return(
        <div className='BarraDeCima'>
            <BarraLateral/>

            <section className='barraup-pesquisa'>  
                <input type="text" placeholder="procurar na GameSync" />
                <button>
                    
                </button>
            </section>

            <section id='pesquisar'>
                <main className='pGames'>

                    {tgames.map( item =>
                        
                    <ProdutoCard
                        id={item.produto_id}
                        nome={item.nome}
                        imagem={BuscarImagem(item.imagem_produto)}
                        lancamento={item.tamanho}
                    />
                    
                    )}

                </main>

                <section className='filtragem'>
                    <motion.div
                    className='escolhas'
                    animate={{
                        x: xescolher, 
                        y: yescolher
                    }}
                    transition={{type: 'tween'}}
                    >
                        <div onClick={() => (setEscolhido(1))} className='cardfiltro promo'>
                            <h1>Promoções</h1>
                        </div>
                        <div onClick={() => (setEscolhido(2))} className='cardfiltro grup'>
                            <h1>GameGrupos</h1>
                        </div>
                        <div onClick={() => (setEscolhido(3))} className='cardfiltro sur'>
                            <h1>Me surpreenda</h1>
                        </div> 
                    </motion.div>    

                    <motion.div
                    className='escolhido'
                    animate={{
                        x: xescolha, 
                        y: yescolha
                    }}
                    transition={{type: "tween"}}
                    >
                        <section className='title'>
                            <div onClick={() => (setEscolhido(0))} className='voltar'>
                                <img src='/assets/images/acoes/seta-esquerda.png' />
                            </div>
                            <section className='titlename'>
                                <h1>{nomefiltro}</h1>
                            </section>
                        </section>

                        {escolhido == 3 &&
                        <main className='surpreenda'>
                            <section className='cardsur'>
                                {jogoall.map( item => 
                                    
                                <>
                                <img src={BuscarImagem(item.img_produto)} />    
                                    
                                <div className='preto'>
                                    <Link to={'/produto/' + idaleatorio}>
                                    <p>Clique para ver o produto</p>
                                    </Link>
                                </div>

                                </>
                                )}
                                
                            </section>  

                            
                            {idaleatorio > 0 &&
                            <section className='desc'>
                                {jogoall.map( item => 
                                    
                                <p>{item.nm_produto}</p>   
                                    
                                )}
                            </section>}

                            <section className='procurar'>
                                <button onClick={() => (Idaleatorio())}>
                                    Jogo aleatório
                                </button>
                                {idaleatorio > 0 &&
                                <button onClick={()=> (setIdaleatorio(0))} className='reset'>
                                    Resetar
                                </button>}
                            </section>
                        </main>}
                    </motion.div>
                </section>
            </section>

        </div>
    )
}