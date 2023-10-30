import './index.scss'

import { useInView } from 'framer-motion';

import BarraDeCima from '../../../components/baraDeCima'
import BarraLateral from '../../../components/barraLateral'

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Keyboard, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';







export default function AcessPlano() {

    function Nav({ children }) {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });
      
        return (
          <nav ref={ref}>
            <span
              style={{
                transform: isInView ? "none" : "translateX(-200px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
              }}
            >
              {children}
            </span>
          </nav>
        );
    }

    return(
        <div id='Plano'>
            <BarraDeCima/>
            <BarraLateral/>

            <section className='news'>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
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
                <SwiperSlide>
                    <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />
                    <Nav>
                        <div className='conteudo borda'>
                            <h1>The Elder Scrolls</h1>
                            <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>
                        </div>
                    </Nav>
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





            
            
            

        </div>
    )
}