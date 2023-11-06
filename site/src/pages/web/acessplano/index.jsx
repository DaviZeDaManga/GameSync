import './index.scss'

import { useInView } from 'framer-motion';

import BarraDeCima from '../../../components/baraDeCima'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';







export default function Home() {

    function Nav({ children }) {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });
      
        return (
          <nav ref={ref}>
            <span
              style={{
                transform: isInView ? "none" : "translateX(-200px)",
                opacity: isInView ? 1 : 0,
                background: isInView ? "linear-gradient(90deg, rgba(0, 0, 0, 0.578), rgba(19, 19, 19, 0.049))" : "linear-gradient(90deg, black, black);",
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
            >
              {children}
            </span>
          </nav>
        );
    }

    const [cardprod, setCardprod] = useState(false)
    function CardProd() {
        setCardprod(!cardprod)
    }

    return(
        <div id='Plano'>
            <BarraDeCima/>
            <BarraLateral/>

            {cardprod == true &&
            <section className='cardprod'>
                <Nav>
                    <section className='card'>
                        <div onClick={CardProd} className='voltar'>
                            <img src='/assets/images/acoes/remover.png' />
                        </div>

                        <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />
                        <div className='conteudoC borda'>
                            <h1>The Elder Scrolls</h1>
                            <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>

                            <Link to={'/produto/43'}>
                                <nav className='buttons'>
                                    <button>Ver game</button>
                                </nav>
                            </Link>
                        </div>
                    </section>
                </Nav>
            </section>}





            {/* <Title nome="Home" /> */}

            <section className='news'>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={15}
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
                <SwiperSlide onClick={CardProd}>
                        <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />

                        <div className='conteudo borda'>
                            <h1>The Elder Scrolls</h1>
                            <p>The Elder Scrolls V: Skyrim acontece em Skyrim, uma região que vem sendo ameaçada por uma guerra civil, seguida pelo retorno dos dragões e de Alduin, o deus da destruição e antagonista da história. Skyrim fica no extremo norte do continente de Tamriel.</p>                     
                        </div>
                    
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
                <button>Planos</button>
                <button>Resgatar</button>
            </nav>





            {/* <section id='title'>
                <div className='title'>
                    <h1>Noticias Recentes</h1>
                </div>
                <button>Ver Mais</button>
            </section> */}

            <section className='new-noticias'>
                <section className='noticia'>
                    <img src='https://cdn2.unrealengine.com/fortnite-chapter-4-og-overview-page-key-art-bg-1920x1080-1fbc3a1c0297.jpg' />

                    <div className='conteudo borda'>
                        <h1>The Elder Scrolls</h1>
      
                    </div>
                </section>
                <section className='noticia'>
                    <img src='https://i0.wp.com/manolinhogeek.com.br/wp-content/uploads/2023/04/super-mario-bros-o-filme-bg.jpg?fit=1920%2C1025&ssl=1' />

                    <div className='conteudo borda'>
                        <h1>The Elder Scrolls</h1>

                    </div>
                </section>
                <section className='noticia'>
                    <img src='https://pixelz.cc/wp-content/uploads/2019/03/the-elder-scrolls-online-wqhd-1440p-wallpaper.jpg' />

                    <div className='conteudo borda'>
                        <h1>The Elder Scrolls</h1>
                  
                    </div>
                </section>

            </section>






            
            

            

            {/* <section id='produtos'>
                <Link to={'/produto/6'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/llbDeBAVS7iq4jGj8Iyja-CC3ydEya61OEHMcGEJTGA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM3LmFscGhhY29k/ZXJzLmNvbS8zMzMv/MzMzMzcwLmpwZw' alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">Minecraft</a>
                                <p>Mojang</p>
                            </div>
                            <div className='info'>
                                <h3>New</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                <Link to={'/produto/6'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/LsnOpfC1UFlZz1aXhlUjJ74qP9PzGelZzzJPEuPkkNw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXItbWFuaWEu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzA5L0hpZ2hf/cmVzb2x1dGlvbl93/YWxscGFwZXJfYmFj/a2dyb3VuZF9JRF83/NzcwMDg1Nzk5MC5q/cGc' alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">Mortal Kombat XL</a>
                                <p>Bethesda Games</p>
                            </div>
                            <div className='info'>
                                <h3>Lançamento</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                <Link to={'/produto/6'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/pJ19mPP8khouTIg0d8nrcwPjIoWi-LEqRWyrtaiQAIU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDIwMzMx/OTEuanBn' alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">Resident Evil 4</a>
                                <p>Bethesda Games</p>
                            </div>
                            <div className='info'>
                                <h3>Lançamento</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                <Link to={'/produto/6'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/3ZFsLr3c-DeSfzTKKJZlOhnueH9Jh7MMbq0i-1IRLUM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS84OC8z/Mi84bmR3eGcucG5n' alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">Sonic</a>
                                <p>Bethesda Games</p>
                            </div>
                            <div className='info'>
                                <h3>Lançamento</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                <Link to={'/produto/6'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/LsnOpfC1UFlZz1aXhlUjJ74qP9PzGelZzzJPEuPkkNw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXItbWFuaWEu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzA5L0hpZ2hf/cmVzb2x1dGlvbl93/YWxscGFwZXJfYmFj/a2dyb3VuZF9JRF83/NzcwMDg1Nzk5MC5q/cGc' alt='Conquista'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a href="">Mortal Kombat XL</a>
                                <p>Bethesda Games</p>
                            </div>
                            <div className='info'>
                                <h3>Lançamento</h3>
                            </div>
                        </div>
                    </section>
                </Link>
                <Link to={'/produto/3242'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/iQTxvuCmVcvedwSYDq3jBtXyj9BXZNsaRtEz0zeHQIk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kaWd3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXJz/L2Z1bGwvNC8zLzgv/MzM3NDEtMTkyMHgx/MDgwLXN0YXJkZXct/dmFsbGV5LWJhY2tn/cm91bmQtaW1hZ2Ut/ZGVza3RvcC1oZC5q/cGc'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a>Stardew Valley</a>
                                <p>Ubsoft</p>
                            </div>
                            <div className='info'>
                                <h3>Novidade</h3>
                            </div>
                        </div>
                    </section>  
                </Link>
                <Link to={'/produto/3242'}>
                    <section className='produto'>
                        <div className='imagem-produto'>
                            <div className='sombra'>
                                <div className='linha'></div>
                            </div>
                            <div className='produtoIMG'>
                                <img src='https://imgs.search.brave.com/9wB7RRXFdmb9pW6Y_xHWCaxMuoMYPLhZn4Qp851CyjQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvZ3JhbmQtdGhl/ZnQtYXV0by12LW5h/ZWo0eWlhcDRnbnho/Mm8uanBn'/>
                            </div>
                        </div>
                        <div className='informacoes'>
                            <div className='dados'>
                                <a>Grand The Auto V</a>
                                <p>Ubsoft</p>
                            </div>
                            <div className='info'>
                                <h3>Novidade</h3>
                            </div>
                        </div>
                    </section>  
                </Link>

            </section> */}


            



            
            
            

        </div>
    )
}