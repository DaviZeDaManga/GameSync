import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { BuscarProdutos } from '../../../connection/produtosAPI';
import { BuscarImagem } from '../../../connection/produtosAPI';

export default function Noticias() {

    const [noticias, setNoticias] = useState([])

    async function CarregarNoticias() {
        let resposta = await BuscarProdutos()
        setNoticias(resposta)
    }

    useEffect(()=> {
        CarregarNoticias()
    }, [])

    console.log(noticias)
    
    return(

        
        <main id="noticias" >
            <BarraLateral
            noticias={true}
            />

            {/* <Title
            nome={'Ultimas noticias do momento'}
            /> */}

            <section id='now'>
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
                        <img src='https://imgs.search.brave.com/iUFg584I9zb0E3QX6zfMz6aQtWnV_9fzZsruETWF7Ow/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nYW1l/cy5vbGFuZXJkLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8xMC8xNjY2MDI1/MzI3Xzc3MF9IaXN0/b3JpYS1kZS1EYXJr/LVNvdWxzLUd3eW4t/bHV0YS1kZS1jaGVm/ZS1lLW11aXRvLmpw/Zw' />
                        <div className='conteudo'>
                            
                        </div>
                    </SwiperSlide>       
                    <SwiperSlide>
                        <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />
                        <div className='conteudo'>
                            
                        </div>
                    </SwiperSlide>  
                    <SwiperSlide>
                        <img src='https://images5.alphacoders.com/609/609173.jpg' />
                        <div className='conteudo '>
                            
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>

            <section className='redirects'>
                <section className='fy'>
                    <p>Descobrir</p>
                    <p>Seguindo</p>
                </section>
                <p>Novos</p>
                <p>Jogos</p>
                <p>Empresas</p>
            </section>

            <main className='noticias'>
                
                {noticias.map( item =>
                    
                <section className={`card ${item.produto_id == 3 && 'cardzao'}`} >
                    
                    <section className='img'>
                        <img src={BuscarImagem(item.imagem_produto)} />
                    </section>

                    <section className='conteudo'>
                        <div className='sub'>
                            <p>Subtitulo</p>
                        </div>
                        <div className='titulo'>
                            <h1>Alexandre Corrêa fala pela primeira vez sobre suposta agressão, nega</h1>
                        </div>
                    </section>
                </section>    
                    
                )}


            </main>

        </main>
    )
}