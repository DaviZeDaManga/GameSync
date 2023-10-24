import './index.scss'
import { useState, useRef } from 'react'

import BarraLateral from '../../../components/barraLateral'
import BarraDeCima from '../../../components/baraDeCima'
import FooterPage from '../../../components/footerpage/index,'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { Parallax, Navigation, EffectCube, Pagination } from 'swiper/modules';


export default function GameSync() {

    return(
        <div className='GameSync'>
            <BarraDeCima/>
            <BarraLateral/>
            <main id='vinheta'>
                <img src="./assets/images/GameSync/giphy-unscreen.gif" />
                <h1>GameSync</h1>
            </main>

            <section id='GameSync'>
                <div>
                <h1>GameSync</h1>
                <p>Uma desenvolvedora de jogos eletrônicos, também conhecida como game developer studios, é uma produtora especializada no desenvolvimento de jogos eletrônicos. Uma empresa pode se especializar em uma certa plataforma ou pode criar jogos para uma variedade de sistemas.</p>
                </div>

                <section id='secret'>
                    <Swiper
                        effect={'cube'}
                        grabCursor={true}
                        cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                        }}
                        pagination={true}
                        modules={[EffectCube, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className='secret'></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='a'>
                                <p>Oxe, oq que voce ta fazendo aqui?</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='a'>
                                <p>Sai daqui AGORA!</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='a'>
                                <a href="">Nao aperte em mim</a>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </section>
                
            </section>

            <section id='beneficios'>
                <div className='card'>
                    <div className='title'>
                        <img src="/assets/images/GameSync/beneficios/caminhao-de-entrega.png" />
                       
                    </div>
                    <p>Entrega extremamente rapida após ter o pagamento aprovado</p>
                </div>
                <div className='card'>
                    <div className='title'>
                        <img src="/assets/images/GameSync/beneficios/cartao.png" />
                       
                    </div>
                    <p>Parcele suas compras em até 16 vezes sem juros usando plano Emerald</p>
                </div>
                <div className='card'>
                    <div className='title'>
                        <img src="/assets/images/GameSync/beneficios/converter-dinheiro.png" />
                        
                    </div>
                    <p>Uma parte dos ganhos da nossa empresa é destinada em avanços tecnologicos para empresas pequenas</p>
                </div>
                <div className='card'>
                    <div className='title'>
                        <img src="/assets/images/GameSync/beneficios/caminhao-de-entrega.png" />
                        
                    </div>
                    <p>Sempre fique atento a sua caixa de notificação, estamos sempre mandando ofertas exclusivas! ;)</p>
                </div>
            </section>

            <section id="sobre">
                <div className='card'>

                <Swiper
                    style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                    }}
                    speed={600}
                    parallax={true}
                    pagination={{
                    clickable: true,
                    }}
                    navigation={true}
                    modules={[Parallax, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <div
                    slot="container-start"
                    className="parallax-bg"
                    style={{
                        'background-image':
                        '',
                    }}
                    data-swiper-parallax="-23%"
                    ></div>
                    <SwiperSlide>
                    <div className="title" data-swiper-parallax="-300">
                        Feita pra voce!
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                        dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                        laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                        Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                        Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                        ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                        tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                        </p>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="title" data-swiper-parallax="-300">
                        Slide 2
                    </div>
                    <div className="subtitle" data-swiper-parallax="-200">
                        Subtitle
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                        dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                        laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                        Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                        Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                        ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                        tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                        </p>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="title" data-swiper-parallax="-300">
                        Slide 3
                    </div>
                    <div className="subtitle" data-swiper-parallax="-200">
                        Subtitle
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                        dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                        laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                        Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                        Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                        ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                        tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                        </p>
                    </div>
                    </SwiperSlide>
                </Swiper>

                </div>
                <main className='card-2'>
                    <div className='card'>

                    </div>
                    <div className='card white'>
                        <h1>Quem Somos?</h1>
                        <p>Somos uma empresa em busca de trazer disponibilidade e conforto para nossos usuarios, de forma acessivel e pratica, através de nossos planos, jogos, engine, etc.</p>
                    </div>
                </main>
            </section>
            <FooterPage/>
        </div>
    )
}