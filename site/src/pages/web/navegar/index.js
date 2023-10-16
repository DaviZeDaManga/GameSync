import './index.scss'
import axios from 'axios'

import BarraLateral from '../../../components/barraLateral'
import BarraDeCima from '../../../components/baraDeCima'
import FooterPage from '../../../components/footerpage/index,'

import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default function Navegar() {
    const [tgames, setTgames] = useState ([])

    async function ProcurarGames () {
        let url = 'https://api.rawg.io/api/games?key=0a526d3c3985430c9469d8d6951eb5cb&page_size=300'
        let resposta = await axios.get(url)

        setTgames(resposta.data.results)
    }

    useEffect(()=> {
        ProcurarGames()
    }, [])
    
    return(
        <div className='Navegar'>
            <BarraDeCima/>
            <BarraLateral/>

            <section id='Navegar'> 

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

            </div>

           

            <FooterPage/>
        </div>
    )
}