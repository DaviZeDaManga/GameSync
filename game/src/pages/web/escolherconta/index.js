import './index.scss'

import BarraLateral from '../../../components/barraLateral'
import FooterPage from '../../../components/footerpage/index,'
import { useState, useEffect, useRef } from 'react'
import {Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';

export default function EscolherLogin() {

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
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
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