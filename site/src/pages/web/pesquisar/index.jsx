import './index.scss'
import { motion } from 'framer-motion';
import ProdutoCard from '../../../components/produto';
import { BuscarJogoID, ListarTodosJogos } from '../../../connection/productAPI';
import { BuscarImagem } from '../../../connection/productAPI';
import { useState, useEffect } from 'react'
import BarraLateral from '../../../components/barraLateral';
import { Link, useNavigate } from 'react-router-dom';
import { BuscarJogoNome } from '../../../connection/productAPI';
import { toast } from 'react-toastify';


export default function Pesquisa() {
    const [tgames, setTgames] = useState ([])

    async function TodosGames() {
        const resposta = await ListarTodosJogos()
        setTgames(resposta)
    }
    
    useEffect(()=> {
        TodosGames()
    }, [])





    




    const [pesqnome, setPesqnome] = useState('')
    const [jogosnome, setJogosnome] = useState([])

    async function BuscarPorNome() {
        try {
            let resposta = await BuscarJogoNome(pesqnome)
            setJogosnome(resposta)
        } catch {
            
        }
    }

    useEffect(()=> {
        BuscarPorNome()
    }, [pesqnome])


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
    const [filjogoall, setFiljogoall] = useState([])
    const [jogoall, setJogoall] = useState([])

    function Idaleatorio() {
        const numeroAleatorio = Math.floor(Math.random() * 20) + 1;
        setIdaleatorio(numeroAleatorio)
    }

    async function GameAleatorio() {
        let resposta = await ListarTodosJogos()
        setFiljogoall(resposta)

        let filtro = filjogoall.filter( item => item.produto_id == idaleatorio)
        setJogoall(filtro)
    }

    console.log(jogoall)

    useEffect(() => {
        GameAleatorio()
    }, [idaleatorio])









    const navigate = useNavigate()

    function GameGrupos(id) {
        navigate('/gamegrupos/' + id)
    }






    const [filtragem, setFiltragem] = useState(false)

    const [categoria, setCategoria] = useState('')
    const [precomax, setPrecomax] = useState(5000)
    const [precomin, setPrecomin] = useState(0)
    const [promocao, setPromocao] = useState(false)

    const [jogosfiltragem, setJogosfiltragem] = useState([])
    
    useEffect(()=> {
        if(promocao == true) {
            setJogosfiltragem( tgames.filter( item => 
                item.valor > precomin &&
                item.valor < precomax &&
                item.EmPromocao == promocao   
            ))
        }
        else if (promocao == false ) {
            setJogosfiltragem(tgames.filter( item => 
                item.valor > precomin &&
                item.valor < precomax 
            )) 
        }
    })

    useEffect(()=> {
        setJogosfiltragem( tgames.filter( item => 
            item.categoria_nome == categoria    
        ))
    }, [categoria])

    return(
        <div className='BarraDeCima'>
            <BarraLateral/>

            {filtragem == true &&
            <section className='filtragemprod'>
                <section className='card'>
                    <section className='title'>
                        <div onClick={() => (setFiltragem(false))} className='voltar'>
                            <img src='/assets/images/acoes/seta-esquerda.png' />
                        </div>
                        <section className='titlename'>
                            <h1>Filtragem</h1>
                        </section>
                    </section>

                    <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                        <option>Selecionar</option>
                        <option value={"Ação"}>Ação</option>
                        <option value={'Terror'}>Terror</option>
                        <option value={'FPS'}>FPS</option>
                        <option value={'RPG'}>RPG</option>
                        <option value={'Souls Like'}>Souls Like</option>
                        <option value={'Aventura'}>Aventura</option>
                        <option value={'Tiro'}>Tiro</option>
                        <option value={'Estratégia'}>Estratégia</option>
                        <option value={'Esportes'}>Esportes</option>
                        <option value={'Corrida'}>Corrida</option>
                        <option value={'Quebra-cabeça'}>Quebra-cabeça</option>
                        <option value={'Plataforma'}>Plataforma</option>
                        <option value={'Simulação'}>Simulação</option>
                        <option value={'Luta'}>Luta</option>
                        <option value={'Sobrevivência'}>Sobrevivência</option>
                        <option value={'RTS'}>RTS</option>
                        <option value={'Cartas'}>Cartas</option>
                        <option value={'Música'}>Música</option>
                        <option value={'MMO'}>MMO</option>
                        <option value={'Mundo Aberto'}>Mundo Aberto</option>
                        <option value={'Sandbox'}>Sandbox</option>
                        <option value={'História Interativa'}>História Interativa</option>
                        <option value={'Educacional'}>Educacional</option>
                        <option value={'Visual Novel'}>Visual Novel</option>
                        <option value={'Battle Royale'}>Battle Royale</option>
                        <option value={'Rogue-like'}>Rogue-like</option>
                        <option value={'Construção'}>Construção</option>
                    </select>

                    <section onClick={()=> (setPromocao(!promocao))} className={`promocao ${promocao == true && 'selecionado'}`}>
                        <p>Promoção</p>
                    </section>

                    <section className='preco'>
                        <input type='number' placeholder='Preço minimo' onChange={(e) => setPrecomin(e.target.value)} value={precomin}/>
                        <input type='number' placeholder='Preço maximo' onChange={(e) => setPrecomax(e.target.value)} value={precomax}/>
                    </section>
                </section>
            </section>}

            <section className='barraup-pesquisa'>  
                <input type="text" placeholder="procurar na GameSync" onChange={(e) => setPesqnome(e.target.value)} value={pesqnome}/>
                <button onClick={()=> (setFiltragem(true))}></button>
            </section>

            <section id='pesquisar'>
                <main className='pGames'>

                    {pesqnome != "" &&
                    <>
                    {jogosnome.map( item =>

                        <ProdutoCard
                            id={item.id}
                            nome={item.nome}
                            imagem={BuscarImagem(item.imagem_produto)}
                            lancamento={item.tamanho}
                        />
                        
                    )}

                    {jogosnome.length == 0 &&
                    <section className='errorpesquisa'>
                        <h1>Parece que não encontramos nenhum jogo :( tente procurar por outras palavras chave</h1>
                    </section>}
                    </>
                    }

                    {pesqnome == '' &&
                    <>
                    {jogosfiltragem.map( item =>
                                            
                        <ProdutoCard
                            id={item.produto_id}
                            nome={item.nome}
                            imagem={BuscarImagem(item.imagem_produto)}
                            lancamento={item.tamanho}
                        />
                        
                    )}
                    </>
                    }

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

                        {escolhido == 2 && 
                        <main className='gamegrupos'>
                            <section onClick={()=> (GameGrupos(1))} className='gamegrupo'>
                                <h1>Ação</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(2))} className='gamegrupo'>
                                <h1>Terror</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(3))} className='gamegrupo'>
                                <h1>FPS</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(4))} className='gamegrupo'>
                                <h1>RPG</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(5))} className='gamegrupo'>
                                <h1>Souls Like</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(6))} className='gamegrupo'>
                                <h1>Aventura</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(7))} className='gamegrupo'>
                                <h1>Tiro</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(8))} className='gamegrupo'>
                                <h1>Estratégia</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(9))} className='gamegrupo'>
                                <h1>Esportes</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(10))} className='gamegrupo'>
                                <h1>Corrida</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(11))} className='gamegrupo'>
                                <h1>Quebra-Cabeça</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(12))} className='gamegrupo'>
                                <h1>Plataforma</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(13))} className='gamegrupo'>
                                <h1>Simulação</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(14))} className='gamegrupo'>
                                <h1>Luta</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(15))} className='gamegrupo'>
                                <h1>Sobrevivência</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(16))} className='gamegrupo'>
                                <h1>RTS</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(17))} className='gamegrupo'>
                                <h1>Cartas</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(18))} className='gamegrupo'>
                                <h1>Musica</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(19))} className='gamegrupo'>
                                <h1>MMO</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(20))} className='gamegrupo'>
                                <h1>Mundo aberto</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(21))} className='gamegrupo'>
                                <h1>Sandbox</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(22))} className='gamegrupo'>
                                <h1>História interatva</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(23))} className='gamegrupo'>
                                <h1>Educacional</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(24))} className='gamegrupo'>
                                <h1>Visual Novel</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(25))} className='gamegrupo'>
                                <h1>Battle Royale</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(26))} className='gamegrupo'>
                                <h1>Rogue-like</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(27))} className='gamegrupo'>
                                <h1>Construção</h1>
                            </section>


                            
                        </main>
                        }

                        {escolhido == 3 &&
                        <main className='surpreenda'>
                            <section className='cardsur'>
                                {jogoall.map( item => 
                                    
                                <>
                                <img src={BuscarImagem(item.imagem_produto)} />    
                                    
                                <div className='preto'>
                                    <Link to={`/produto/${item.produto_id}`}>
                                    <p>Clique para ver o produto</p>
                                    </Link>
                                </div>

                                </>
                                )}
                                
                            </section>  

                            
                            {idaleatorio > 0 &&
                            <section className='desc'>
                                {jogoall.map( item => 
                                    
                                <p>{item.nome}</p>   
                                    
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