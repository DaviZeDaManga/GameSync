import './index.scss'

import axios from 'axios'

import BarraLateral from '../../components/barraLateral'
import BarraDeCima from '../../components/baraDeCima'
import FooterPage from '../../components/footerpage/index,'
import { useState, useEffect, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, Mousewheel } from 'swiper/modules';


export default function Descobrir () {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    const [tgames, setTgames] = useState ([])

    async function ProcurarGames () {
        let url = 'https://api.rawg.io/api/games?key=0a526d3c3985430c9469d8d6951eb5cb'
        let resposta = await axios.get(url)

        setTgames(resposta.data.results)
    }

    useEffect(()=> {
        ProcurarGames()
    }, [])

    return (
        <div className='Descobrir'>
            <BarraDeCima/>
            <BarraLateral/>

            <div id='novidade'>
                <section id='Descobrir'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                        delay: 6500,
                        disableOnInteraction: false,
                        }}
                        pagination={{
                        clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src="https://images3.alphacoders.com/132/1327236.jpeg" />
                            <section className='conteudo'>
                                <h1>Starfield</h1>
                                <p>Os jogadores assumem o papel de um dos exploradores espaciais da Constelação, um grupo de aventureiros que busca desvendar diversos segredos escondidos pela galáxia. Durante a trama, os integrantes procuram artefatos misteriosos em meio a uma guerra territorial entre as facções United Colonies e Freestar Collective.</p>
                            </section>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://images8.alphacoders.com/131/1311910.jpg" />
                            <section className='conteudo'>
                                <h1>Bruxa Maluca</h1>
                                <p>Uma bruxa que caminha por ai e é maluca</p>
                            </section>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://images.alphacoders.com/132/1327999.jpeg" />
                            <section className='conteudo'>
                                <h1>Resident Evil Village</h1>
                                <p>Resident Evil Village revela a personagem em detalhes e oferece respostas sobre o seu passado e motivações. Miranda perdeu a filha, ainda bebê, para a gripe espanhola, uma pandemia real que aconteceu no início do século XX. Tomada pelo desespero e depressão, ela foi até uma caverna para morrer.</p>
                            </section>
                        </SwiperSlide>
                        <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                        </div>
                    </Swiper>
                </section>

                <nav id='noticias'>
                    <div className='noticias'>

                        <main className='noticia'>
                            <div className='imagem'>
                                
                            </div>
                            <div className='conteudo'>
                                <section className="materia">
                                    <h1>Veja 7 curiosidades de Goro de Mortal Kombat</h1>
                                    <p>Um dos grandes diferenciais de Mortal Kombat é o fato de apresentar lutadores que não são totalmente humanos, criando situações que podem parecer até desiguais. E no primeiro game, um dos inimigos que muitos temiam era Goro, o guerreiro de quatro braços.

                                    Goro não apareceu em muitos games da franquia se comparado a nomes como Liu Kang, Sub-Zero e Scorpion, mas certamente é um personagem bastante lembrado por diversos jogadores. Por isso, trazemos a seguir algumas curiosidades referentes ao representante da Exoterra.</p>
                                </section>

                                <section className='compartilhar'>
                                    <button className='c'>Compartilhar</button>
                                    <button><img src="/assets/images/carrinho/salvar.png" /></button>
                                    <button><img src="/assets/images/carrinho/coracao.png" /></button>
                                </section>
                            </div>
                        </main>
                        <main className='noticia'>
                        <div className='imagem'>
                                
                            </div>
                            <div className='conteudo'>
                                <div className='materia'>
                                    <h1>Quanto tempo leva para zerar Mortal Kombat 1?</h1>
                                    <p>Com uma série de recursos e uma lista de personagens icônicos, o novo Mortal Kombat já ocupou seu lugar como um dos melhores jogos de luta do ano ao lado de Street Fighter 6. Se você ainda não teve a oportunidade de jogá-lo, mas quer saber quanto tempo demora para zerar o Mortal Kombat 1, então veio ao lugar certo!A conclusão da campanha de Mortal Kombat 1 leva em torno de seis horas de gameplay. Considerando que você, por exemplo, possa jogar apenas duas horas diárias, levará três dias para terminar o modo história. Caso queira completar todas as missões secundárias, que também incluem a Torre dos Desafios e o Modo Invasão, a jogatina de 14 horas pode levar cerca de uma semana.</p>
                                </div>

                                <section className='compartilhar'>
                                    <button className='c'>Compartilhar</button>
                                    <button><img src="/assets/images/carrinho/salvar.png" /></button>
                                    <button><img src="/assets/images/carrinho/coracao.png" /></button>
                                </section>
                            </div>
                        </main>
                        <main className='noticia'>
                        <div className='imagem'>
                                
                            </div>
                            <div className='conteudo'>
                                <div className='materia'>
                                    <h1>Nintendo 64: confira os 10 jogos mais emulados do console</h1>
                                    <p>O Nintendo 64 foi o terceiro console de mesa da Nintendo! Nele tivemos a chance de ver clássicos nascerem e franquias famosas da empresa ganhando ainda mais notoriedade. Ao longo do seu ciclo de vida foram centenas de games lançados — sendo que alguns ainda são jogados até hoje por meio de emuladores!

                                    Caso esteja curioso, listaremos abaixo quais são os 10 games de Nintendo 64 mais baixados para emulação. Será que o seu favorito está presente nessa lista? Confira!</p>
                                </div>

                                <section className='compartilhar'>
                                    <button className='c'>Compartilhar</button>
                                    <button><img src="/assets/images/carrinho/salvar.png" /></button>
                                    <button><img src="/assets/images/carrinho/coracao.png" /></button>
                                </section>
                            </div>
                        </main>

                    </div>

                    <button>Ver mais noticias</button>
                </nav>
            </div>






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
                            <img src="https://cdn.akamai.steamstatic.com/steam/apps/1433140/header.jpg?t=1692365618" />
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
                            <img src="https://images.alphacoders.com/132/1327530.jpeg" />
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
                            <img src="https://images2.alphacoders.com/597/597965.jpg" />
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
                            <img src="https://images8.alphacoders.com/132/1328385.jpeg" />
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
                            <img src="https://gugimages.s3.us-east-2.amazonaws.com/wp-content/uploads/2018/11/22034126/11-14-2018_6-49-18_AM.png" />
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







            




            <section id='descobrir3'>   
                <div className='card'>
                    <img src="https://images4.alphacoders.com/100/thumb-1920-1005943.png" />

                    <section className='info-descobrir'>
                        <h1>Chega em 21/03</h1>
                    </section>
                </div>
                <div className='card'>
                    <img src="https://i.pinimg.com/736x/fe/9c/c6/fe9cc6c3ebf629017bfbb48afbadab35.jpg" />

                    <section className='info-descobrir'>
                        <h1>Chega em 01/04</h1>
                    </section>
                </div>
                <div className='card'>
                    <img src="https://images2.alphacoders.com/597/597965.jpg" />

                    <section className='info-descobrir'>
                        <h1>Chega em 08/04</h1>
                    </section>
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
                            <img src="https://cdn.akamai.steamstatic.com/steam/apps/1433140/header.jpg?t=1692365618" />
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
                            <img src="https://images.alphacoders.com/132/1327530.jpeg" />
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
                            <img src="https://images2.alphacoders.com/597/597965.jpg" />
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
                            <img src="https://images8.alphacoders.com/132/1328385.jpeg" />
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
                            <img src="https://gugimages.s3.us-east-2.amazonaws.com/wp-content/uploads/2018/11/22034126/11-14-2018_6-49-18_AM.png" />
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






            <section id='titles'>
                <h1 className='tinf'>Noticias Gamers</h1>

            </section>

            <div id='novidade'>
                <nav id='noticias'>
                    <div className='noticias'>

                        <main className='noticia'>
                            <div className='imagem'>
                                <img src="/assets/images/teste/noticia1.webp" />
                            </div>
                            <div className='conteudo'>
                                <section className="materia">
                                    <h1>Veja 7 curiosidades de Goro de Mortal Kombat</h1>
                                    <p>Um dos grandes diferenciais de Mortal Kombat é o fato de apresentar lutadores que não são totalmente humanos, criando situações que podem parecer até desiguais. E no primeiro game, um dos inimigos que muitos temiam era Goro, o guerreiro de quatro braços.

                                    Goro não apareceu em muitos games da franquia se comparado a nomes como Liu Kang, Sub-Zero e Scorpion, mas certamente é um personagem bastante lembrado por diversos jogadores. Por isso, trazemos a seguir algumas curiosidades referentes ao representante da Exoterra.</p>
                                </section>

                                <section className='compartilhar'>
                                    <button className='c'>Compartilhar</button>
                                    <button><img src="/assets/images/carrinho/salvar.png" /></button>
                                    <button><img src="/assets/images/carrinho/coracao.png" /></button>
                                </section>
                            </div>
                        </main>
                        <main className='noticia'>
                        <div className='imagem'>
                                <img src="/assets/images/teste/noticia2.webp" />
                            </div>
                            <div className='conteudo'>
                                <div className='materia'>
                                    <h1>Quanto tempo leva para zerar Mortal Kombat 1?</h1>
                                    <p>Com uma série de recursos e uma lista de personagens icônicos, o novo Mortal Kombat já ocupou seu lugar como um dos melhores jogos de luta do ano ao lado de Street Fighter 6. Se você ainda não teve a oportunidade de jogá-lo, mas quer saber quanto tempo demora para zerar o Mortal Kombat 1, então veio ao lugar certo!A conclusão da campanha de Mortal Kombat 1 leva em torno de seis horas de gameplay. Considerando que você, por exemplo, possa jogar apenas duas horas diárias, levará três dias para terminar o modo história. Caso queira completar todas as missões secundárias, que também incluem a Torre dos Desafios e o Modo Invasão, a jogatina de 14 horas pode levar cerca de uma semana.</p>
                                </div>

                                <section className='compartilhar'>
                                    <button className='c'>Compartilhar</button>
                                    <button><img src="/assets/images/carrinho/salvar.png" /></button>
                                    <button><img src="/assets/images/carrinho/coracao.png" /></button>
                                </section>
                            </div>
                        </main>
                        <main className='noticia'>
                        <div className='imagem'>
                                <img src="/assets/images/teste/noticia3.webp" />
                            </div>
                            <div className='conteudo'>
                                <div className='materia'>
                                    <h1>Nintendo 64: confira os 10 jogos mais emulados do console</h1>
                                    <p>O Nintendo 64 foi o terceiro console de mesa da Nintendo! Nele tivemos a chance de ver clássicos nascerem e franquias famosas da empresa ganhando ainda mais notoriedade. Ao longo do seu ciclo de vida foram centenas de games lançados — sendo que alguns ainda são jogados até hoje por meio de emuladores!

                                    Caso esteja curioso, listaremos abaixo quais são os 10 games de Nintendo 64 mais baixados para emulação. Será que o seu favorito está presente nessa lista? Confira!</p>
                                </div>

                                <section className='compartilhar'>
                                    <button className='c'>Compartilhar</button>
                                    <button><img src="/assets/images/carrinho/salvar.png" /></button>
                                    <button><img src="/assets/images/carrinho/coracao.png" /></button>
                                </section>
                            </div>
                        </main>

                    </div>

                    <button>Ver mais noticias</button>
                </nav>
                <section id='Descobrir'>
                <Swiper
                    direction={'vertical'}
                    slidesPerView={1}
                    spaceBetween={30}
                    mousewheel={true}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Mousewheel, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src="https://tm.ibxk.com.br/2023/09/29/29100254877061.jpg?ims=704x264" />
                        <div className='conteudo'>
                            <h1>Nintendo 64: confira os 10 jogos mais emulados do console</h1>
                            <p>O Nintendo 64 foi o terceiro console de mesa da Nintendo! Nele tivemos a chance de ver clássicos nascerem e franquias famosas da empresa ganhando ainda mais notoriedade. Ao longo do seu ciclo de vida foram centenas de games lançados — sendo que alguns ainda são jogados até hoje por meio de emuladores!

                            Caso esteja curioso, listaremos abaixo quais são os 10 games de Nintendo 64 mais baixados para emulação. Será que o seu favorito está presente nessa lista? Confira!</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>Vai toma no cu</SwiperSlide>
                    <SwiperSlide>
                        <img src="https://tm.ibxk.com.br/2023/09/28/28171310833209.jpg?ims=704x264" />
                        <div className='conteudo'>
                            <h1>Quanto tempo leva para zerar Mortal Kombat 1?</h1>
                            <p>Com uma série de recursos e uma lista de personagens icônicos, o novo Mortal Kombat já ocupou seu lugar como um dos melhores jogos de luta do ano ao lado de Street Fighter 6. Se você ainda não teve a oportunidade de jogá-lo, mas quer saber quanto tempo demora para zerar o Mortal Kombat 1, então veio ao lugar certo!A conclusão da campanha de Mortal Kombat 1 leva em torno de seis horas de gameplay. Considerando que você, por exemplo, possa jogar apenas duas horas diárias, levará três dias para terminar o modo história. Caso queira completar todas as missões secundárias, que também incluem a Torre dos Desafios e o Modo Invasão, a jogatina de 14 horas pode levar cerca de uma semana.</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
                </section>
            </div>

            

            <footer id='GameSyncInfo'>

                <section className='card a'>
                    <a href='http://localhost:3000/sobregamesync'>Sobre Nós</a>
                </section>
                <section className='card b'>
                    <a href=''>Sobre Nós</a>
                </section>
                <section className='card c'>
                    <a href=''>Sobre Nós</a>
                </section>

            </footer>


            <FooterPage/>
        </div>
    )
}