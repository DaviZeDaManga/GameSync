import { useState, useEffect } from 'react'
import './index.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
    
export default function BarraDeCima (props) {
    const [games, setGames] = useState (false)
    const [tgames, setTgames] = useState ([])
    const [pagina, setPagina] = useState (1)
    const [idprod, setIdprod] = useState ('')

    async function ProcurarGames () {
        let url = 'https://api.rawg.io/api/games?key=0a526d3c3985430c9469d8d6951eb5cb&page=' + pagina
        let resposta = await axios.get(url)

        setTgames(resposta.data.results)
    }
    
    async function pokemonsAleatorios() {
        let url = "https://pokeapi.co/api/v2/pokemon";

        let response = await axios.get(url);

        let listaPokemons = [];

        for(let item of response.data.results) {
            let pokemonResp = await axios.get(item.url);

            let imagem = pokemonResp.data.sprites.other['official-artwork'].front_default;

            let tipos = '';
            for (let t of pokemonResp.data.types) {
                tipos = tipos + t.type.name ;
            }

            listaPokemons.push({
                nome: item.name,
                imagem: imagem,
                tipos: tipos
            })
        }
        setTgames(listaPokemons)
    }

    function ProxPage() {
        setPagina(pagina + 1)
    }

    function AntPage() {
        setPagina(pagina - 1)
    }

    useEffect(() => {   
        ProcurarGames()
    }, [games, pagina])








    return(
        <div id="BarraDeCima">
            <section className='BarraDeCima'>
                <div className="conteudo">
                    <div>
                        {games == true &&
                        <button onClick={()=> (setGames(false))}>Voltar</button>}
                        <div id="pesquisa">
                            <input onClick={()=> (setGames(true))} type="text" placeholder="procurar na GameSync" />
                            <a href="http://localhost:3000/">Descobrir</a>
                            <a href="http://localhost:3000/procurar">Procurar</a>
                            <a href="http://localhost:3000/planos">Planos</a>
                            <a href="">Noticias</a>
                        </div>
                    </div>

                    <div id="perfil">
                        <p className="neon-text">Ola, Davi Pinto</p>
                        <div className="perfil">
                            <img src="/assets/images/GameSync/user.png" />
                            <div className='menu-perfil'>
                                <div></div>
                                <section className='card'>
                                    <div>
                                    <a href="http://localhost:3000/perfil">Minha conta</a>
                                    <a href="http://localhost:3000/perfil">Favoritos</a>
                                    <a href="http://localhost:3000/perfil">Meus pedidos</a>
                                    <a href="http://localhost:3000/perfil">Atendimento</a>
                                    <a href="http://localhost:3000/perfil">Devoluções</a>
                                    </div>
                                    <a href="http://localhost:3000/escolherlogin"><button>Trocar conta</button></a>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            {games == true &&
            <section id='produtos'>

                {tgames.map(item => 
                    <Link to={'/produto/' + item.id}>
                        <section className='produto'>
                            <div className='imagem-produto'>
                                <div className='sombra'>
                                    <div className='linha'></div>
                                </div>
                                <div className='produtoIMG'>
                                    <img src={item.background_image} />
                                </div>
                            </div>
                            <div className='informacoes'>
                                <div className='dados'>
                                    <a>{item.name}</a>
                                    <p>Sumo Nottingham</p>
                                </div>
                                <div className='info'>
                                    <h3>Novidade</h3>
                                </div>
                            </div>
                        </section>  
                    </Link>
                )}
               
                <nav id='acoes'>
                    <div className='acoes'>
                        {pagina >= 2 &&
                        <button onClick={AntPage}>Voltar página</button>}

                        {pagina == 1 &&
                        <button>Sair</button>}
                        <h1>Pagina {pagina}</h1>
                        <div>
                            {/* <input type='number' placeholder='Numero da Pagina' onChange={() => (setPagina)} value={pagina}/> */}
                            <button onClick={ProxPage}>Próxima página</button>
                        </div>
                    </div>
                </nav>

            </section>}
        </div>
    )
}