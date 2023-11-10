import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';

export default function Planosacess() {
    const [plano, setPlano] = useState(true)

    return(
        <div className='Planosacess'>
            <BarraLateral/>
            <Title
            nome={'Seja bem-vindo!'}
            voltar={true}
            />

            {plano == false &&
            <section className='danadinho'>

            </section>}

            <section className='news'>
                <main className='news-cards'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    pagination={{
                    clickable: true,
                    }}
                    // navigation={true}
                    keyboard={true}
                    modules={[Pagination, Navigation, Keyboard]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src='https://i.pinimg.com/564x/1e/19/2d/1e192d2479573e1bac4ee15a745b23b6.jpg' />
                        
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />
                        
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='https://images5.alphacoders.com/609/609173.jpg' />                   
                    </SwiperSlide>               
                </Swiper>
                </main>
            </section>
        </div>
    )
}