import { useState, useEffect } from 'react'
import './index.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import storage, { set } from 'local-storage';
    
export default function BarraDeCima (props) {
    const [games, setGames] = useState (false)
    const [tgames, setTgames] = useState ([])
    const [lista, setLista] = useState (230)
    const [idprod, setIdprod] = useState ('')

    // async function ProcurarGames () {
    //     let url = 'https://api.rawg.io/api/games?key=0a526d3c3985430c9469d8d6951eb5cb&page_size=' + lista 
    //     let resposta = await axios.get(url)

    //     setTgames(resposta.data.results)
    // }

    function MaisGames() {
        setLista(lista + 20)
    }

    const [nome, setNome] = useState('')


    useEffect(() => {
        if(storage('user-logado')){
            const nomeUser = storage('user-logado');
            setNome(nomeUser.nome);
        }
        else{
            setNome('anonymous')
        }
    }, [])





    return(
        <div id="BarraDeCima">
            <section className='BarraDeCima'>
                <div className="conteudo">
                    <div>
                        {games == true &&
                        <button onClick={()=> (setGames(false))}>Voltar</button>}
                        <div id="pesquisa">
                            <input onClick={()=> (setGames(true))} type="text" placeholder="procurar na GameSync" />
                        </div>
                    </div>

                    <div id="perfil">
                    <p>Ola, {nome}</p>
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

                {/* {tgames.map(item => 
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
                                </div>
                                <div className='info'>
                                    <h3>Novidade</h3>
                                </div>
                            </div>
                        </section>  
                    </Link>
                )} */}
               
                <nav id='acoes'>
                    <button onClick={MaisGames}>Procurar mais</button>
                </nav>

            </section>}
        </div>
    )
}