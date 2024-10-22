import './index.scss'
import ProdutoCard from '../../../components/produto';
import { useState, useEffect, useRef } from 'react'
import BarraLateral from '../../../components/barraLateral';
import { useNavigate } from 'react-router-dom';
import { BuscarCategorias, BuscarProdutos, BuscarProdutosID, BuscarProdutosNM } from '../../../connection/produtosAPI';
import { BuscarImagem } from '../../../connection/produtosAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import { Grid, Keyboard } from 'swiper/modules';
import LoadingBar from "react-top-loading-bar";

export default function Produtos() {
    const [tgames, setTgames] = useState ([])
 
    async function TodosGames() {
        let resposta = await BuscarProdutos()
        setTgames(resposta)
    }
    
    useEffect(()=> {
        TodosGames()
    }, [tgames])

    





    




    const [pesqnome, setPesqnome] = useState('')
    const [jogosnome, setJogosnome] = useState([])

    async function BuscarPorNome() {
        try {
            let resposta = await BuscarProdutosNM(pesqnome)
            setJogosnome(resposta)
        } 
        catch {
            
        }
    }

    useEffect(()=> {
        BuscarPorNome()
    }, [pesqnome])

    const [categorias, setCategorias] = useState([])

    async function Categorias() {
        try {
            let resposta = await BuscarCategorias()
            setCategorias(resposta)
        }
        catch {
            
        }
    }

    useEffect(() => {
        Categorias()
    }, [categorias])




    const [idaleatorio, setIdaleatorio] = useState(0)
    const [jogoall, setJogoall] = useState([])

    function Idaleatorio() {
        const numeroAleatorio = Math.floor(Math.random() * tgames.length) + 1;
        setIdaleatorio(numeroAleatorio)
    }

    function GameAleatorio() {
        let resposta = tgames.slice(idaleatorio, (idaleatorio + 1))
        setJogoall(resposta)
    }

    useEffect(() => {
        GameAleatorio()
    }, [idaleatorio])









    const navigate = useNavigate()
    const ref = useRef()

    function Navegacao(para, nome, id) {
        ref.current.continuousStart()

        if (para == 1) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/gamegrupos/' + id)
            }, 1500);
        }
        if (para == 2) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/produtos/${nome}/${id}`)
            }, 1500);
        }
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








    const [tipoprocura, setTipoprocura] = useState("Destaques")

    //tipos de procura
    const [tiposProcura, setTiposProcura] = useState([0, 0, 0])

    function tipoProcura(tipo) {
        let copia = tiposProcura

        if (tipo == 0) {
            if (tiposProcura[tipo] == 0) {
                copia[tipo] = -100
                setTiposProcura(copia)
                Idaleatorio()
            }
            else {
                copia[tipo] = 0
                setTiposProcura(copia)
            }
        }
        else if (tipo == 1) {
            if (tiposProcura[tipo] == 0) {
                copia[tipo] = -100
                setTiposProcura(copia)
                
            }
            else {
                copia[tipo] = 0
                setTiposProcura(copia)
            }
        }
    }

    return(
        <>
        <LoadingBar color="#f11946" ref={ref} />
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



            <section className='tipoProcura'>
                <button onClick={()=> setTipoprocura("Destaques")} className={`${tipoprocura == "Destaques" && 'selecionado'}`}>Destaques</button>
                <button onClick={()=> setTipoprocura("Diversos")} className={`${tipoprocura == "Diversos" && 'selecionado'}`}>Tipos de pesquisa</button>
                <button onClick={()=> setTipoprocura("GameGrupos")} className={`${tipoprocura == "GameGrupos" && 'selecionado'}`}>GameGrupos</button>
            </section>

            <section className='procuraras'>
            {tipoprocura == "Destaques" &&

                <Swiper
                slidesPerView={"auto"}
                spaceBetween={15}
                keyboard={{
                enabled: true,
                }}
                modules={[Keyboard]}
                className="mySwiper"
                >

                {tgames.map( item => 
                <>
                {item.destaque == true &&
                <SwiperSlide onClick={()=> (Navegacao(2, item.nome, item.produto_id))}>
                    <img src={BuscarImagem(item.imagem_produto)} />
                    <div className='gamename'>
                        <h1>{item.nome}</h1>
                    </div>
                    <p>Destaque</p>
                </SwiperSlide>
                } 
                </>   
                )}
                
                </Swiper>

            }
            {tipoprocura == "GameGrupos" &&

                <Swiper
                slidesPerView={3}
                grid={{
                rows: 3,
                }}
                spaceBetween={15}
                modules={[Grid]}
                className="mySwiper"
                >

                {categorias.map( item =>
                
                <SwiperSlide onClick={()=> Navegacao(1, item.id_categoria)} className='categorias'>
                    {item.nm_categoria}
                </SwiperSlide>     
                    
                )}                 

                </Swiper>

            }
            {tipoprocura == "Diversos" &&

                <Swiper
                slidesPerView={'auto'}
                spaceBetween={15}
                keyboard={{
                enabled: true,
                }}
                modules={[Keyboard]}
                className="mySwiper"
                >
  
                <SwiperSlide>
                    <div onClick={()=> (tipoProcura(0))} style={{"left": tiposProcura[0]+"%"}} className='surpreendame'>
                    <img className='icon' src='/assets/images/pesquisa/caixa-aberta.png' />
                    </div>

                    <main className='surpreenda'>
                        {idaleatorio > 0 &&
                        <>
                            {jogoall.map( item => 
                            <img src={BuscarImagem(item.imagem_produto)} />    
                            )}
                        </>}

                        <section className='procurar'>
                            <button onClick={() => (Idaleatorio())}>
                                Próximo jogo
                            </button>
                        </section>
                    </main>
                </SwiperSlide>    
                <SwiperSlide>
                    <div onClick={()=> (tipoProcura(1))} style={{"left": tiposProcura[1]+"%"}} className='roleta'>
                    <img className='icon' src='/assets/images/pesquisa/caixa-aberta.png' />
                    </div>
                </SwiperSlide> 
                <SwiperSlide></SwiperSlide>                  
                
                </Swiper>
            }
            </section>

            <section className='barraup-pesquisa'>  
                <button onClick={()=> (setFiltragem(!filtragem))}></button>
                <input type="text" placeholder="procurar na GameSync" onChange={(e) => setPesqnome(e.target.value)} value={pesqnome}/>
            </section>

            <section id='pesquisar'>

                <main className='pGames'>

                    {pesqnome != "" &&
                    <>
                    {jogosnome.map( item =>

                        <ProdutoCard
                            id={item.produto_id}
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
            </section>

        </div>
        </>
    )
}