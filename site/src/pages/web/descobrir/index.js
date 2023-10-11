import './index.scss'

import axios from 'axios'

import BarraLateral from '../../../components/barraLateral'
import BarraDeCima from '../../../components/baraDeCima'
import FooterPage from '../../../components/footerpage/index,'
import { useState, useEffect, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, Mousewheel } from 'swiper/modules';


export default function Descobrir () {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    const [tgames, setTgames] = useState ([])
    const [indie, setIndie] = useState ([])

    async function ProcurarGames () {
        let url = 'https://api.rawg.io/api/games?key=0a526d3c3985430c9469d8d6951eb5cb&page_size=6'
        let resposta = await axios.get(url)

        setTgames(resposta.data.results)
    }

    useEffect(()=> {
        ProcurarGames()
    }, [])

    async function Indie() {
        let url = 'https://api.rawg.io/api/genres?key=0a526d3c3985430c9469d8d6951eb5cb&page_size=5'
        let resposta = await axios.get(url)

        setIndie(resposta.data)
    }









    return (
        <div className='Descobrir'>
            <BarraDeCima/>
            <BarraLateral/>
                <main id='news'>
                    <section className='news-games'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                        delay: 7000,
                        disableOnInteraction: false,
                        }}
                        pagination={{
                        clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        className="mySwiper"
                    >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                        <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                        </div>
                    </Swiper>
                    </section>
                    <section className='news-note'>
                        
                        <section className='animation-note'>
                            <div className='note'>
                                <main className='img'>
                                    
                                </main>
                                <section className='conteudo'>
                                    <div className='info'>
                                        <h1>Portal 2</h1>
                                        <p>Um dos grandes diferenciais de Mortal Kombat é o fato de apresentar lutadores que não são totalmente</p>
                                    </div>
                                    <div className='acoes'>
                                        <button>Compartilhar</button>
                                        <div className='salvar'></div>
                                    </div>
                                </section>
                            </div>
                        </section>


                        <section className='animation-note'>
                            <div className='note'>
                                <main className='img'>
                                    
                                </main>
                                <section className='conteudo'>
                                    <div className='info'>
                                        <h1>Portal 1</h1>
                                        <p>Um dos grandes diferenciais de Mortal Kombat é o fato de apresentar lutadores que não são totalmente</p>
                                    </div>
                                    <div className='acoes'>
                                        <button>Compartilhar</button>
                                        <div className='salvar'></div>
                                    </div>
                                </section>
                            </div>
                        </section>
                        <button>Ver mais noticias</button>
                    </section>
                </main>


                <section id='temas'>
                    <div className='tema'>

                    </div>
                    <div className='tema'>

                    </div>
                    <div className='tema'>

                    </div>
                </section>
            


            <FooterPage/>
        </div>
    )
}