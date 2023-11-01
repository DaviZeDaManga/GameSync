import './index.scss'

import { useInView } from 'framer-motion';

import BarraDeCima from '../../../components/baraDeCima'
import BarraLateral from '../../../components/barraLateral'

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';







export default function Home() {

    function Nav({ children }) {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });
      
        return (
          <nav ref={ref}>
            <span
              style={{
                transform: isInView ? "none" : "translateX(-200px)",
                opacity: isInView ? 1 : 0,
                background: isInView ? "linear-gradient(90deg, rgba(0, 0, 0, 0.578), rgba(19, 19, 19, 0.049))" : "linear-gradient(90deg, black, black);",
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
            >
              {children}
            </span>
          </nav>
        );
    }

    const [cardprod, setCardprod] = useState(false)
    function CardProd() {
        setCardprod(!cardprod)
    }

    return(
        <div id='Plano'>
            <BarraDeCima/>
            <BarraLateral/>

            {cardprod == true &&
            <section className='cardprod'>
                <Nav>
                    <section className='card'>
                        <div onClick={CardProd} className='voltar'>
                            <img src='/assets/images/acoes/remover.png' />
                        </div>

                        <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />
                        <div className='conteudoC borda'>
                            <h1>The Elder Scrolls</h1>
                            <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>

                            <Link to={'/produto/43'}>
                                <nav className='buttons'>
                                    <button>Ver game</button>
                                </nav>
                            </Link>
                        </div>
                    </section>
                </Nav>
            </section>}







            <section className='news'>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={15}
                keyboard={{
                enabled: true,
                }}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Keyboard, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide onClick={CardProd}>

                        <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />

                    
                        <div className='conteudo borda'>
                            <h1>The Elder Scrolls</h1>
                            <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>
                        </div>
                    
                </SwiperSlide>
                
                <SwiperSlide>

                    <img src='https://images5.alphacoders.com/609/609173.jpg' />

                    <Nav>
                        <div className='conteudo borda'>
                            <h1>DarkSouls</h1>
                            <p>Dark Souls conta a história de uma terra que no começo, na tida Era dos Anciões (Age of Ancients), o mundo era desforme, incompleto, e envolto por névoas. Esse período era dominado pelos Dragões Imortais (Everlasting Dragons), uma terra formada por cinzas e árvores gigantes.</p>
                        </div>
                    </Nav>
                </SwiperSlide>
                

                <SwiperSlide>
                    <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />
                    <Nav>
                        <div className='conteudo borda'>
                            <h1>The Elder Scrolls</h1>
                            <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>
                        </div>
                    </Nav>
                </SwiperSlide>
                
                
            </Swiper>
            </section>

            <nav className='beneficios'>
                <button>Vantagens</button>
                <button>Jogos</button>
                <button>Engine</button>
            </nav>






            <section className='noticias'>
            <Swiper
                slidesPerView={3}
                spaceBetween={15}
                pagination={{
                clickable: true,
                }}
                Navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />
                    <Nav>
                        <div className='conteudo borda'>
                            <section className='info'>
                                <h1>The Elder Scrolls</h1>
                                <div className='sobre'>
                                    <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>
                                </div>
                            </section>
                        </div>
                    </Nav>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://imgs.search.brave.com/iUFg584I9zb0E3QX6zfMz6aQtWnV_9fzZsruETWF7Ow/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nYW1l/cy5vbGFuZXJkLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8xMC8xNjY2MDI1/MzI3Xzc3MF9IaXN0/b3JpYS1kZS1EYXJr/LVNvdWxzLUd3eW4t/bHV0YS1kZS1jaGVm/ZS1lLW11aXRvLmpw/Zw' />
                    <Nav>
                        <div className='conteudo borda'>
                            <section className='info'>
                                <h1>DarkSouls</h1>
                                <div className='sobre'>
                                    <p>Dark Souls conta a história de uma terra que no começo, na tida Era dos Anciões (Age of Ancients), o mundo era desforme, incompleto, e envolto por névoas. Esse período era dominado pelos Dragões Imortais (Everlasting Dragons), uma terra formada por cinzas e árvores gigantes.</p>
                                </div>
                            </section>
                        </div>
                    </Nav>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://imgs.search.brave.com/Cx8HcIgyCmzwmAXupgBIYv0IMtr4_9ZvnKpzYVUfj1k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wMi50/cnJzZi5jb20vaW1h/Z2UvZmdldC9jZi83/NzQvMC9pbWFnZXMu/dGVycmEuY29tLzIw/MjEvMTAvMTEvMjA1/NzQ1ODA2MC1hLWNy/b25vbG9naWEtZGUt/ZG9vbS1zYWliYS1h/LW9yZGVtLWRvcy1q/b2dvcy1jYXBhLnBu/Zw' />
                    <Nav>
                        <div className='conteudo borda'>
                            <section className='info'>
                                <h1>Doom</h1>
                                <div className='sobre'>
                                    <p>Doom (comercializado como DOOM) é um jogo de computador lançado em 1994 pela id Software e um dos títulos que geraram o gênero tiro em primeira pessoa. Combinando gráficos 3D com violência gráfica e personagens 2D, ele tornou-se tão controverso quanto imensamente popular, com um lançamento em versão shareware que estima-se ter sido jogada por 15 milhões de pessoas.</p>
                                </div>
                            </section>
                        </div>
                    </Nav>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://imgs.search.brave.com/XiqHB2N0NKYCeh9puVVBxDk1MQ85PRwKjK9aDwsnXWU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zbS5p/Z24uY29tL3QvaWdu/X2JyL3NjcmVlbnNo/b3QvaC9oMzExLWJ1/bGx5L2gzMTEtYnVs/bHloM2Rpc2JhcnJl/ZC1hdHRvcm5leS1h/bmQtdmlkZW8tZ2Ft/ZS1pbmR1c3RyeS1w/ZXN0X2E5MmEuMjgw/LmpwZw' />
                    <Nav>
                        <div className='conteudo borda'>
                            <section className='info'>
                                <h1>The Elder Scrolls</h1>
                                <div className='sobre'>
                                    <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>
                                </div>
                            </section>
                        </div>
                    </Nav>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />
                    <Nav>
                        <div className='conteudo borda'>
                            <section className='info'>
                                <h1>The Elder Scrolls</h1>
                                <div className='sobre'>
                                    <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>
                                </div>
                            </section>
                        </div>
                    </Nav>
                </SwiperSlide>
                
                
            </Swiper>
            </section>





            
            
            

        </div>
    )
}