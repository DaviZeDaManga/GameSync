import './index.scss'
import { useState, useRef } from 'react'
import BarraLateral from '../../../components/barraLateral'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { Keyboard, Mousewheel, Pagination } from 'swiper/modules';


export default function GameSync() {

    return(
        <div className='GameSync PageTransform'>
            <BarraLateral/>
            <Swiper
                direction={'vertical'}
                pagination={{
                clickable: true,
                }}
                keyboard={true}
                mousewheel={true}
                modules={[Pagination, Keyboard, Mousewheel]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <section className='fundo inicio'>
                        <section className='card'>

                        </section>
                    </section>
                </SwiperSlide>
                <SwiperSlide>
                    <section className='fundo dois'>
                        <section className='card'>

                        </section>
                    </section>
                </SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </div>
    )
}