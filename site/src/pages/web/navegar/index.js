import './index.scss'
import axios from 'axios'

import BarraLateral from '../../../components/barraLateral'
import BarraDeCima from '../../../components/baraDeCima'
import FooterPage from '../../../components/footerpage/index,'
import FundoGameSync from '../../../components/fundoGameSync'

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom'

export default function Navegar() {
    const [gamesN, setGamesN] = useState ([])

    // async function ProcurarGames () {
    //     let url = 'https://api.rawg.io/api/games?key=0a526d3c3985430c9469d8d6951eb5cb&page_size=3'
    //     let resposta = await axios.get(url)

    //     setGamesN(resposta.data.results)
    // }

    // useEffect(()=> {
    //     ProcurarGames()
    // }, [])






    // const [novos, setNovos] = useState ([])
    // async function NovosGames() {
    //     let url = 'https://api.rawg.io/api/games?key=0a526d3c3985430c9469d8d6951eb5cb&page_size=6'
    //     let resposta = await axios.get(url)

    //     setNovos(resposta.data.results)
    // }

    // useEffect(() => {
    //     NovosGames()
    // }, [])



    return(
        <div className='Navegar'>
            <BarraDeCima/>
            <BarraLateral/>
            {/* <FundoGameSync/> */}

            <main id='navegacao'>
                <section className='now'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        keyboard={{
                        enabled: true,
                        }}
                        pagination={{
                        clickable: true,
                        }}
                        navigation={true}
                        modules={[Keyboard, Pagination, Navigation]}
                        className="mySwiper"
                    >
                            <SwiperSlide>
                                <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />
                                <div className='conteudo borda'>
                                    <h1>The Elder Scrolls</h1>
                                    <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>
                                    <button>Comprar</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src='https://images5.alphacoders.com/609/609173.jpg' />
                                <div className='conteudo borda'>
                                    <h1>DarkSouls</h1>
                                    <p>Dark Souls conta a história de uma terra que no começo, na tida Era dos Anciões (Age of Ancients), o mundo era desforme, incompleto, e envolto por névoas. Esse período era dominado pelos Dragões Imortais (Everlasting Dragons), uma terra formada por cinzas e árvores gigantes.</p>
                                    <button>Comprar</button>
                                </div>
                            </SwiperSlide>


                    </Swiper>
                </section>
                <section className='now-2'>
                    <div className='card borda'>
                        <img src='https://imgs.search.brave.com/iUFg584I9zb0E3QX6zfMz6aQtWnV_9fzZsruETWF7Ow/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nYW1l/cy5vbGFuZXJkLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8xMC8xNjY2MDI1/MzI3Xzc3MF9IaXN0/b3JpYS1kZS1EYXJr/LVNvdWxzLUd3eW4t/bHV0YS1kZS1jaGVm/ZS1lLW11aXRvLmpw/Zw' />
                            <div className='conteudo'>
                                <h1>DarkSouls</h1>
                                <p>Dark Souls conta a história de uma terra que no começo, na tida Era dos Anciões (Age of Ancients), o mundo era desforme, incompleto, e envolto por névoas. Esse período era dominado pelos Dragões Imortais (Everlasting Dragons), uma terra formada por cinzas e árvores gigantes.</p>
                            </div>
                    </div>
                    <div className='card borda'>
                        <img src='https://imgs.search.brave.com/Cx8HcIgyCmzwmAXupgBIYv0IMtr4_9ZvnKpzYVUfj1k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wMi50/cnJzZi5jb20vaW1h/Z2UvZmdldC9jZi83/NzQvMC9pbWFnZXMu/dGVycmEuY29tLzIw/MjEvMTAvMTEvMjA1/NzQ1ODA2MC1hLWNy/b25vbG9naWEtZGUt/ZG9vbS1zYWliYS1h/LW9yZGVtLWRvcy1q/b2dvcy1jYXBhLnBu/Zw' />
                            <div className='conteudo'>
                                <h1>Doom</h1>
                                <p> Doom (comercializado como DOOM) é um jogo de computador lançado em 1994 pela id Software e um dos títulos que geraram o gênero tiro em primeira pessoa. Combinando gráficos 3D com violência gráfica e personagens 2D, ele tornou-se tão controverso quanto imensamente popular, com um lançamento em versão shareware que estima-se ter sido jogada por 15 milhões de pessoas.</p>
                            </div>
                    </div>
                </section>
            </main>
            <section id='procurar'>
                    <section id='acessar'>
                        <div className='acessar'>
                            <div className='botao borda'>
                                {/* <img src='/assets/images/navegar/certificado.png' /> */}
                            </div>
                            <Link to={'/conquistas/432'} >
                                <div className='botao borda'>
                                    {/* <img src='/assets/images/GameSync/trofeu.svg' /> */}
                                </div>
                            </Link>
                        </div>
                        <div className='acessar dev borda'>

                        </div>
                    </section>
                    <div className='card borda'>
                        <img src='https://imgs.search.brave.com/XiqHB2N0NKYCeh9puVVBxDk1MQ85PRwKjK9aDwsnXWU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zbS5p/Z24uY29tL3QvaWdu/X2JyL3NjcmVlbnNo/b3QvaC9oMzExLWJ1/bGx5L2gzMTEtYnVs/bHloM2Rpc2JhcnJl/ZC1hdHRvcm5leS1h/bmQtdmlkZW8tZ2Ft/ZS1pbmR1c3RyeS1w/ZXN0X2E5MmEuMjgw/LmpwZw' />
                            <div className='conteudo '>
                                <h1>Noticia</h1>
                                <p>Um dos maiores games da Rockstar tinha duas sequências planejadas, mas que não saíram do papel</p>
                            </div>
                    </div>
                    <div className='card borda'>
                        <img src='https://imgs.search.brave.com/H5yqlPP58dhrJX6MG27IrYKTNEXkF7c5QKLM9382A_s/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zbS5p/Z24uY29tL3QvaWdu/X2JyL25ld3MvYy9j/YXN0bGV2YW5pL2Nh/c3RsZXZhbmlhLXJl/c3VycmVjdGlvbi1h/LWNhbmNlbGxlZC1k/cmVhbWNhc3QtZ2Ft/ZS1zZWVtaW5nbF90/MWtkLjI4MC5qcGc' />
                            <div className='conteudo'>
                                <h1>Tão comentando</h1>
                                <p>Suposta demo do jogo cancelado do DreamCast é encontrada</p>
                            </div>
                    </div>
            </section>


            <main id='title'>
                <div className='title'>
                    <div></div>
                    <h1>Novos Jogos</h1>
                </div>
            </main>



            <section id='produtos'>

                <Link to={'/produto/6'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/llbDeBAVS7iq4jGj8Iyja-CC3ydEya61OEHMcGEJTGA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM3LmFscGhhY29k/ZXJzLmNvbS8zMzMv/MzMzMzcwLmpwZw' alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">Minecraft</a>
                                <p>Mojang</p>
                            </div>
                            <div className='info'>
                                <h3>New</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                <Link to={'/produto/6'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/LsnOpfC1UFlZz1aXhlUjJ74qP9PzGelZzzJPEuPkkNw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXItbWFuaWEu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzA5L0hpZ2hf/cmVzb2x1dGlvbl93/YWxscGFwZXJfYmFj/a2dyb3VuZF9JRF83/NzcwMDg1Nzk5MC5q/cGc' alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">Mortal Kombat XL</a>
                                <p>Bethesda Games</p>
                            </div>
                            <div className='info'>
                                <h3>Lançamento</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                <Link to={'/produto/6'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/pJ19mPP8khouTIg0d8nrcwPjIoWi-LEqRWyrtaiQAIU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDIwMzMx/OTEuanBn' alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">Resident Evil 4</a>
                                <p>Bethesda Games</p>
                            </div>
                            <div className='info'>
                                <h3>Lançamento</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                <Link to={'/produto/6'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/3ZFsLr3c-DeSfzTKKJZlOhnueH9Jh7MMbq0i-1IRLUM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS84OC8z/Mi84bmR3eGcucG5n' alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">Sonic</a>
                                <p>Bethesda Games</p>
                            </div>
                            <div className='info'>
                                <h3>Lançamento</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                <Link to={'/produto/3242'}>
                            <section className='produto'>
                                <div className='imagem-produto'>
                                    <div className='sombra'>
                                        <div className='linha'></div>
                                    </div>
                                    <div className='produtoIMG'>
                                        <img src='https://imgs.search.brave.com/iQTxvuCmVcvedwSYDq3jBtXyj9BXZNsaRtEz0zeHQIk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kaWd3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXJz/L2Z1bGwvNC8zLzgv/MzM3NDEtMTkyMHgx/MDgwLXN0YXJkZXct/dmFsbGV5LWJhY2tn/cm91bmQtaW1hZ2Ut/ZGVza3RvcC1oZC5q/cGc'/>
                                    </div>
                                </div>
                                <div className='informacoes'>
                                    <div className='dados'>
                                        <a>Stardew Valley</a>
                                        <p>Ubsoft</p>
                                    </div>
                                    <div className='info'>
                                        <h3>Novidade</h3>
                                    </div>
                                </div>
                            </section>  
                        </Link>
                        <Link to={'/produto/3242'}>
                            <section className='produto'>
                                <div className='imagem-produto'>
                                    <div className='sombra'>
                                        <div className='linha'></div>
                                    </div>
                                    <div className='produtoIMG'>
                                        <img src='https://imgs.search.brave.com/9wB7RRXFdmb9pW6Y_xHWCaxMuoMYPLhZn4Qp851CyjQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvZ3JhbmQtdGhl/ZnQtYXV0by12LW5h/ZWo0eWlhcDRnbnho/Mm8uanBn'/>
                                    </div>
                                </div>
                                <div className='informacoes'>
                                    <div className='dados'>
                                        <a>Grand The Auto V</a>
                                        <p>Ubsoft</p>
                                    </div>
                                    <div className='info'>
                                        <h3>Novidade</h3>
                                    </div>
                                </div>
                            </section>  
                        </Link>

            </section>







            {/* <section id='Navegar'>

                <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <section className='card-temas'>
                            <div className='sombra'>
                                <h1>Terror</h1>
                            </div>
                            <div className='tema'>
                                <img src="/assets/images/navegarTemas/terror.jpg" />
                            </div>
                        </section>
                        <section className='card-temas'>
                            <div className='sombra'>
                                <h1>Aventura</h1>
                            </div>
                            <div className='tema'>
                                <img src="/assets/images/navegarTemas/aventura.jpg" />
                            </div>
                        </section>
                        <section className='card-temas'>
                            <div className='sombra'>
                                <h1>Luta</h1>
                            </div>
                            <div className='tema'>
                                <img src="/assets/images/navegarTemas/luta.jpg" />
                            </div>
                        </section>
                    </SwiperSlide>
                    <SwiperSlide>
                        <section className='card-temas'>
                                <div className='sombra'>
                                    <h1>Tiro</h1>
                                </div>
                                <div className='tema'>
                                    <img src="/assets/images/navegarTemas/tiro.jpg" />
                                </div>
                            </section>
                            <section className='card-temas'>
                                <div className='sombra'>
                                    <h1>SoulsLike</h1>
                                </div>
                                <div className='tema'>
                                    <img src="/assets/images/navegarTemas/soulslike.jpg" />
                                </div>
                            </section>
                            <section className='card-temas'>
                                <div className='sombra'>
                                    <h1>Terror</h1>
                                </div>
                                <div className='tema'>
                                    <img src="/assets/images/navegarTemas/terror.jpg" />
                                </div>
                            </section>
                    </SwiperSlide>
                </Swiper>

            </section>

            <article className='procurar'>
                <div className='procura M'>
                    <p>Mostrar</p>
                </div>
                <div className='procura N'>
                    <a href="">Novidades</a>
                </div>
                <div className='procura D'>
                    <a href="">DevGames</a>
                </div>
                <div className='procura S'>
                    <a href="http://localhost:3000/conquistas">Sessao Conquista</a>
                </div>
                <div className='procura P'>
                    <p>Promoções</p>
                </div>
                <div className='filtrart'>
                    <p>Filtros</p>
                </div>
            </article>

            <div id="produtos">

                {tgames.map( item =>

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
                            <a href="http://localhost:3000/produto">{item.name}</a>
                            <p>Sumo Nottingham</p>
                        </div>
                        <div className='info'>
                            <h3>Novidade</h3>
                        </div>
                    </div>
                </section>

                )}

            </div> */}



            <FooterPage/>
        </div>
    )
}