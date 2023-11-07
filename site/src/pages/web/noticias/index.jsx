import './index.scss'
import BarraDeCima from '../../../components/baraDeCima'
import BarraLateral from '../../../components/barraLateral'

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function Noticias() {


    
    return(

        
        <main id="noticias" >
            <BarraLateral
            noticias={true}
            />

            <section id='now'>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide>
                    <section className='now'>
                        <div className='card borda'>
                            <img src='https://imgs.search.brave.com/iUFg584I9zb0E3QX6zfMz6aQtWnV_9fzZsruETWF7Ow/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nYW1l/cy5vbGFuZXJkLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8xMC8xNjY2MDI1/MzI3Xzc3MF9IaXN0/b3JpYS1kZS1EYXJr/LVNvdWxzLUd3eW4t/bHV0YS1kZS1jaGVm/ZS1lLW11aXRvLmpw/Zw' />
                                <div className='conteudo'>
                                    <h1>DarkSouls</h1>
                                    <p>Dark Souls conta a história de uma terra que no começo, na tida Era dos Anciões (Age of Ancients), o mundo era desforme, incompleto, e envolto por névoas. Esse período era dominado pelos Dragões Imortais (Everlasting Dragons), uma terra formada por cinzas e árvores gigantes.</p>
                                </div>
                        </div>

                        <div className='card borda'>
                            <img src='https://imgs.search.brave.com/Cx8HcIgyCmzwmAXupgBIYv0IMtr4_9ZvnKpzYVUfj1k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wMi50/cnJzZi5jb20vaW1h/Z2UvZmdldC9jZi83/NzQvMC9pbWFnZXMu/dGVycmEuY29tLzIw/MjEvMTAvMTEvMjA1/NzQ1ODA2MC1hLWNy/b25vbG9naWEtZGUt/ZG9vbS1zYWliYS1h/LW9yZGVtLWRvcy1q/b2dvcy1jYXBhLnBu/Zw' />
                                <div className='conteudo'>
                                    <h1>Doom</h1>
                                    <p> Doom (comercializado como DOOM) é um jogo de computador lançado em 1994 pela id Software e um dos títulos que geraram o gênero tiro em primeira pessoa. Combinando gráficos 3D com violência gráfica e personagens 2D, ele tornou-se tão controverso quanto imensamente popular, com um lançamento em versão shareware que estima-se ter sido jogada por 15 milhões de pessoas.</p>
                                </div>
                        </div>

                        <div className='card borda'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrEXo8FcflttiEn1kJ_nqeXr8n9soemwx4Q&usqp=CAU' />
                                <div className='conteudo '>
                                    <h1>Noticia</h1>
                                    <p>Um dos maiores games da Rockstar tinha duas sequências planejadas, mas que não saíram do papel</p>
                                </div>
                        </div>
                        
                    </section>
                </SwiperSlide>       
                <SwiperSlide>
                    <section className='now'>
                        <div className='card borda'>
                            <img src='https://imgs.search.brave.com/iUFg584I9zb0E3QX6zfMz6aQtWnV_9fzZsruETWF7Ow/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nYW1l/cy5vbGFuZXJkLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8xMC8xNjY2MDI1/MzI3Xzc3MF9IaXN0/b3JpYS1kZS1EYXJr/LVNvdWxzLUd3eW4t/bHV0YS1kZS1jaGVm/ZS1lLW11aXRvLmpw/Zw' />
                                <div className='conteudo'>
                                    <h1>DarkSouls</h1>
                                    <p>Dark Souls conta a história de uma terra que no começo, na tida Era dos Anciões (Age of Ancients), o mundo era desforme, incompleto, e envolto por névoas. Esse período era dominado pelos Dragões Imortais (Everlasting Dragons), uma terra formada por cinzas e árvores gigantes.</p>
                                </div>
                        </div>

                        <div className='card borda'>
                            <img src='https://imgs.search.brave.com/Cx8HcIgyCmzwmAXupgBIYv0IMtr4_9ZvnKpzYVUfj1k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wMi50/cnJzZi5jb20vaW1h/Z2UvZmdldC9jZi83/NzQvMC9pbWFnZXMu/dGVycmEuY29tLzIw/MjEvMTAvMTEvMjA1/NzQ1ODA2MC1hLWNy/b25vbG9naWEtZGUt/ZG9vbS1zYWliYS1h/LW9yZGVtLWRvcy1q/b2dvcy1jYXBhLnBu/Zw' />
                                <div className='conteudo'>
                                    <h1>Doom</h1>
                                    <p> Doom (comercializado como DOOM) é um jogo de computador lançado em 1994 pela id Software e um dos títulos que geraram o gênero tiro em primeira pessoa. Combinando gráficos 3D com violência gráfica e personagens 2D, ele tornou-se tão controverso quanto imensamente popular, com um lançamento em versão shareware que estima-se ter sido jogada por 15 milhões de pessoas.</p>
                                </div>
                        </div>

                        <div className='card borda'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrEXo8FcflttiEn1kJ_nqeXr8n9soemwx4Q&usqp=CAU' />
                                <div className='conteudo '>
                                    <h1>Noticia</h1>
                                    <p>Um dos maiores games da Rockstar tinha duas sequências planejadas, mas que não saíram do papel</p>
                                </div>
                        </div>
                        
                    </section>
                </SwiperSlide>  
            </Swiper>
            </section>
        

        </main>
    )
}