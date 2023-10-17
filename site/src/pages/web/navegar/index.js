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

    async function ProcurarGames () {
        let url = 'https://api.rawg.io/api/games?key=0a526d3c3985430c9469d8d6951eb5cb&page_size=3'
        let resposta = await axios.get(url)

        setGamesN(resposta.data.results)
    }

    useEffect(()=> {
        ProcurarGames()
    }, [])






    const [novos, setNovos] = useState ([])
    async function NovosGames() {
        let url = 'https://api.rawg.io/api/games?key=0a526d3c3985430c9469d8d6951eb5cb&page_size=6'
        let resposta = await axios.get(url)

        setNovos(resposta.data.results)
    }

    useEffect(() => {
        NovosGames()
    }, [])

    
    
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
                        {gamesN.map( item => 
                            
                            <SwiperSlide>
                                <img src={item.background_image} />
                                <div className='conteudo'>
                                    <h1>{item.name}</h1>
                                    <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>
                                </div>
                            </SwiperSlide>
                        
                        )}
                        
                    </Swiper>
                </section>
                <section className='now-2'>
                    <div className='card'>

                    </div>
                    <div className='card'>

                    </div>
                </section>
            </main>
            <section id='procurar'>
                    <section id='acessar'>
                        <div className='acessar'>
                            <div className='botao'>
                                {/* <img src='/assets/images/navegar/certificado.png' /> */}
                            </div>
                            <Link to={'/conquistas/432'} >
                                <div className='botao'>
                                    {/* <img src='/assets/images/GameSync/trofeu.svg' /> */}
                                </div>
                            </Link>
                        </div>
                        <div className='acessar dev'>

                        </div>
                    </section>
                    <div className='card'>

                    </div>
                    <div className='card'>

                    </div>
            </section>


            <main id='title'>
                <div className='title'>
                    <div></div>
                    <h1>Novos Jogos</h1>
                </div>    
            </main>



            <section id='produtos'>
            {novos.map( item => 

                <Link to={'/produto/' + item.id}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src={item.background_image} alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">{item.name}</a>
                                <p>Bethesda Games</p>
                            </div>
                            <div className='info'>
                                <h3>{item.percent}</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                )}
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