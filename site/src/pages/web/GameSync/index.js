import './index.scss'
import { useState, useRef } from 'react'

import BarraLateral from '../../../components/barraLateral'
import BarraDeCima from '../../../components/baraDeCima'
import FooterPage from '../../../components/footerpage/index,'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { EffectCube, Pagination } from 'swiper/modules';


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
                    <h1>Bem-vindo à GameSync</h1>
                    <p>Na GameSync, não somos apenas uma loja de jogos; somos um ecossistema completo projetado para elevar sua experiência no universo dos games. Descubra por que somos a escolha número um de gamers em todo o mundo!</p>
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