import './index.scss'

import BarraLateral from '../../../components/barraLateral'
import FooterPage from '../../../components/footerpage/index,'
import { useState, useEffect, useRef } from 'react'
import {Swiper, SwiperSlide } from 'swiper/react'
import storage from 'local-storage';
import { useNavigate } from 'react-router-dom';

import 'swiper/css'
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';

export default function EscolherLogin() {
    const navigate = useNavigate()

    function sairLogin(){
        storage.remove('user-logado');
        navigate('/')
    }

    return(
        <div className='ELogin'>
            <BarraLateral/>
            <section id='ELogin'>

            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                <SwiperSlide><button onClick={sairLogin} className='sair'>SAIR</button></SwiperSlide>
                <SwiperSlide><button></button></SwiperSlide>
                <SwiperSlide><button></button></SwiperSlide>
                <SwiperSlide><button></button></SwiperSlide>
                <SwiperSlide><button></button></SwiperSlide>
                <SwiperSlide><button></button></SwiperSlide>
                <SwiperSlide><button></button></SwiperSlide>
                <SwiperSlide><button></button></SwiperSlide>
                <SwiperSlide><button></button></SwiperSlide>
            </Swiper>

                {/* <section className='contas'>

                    <main className='add-conta'>
                        <img src="/assets/images/login/add.png" />
                    </main>
                    <section className='conta'>
                        <img src='/assets/images/GameSync/blue.webp' />
                        <section className='info-conta'>
                            <h1>Davi Matinho</h1>
                        </section>
                    </section>
                    <section className='conta'>
                        <img src='/assets/images/GameSync/blue.webp' />
                        <section className='info-conta'>
                            <h1>Robertin</h1>
                        </section>
                    </section>
                    <section className='conta'>
                        <img src='/assets/images/GameSync/blue.webp' />
                        <section className='info-conta'>
                            <h1>Lucas</h1>
                        </section>
                    </section>

                </section> */}

            </section>
        </div>
    )
}