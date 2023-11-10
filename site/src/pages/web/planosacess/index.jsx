import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function Planosacess() {

    return(
        <div className='Planosacess'>
            <BarraLateral/>
            <Title
            nome={'Seja bem-vindo!'}
            voltar={true}
            />

            <section className='danadinho'>

            </section>

            <section className='news'>
                <main className='news-cards'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                    clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        
                    </SwiperSlide>
                    <SwiperSlide>
                        
                    </SwiperSlide>
                    <SwiperSlide>
                        
                    </SwiperSlide>
                    <SwiperSlide>
                        
                    </SwiperSlide>
                    <SwiperSlide>
                        
                    </SwiperSlide>
                    <SwiperSlide>
                        
                    </SwiperSlide>
                    <SwiperSlide>
                        
                    </SwiperSlide>
                    
                </Swiper>
                </main>
            </section>
        </div>
    )
}