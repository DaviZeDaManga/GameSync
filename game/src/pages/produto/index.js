import './index.scss'

import BarraLateral from '../../components/barraLateral'
import BarraDeCima from '../../components/baraDeCima'
import FooterPage from '../../components/footerpage/index,'

import { useState, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function Produto() {{
    const [mostdesc, setMostdesc] = useState (true)
    const [mostcoment, setMostcoment] = useState (false)

    function MostrarDescricao () {
        setMostdesc(true)
        setMostcoment(false)
    }

    function MostrarComentarios () {
        setMostdesc(false)
        setMostcoment(true)
    }

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return(
        <div className="Produto">
            <BarraLateral/>
            <BarraDeCima/>
            <section id="produto">
                
                <section id="info-produto">      
                    <div className="titulo">
                        <h1>The Texas Chain Saw Massacre</h1>
                        <p>O personagem Leatherface teve como inspiração o assassino serial Ed Gein, (1906-1984), que deu origem a outros vilões em outros livros e filmes, mas o caso real do assassino é bem mais monstruoso do que qualquer ficção. Sua primeira vítima foi seu irmão Henry, morto em 1944, embora nada tenha sido provado na época. No ano seguinte, a mãe dele morreu, e então Gein perdeu a razão e, eventualmente, começou a criar roupas e acessórios dos corpos de suas vítimas, das quais guardava os órgãos na sua casa.</p>
                    </div>
                    <section id='Comprar'>
                        <div className='info'>
                            <h1>R$109,90</h1>
                        </div>
                        <div className='acoes'>
                            <button>Comprar</button>
                            <div className='paraconta carrin'>

                            </div>
                            <div className='paraconta fav'>

                            </div>
                        </div>
                    </section>
                    <div id="classificacao">
                        <div className="classificado">
                            <img src="" />
                        </div>
                    </div>
                </section>

                <main id="produto-images">
                
                <Swiper
                    style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    <SwiperSlide>
                    <img src="/assets/images/teste/jogo.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src="/assets/images/teste/jogo1.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src="/assets/images/teste/jogo2.jfif" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src="/assets/images/teste/jogo3.jpg" />
                    </SwiperSlide>
                </Swiper>

                {/*<Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </SwiperSlide>
                </Swiper>*/}
                


                    
                </main>

            </section>

            <nav id="descOUcoment">
                <div className="selecionar">
                    <button id="a" onClick={MostrarDescricao}>
                        Detalhes
                    </button>
                    <button id="b" onClick={MostrarComentarios}>
                        Comentarios
                    </button>
                </div>
            </nav>

            {mostdesc == true &&
            <>
            <section id="descEstatus">
                <div className="desc">
                    <h1>Sobre</h1>
                    <div className="detalhes">

                        <div className="detalhe">
                            <h2>Desenvolvido por</h2>
                            <p>Sumo Nottingham</p>
                        </div>
                        <div className="detalhe">
                            <h2>Publicado por</h2>
                            <p>Gun Interactive</p>
                        </div>
                        <div className="detalhe">
                            <h2>Data de lançamento</h2>
                            <p>03/09/23</p>
                        </div>
                        <div className="detalhe">
                            <h2>Tamanho</h2>
                            <p>32.45GB</p>
                        </div>

                    </div>
                    <p>O personagem Leatherface teve como inspiração o assassino serial Ed Gein, (1906-1984), que deu origem a outros vilões em outros livros e filmes, mas o caso real do assassino é bem mais monstruoso do que qualquer ficção. Sua primeira vítima foi seu irmão Henry, morto em 1944, embora nada tenha sido provado na época. No ano seguinte, a mãe dele morreu, e então Gein perdeu a razão e, eventualmente, começou a criar roupas e acessórios dos corpos de suas vítimas, das quais guardava os órgãos na sua casa.

                    Assuma o papel de alguém da notória família Slaughter, ou de suas vítimas, em The Texas Chain Saw Massacre, uma experiência de terror assimétrico em terceira pessoa baseada no inovador e icônico filme de terror de 1974.
                    </p>
                </div>
                <div className="status">
                    <h1>Estatisticas</h1>
                    <div className="cards">

                        <div className="card">
                            <h2>Historia Principal</h2>
                            <p>0 minutos</p>
                            <div></div>
                        </div>

                        <div className="card">
                            <h2>Principal + Extras</h2>
                            <p>0 minutos</p>
                            <div></div>
                        </div>

                        <div className="card">
                            <h2>Complementos</h2>
                            <p>0 minutos</p>
                            <div></div>
                        </div>

                        <div className="card">
                            <h2>Todos os estilos</h2>
                            <p>0 minutos</p>
                            <div></div>
                        </div>

                    </div>
                    <div></div>
                </div>
                
            </section>
            
            <section id='titles'>
                <h1 className='tinf'>Os mais jogados</h1>
                <div className='temas'>
                    <p>Games</p>
                    <p>Novos</p>
                    <p>Bombando</p>
                </div>
            </section>


            <div id="produtos">  
                <section className='produto'>
                    <div className='imagem-produto'>
                        <div className='sombra'>
                            <div className='linha'></div>
                        </div>
                        <div className='produtoIMG'>
                            <img src="/assets/images/teste/jogo.jpg" />
                        </div>
                    </div>
                    <div className='informacoes'>
                        <div className='dados'>
                            <a href="http://localhost:3000/produto">The Texas Chain Saw Massacre</a>
                            <p>Sumo Nottingham</p>
                        </div>
                        <div className='info'>
                            <h3>Novidade</h3>
                        </div>
                    </div>
                </section>

                <section className='produto'>
                    <div className='imagem-produto'>
                        <div className='sombra'>
                            <div className='linha'></div>
                        </div>
                        <div className='produtoIMG'>
                            <img src="/assets/images/teste/uau.jpg" />
                        </div>
                    </div>
                    <div className='informacoes'>
                        <div className='dados'>
                            <a href="http://localhost:3000/produto">The Texas Chain Saw Massacre</a>
                            <p>Sumo Nottingham</p>
                        </div>
                        <div className='info'>
                            <h3>Novidade</h3>
                        </div>
                    </div>
                </section>

                <section className='produto'>
                    <div className='imagem-produto'>
                        <div className='sombra'>
                            <div className='linha'></div>
                        </div>
                        <div className='produtoIMG'>
                            <img src="/assets/images/teste/futzada.webp" />
                        </div>
                    </div>
                    <div className='informacoes'>
                        <div className='dados'>
                            <a href="http://localhost:3000/produto">The Texas Chain Saw Massacre</a>
                            <p>Sumo Nottingham</p>
                        </div>
                        <div className='info'>
                            <h3>Novidade</h3>
                        </div>
                    </div>
                </section>

                <section className='produto'>
                    <div className='imagem-produto'>
                        <div className='sombra'>
                            <div className='linha'></div>
                        </div>
                        <div className='produtoIMG'>
                            <img src="/assets/images/teste/starfield.jpg" />
                        </div>
                    </div>
                    <div className='informacoes'>
                        <div className='dados'>
                            <a href="http://localhost:3000/produto">The Texas Chain Saw Massacre</a>
                            <p>Sumo Nottingham</p>
                        </div>
                        <div className='info'>
                            <h3>Novidade</h3>
                        </div>
                    </div>
                </section>

                <section className='produto'>
                    <div className='imagem-produto'>
                        <div className='sombra'>
                            <div className='linha'></div>
                        </div>
                        <div className='produtoIMG'>
                            <img src="/assets/images/teste/dead-by-daylight.jpg" />
                        </div>
                    </div>
                    <div className='informacoes'>
                        <div className='dados'>
                            <a href="http://localhost:3000/produto">The Texas Chain Saw Massacre</a>
                            <p>Sumo Nottingham</p>
                        </div>
                        <div className='info'>
                            <h3>Novidade</h3>
                        </div>
                    </div>
                </section>
            </div>
            </>}

            {mostcoment == true &&
            <section id="comentarios">
                <div id='status'>
                    <div className="status">
                        <div className="resultado">
                            <h1>4.9</h1>
                            <p>12.432 avaliações feitas</p>
                        </div>
                        <div className='estatisticas'>

                            <div className='resultado'>
                                <p>5</p>
                                <div className='porcentagem'>
                                    <div id="p5" className='porcento'></div>
                                </div>
                                <p>79%</p>
                            </div>
                            <div className='resultado'>
                                <p>4</p>
                                <div className='porcentagem'>
                                    <div id="p4" className='porcento'></div>
                                </div>
                                <p>8%</p>
                            </div>
                            <div className='resultado'>
                                <p>3</p>
                                <div className='porcentagem'>
                                    <div id="p3" className='porcento'></div>
                                </div>
                                <p>9%</p>
                            </div>
                            <div className='resultado'>
                                <p>2</p>
                                <div className='porcentagem'>
                                    <div id="p2" className='porcento'></div>
                                </div>
                                <p>1%</p>
                            </div>
                            <div className='resultado'>
                                <p>1</p>
                                <div className='porcentagem'>
                                    <div id="p1" className='porcento'></div>
                                </div>
                                <p>3%</p>
                            </div>

                        </div>
                    </div>
                    <button>Adicionar comentario</button>
                </div>
                <div className="comentarios">

                    <div className="comentario">
                        <div className='conteudo'>
                            <section className='c-user'>
                                <div className='c-user-image'>

                                </div>
                                <h1>Davizin do Corre</h1>
                            </section>
                            <main id='comentario'>
                                <p>Sem dúvida, "Aurora Eterna" é uma obra-prima que mergulha os jogadores em um mundo de fantasia deslumbrante e imersivo. Desde o momento em que você inicia o jogo, é cativado por sua narrativa rica e envolvente, que tece uma teia de mistério e descoberta a cada passo.
Os visuais de "Aurora Eterna" são simplesmente deslumbrantes. Cada cenário é meticulosamente projetado, repleto de detalhes que enriquecem a experiência. Desde as paisagens pitorescas até os interiores intricados, é evidente o cuidado colocado em cada pixel. A iluminação dinâmica e os efeitos visuais de tirar o fôlego transportam os jogadores para um mundo que parece ganhar vida.</p>
                            </main>
                        </div>
                        <section className='estrelas'>
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                        </section>
                    </div>

                    <div className="comentario">
                        <div className='conteudo'>
                            <section className='c-user'>
                                <div className='c-user-image'>

                                </div>
                                <h1>Luis misera</h1>
                            </section>
                            <main id='comentario'>
                                <p>Sem dúvida, "Aurora Eterna" é uma obra-prima que mergulha os jogadores em um mundo de fantasia deslumbrante e imersivo. Desde o momento em que você inicia o jogo, é cativado por sua narrativa rica e envolvente, que tece uma teia de mistério e descoberta a cada passo.   
                                </p>
                            </main>
                        </div>
                        <section className='estrelas'>
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                        </section>
                    </div>

                    <div className="comentario">
                        <div className='conteudo'>
                            <section className='c-user'>
                                <div className='c-user-image'>

                                </div>
                                <h1>Davizin do Corre</h1>
                            </section>
                            <main id='comentario'>
                                <p>Sem dúvida, "Aurora Eterna" é uma obra-prima que mergulha os jogadores em um mundo de fantasia deslumbrante e imersivo. Desde o momento em que você inicia o jogo, é cativado por sua narrativa rica e envolvente, que tece uma teia de mistério e descoberta a cada passo.
                                Os visuais de "Aurora Eterna" são simplesmente deslumbrantes. Cada cenário é meticulosamente projetado, repleto de detalhes que enriquecem a experiência. Desde as paisagens pitorescas até os interiores intricados, é evidente o cuidado colocado em cada pixel. A iluminação dinâmica e os efeitos visuais de tirar o fôlego transportam os jogadores para um mundo que parece ganhar vida
                                Os visuais de "Aurora Eterna" são simplesmente deslumbrantes. Cada cenário é meticulosamente projetado, repleto de detalhes que enriquecem a experiência. Desde as paisagens pitorescas até os interiores intricados, é evidente o cuidado colocado em cada pixel. A iluminação dinâmica e os efeitos visuais de tirar o fôlego transportam os jogadores para um mundo que parece ganhar vida
                                </p>
                            </main>
                        </div>
                        <section className='estrelas'>
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                            <img src="/assets/images/avaliacao/estrela.png" />
                        </section>
                    </div>  
                    
                </div>
            </section>}
            <FooterPage/>
        </div>
    )
}}