import './index.scss'
import axios from 'axios'

import BarraLateral from '../../../components/barraLateral'
import BarraDeCima from '../../../components/baraDeCima'
import FooterPage from '../../../components/footerpage/index,'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useEffect, useState } from 'react'

export default function Produto() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mostdesc, setMostdesc] = useState (true)
    const [mostcoment, setMostcoment] = useState (false)
    const [mostcompl, setMostcompl] = useState (false)
    const [idprod, setIdprod] = useState ("42645")

    const [nome, setNome] = useState ('')
    const [desc, setDesc] = useState ('')
    const [lancamento, setLancamento] = useState ('')
    const [plataformas, setPlataformas] = useState ([])
    const [developers, setDevelopers] = useState ([])
    const [publicador, setPublicador] = useState ([])

    const [imagem, setImagem] = useState ('')
    const [imagens, setImagens] = useState ([])
    const [videos, setVideos] = useState ([])

    const [conquistas, setConquistas] = useState ([])
    const [complementos, setComplementos] = useState ([])


    function MostrarDescricao () {
        setMostdesc(true)
        setMostcoment(false)
        setMostcompl(false)
    }

    function MostrarComentarios () {
        setMostdesc(false)
        setMostcoment(true)
        setMostcompl(false)
    }

    function MostrarComplementos() {
        setMostdesc(false)
        setMostcoment(false)
        setMostcompl(true)
    }

    



    
    
    async function ProdutoInfo () {
        let url = 'https://api.rawg.io/api/games/' + idprod + '?key=0a526d3c3985430c9469d8d6951eb5cb&'
        let resposta = await axios.get(url)


        setNome(resposta.data.name)
        setDesc(resposta.data.description_raw)
        setLancamento(resposta.data.released)
        setImagem(resposta.data.background_image)
        setPlataformas(resposta.data.parent_platforms)
        setDevelopers(resposta.data.developers)
        setPublicador(resposta.data.publishers)
    }

    useEffect (() => {
        ProdutoInfo()
    }, [])

    async function Conquistas() {
        let url = 'https://api.rawg.io/api/games/'+ idprod +'/achievements?key=0a526d3c3985430c9469d8d6951eb5cb&&page_size=5'
        let resposta = await axios.get(url)


        setConquistas(resposta.data.results)
    }

    useEffect (() => {
        Conquistas()
    }, [])

    async function Capturas() {
        let url = 'https://api.rawg.io/api/games/'+  idprod +'/screenshots?key=0a526d3c3985430c9469d8d6951eb5cb&&page_size=5'
        let resposta = await axios.get(url)

        setImagens(resposta.data.results)
    }

    useEffect(() => {
        Capturas()
    }, [])

    async function Videos() {
        let url = 'https://api.rawg.io/api/games/'+ idprod +'/movies?key=0a526d3c3985430c9469d8d6951eb5cb&&page_size=1'
        let resposta = await axios.get(url)

        setVideos(resposta.data.results)
    }

    useEffect(() => {
        Videos()
    }, [])

    async function Complementos() {
        let url = 'https://api.rawg.io/api/games/'+ idprod +'/additions?key=0a526d3c3985430c9469d8d6951eb5cb&&page_size=50'
        let resposta = await axios.get(url)

        setComplementos(resposta.data.results)
    }

    useEffect(()=> {
        Complementos()
    }, [])




    return(
        <div className="Produto">
            <BarraLateral/>
            <BarraDeCima/>

            <section id="produto">

                <section id="info-produto">      
                    <div className="titulo">
                        <h1>{nome}</h1>
                        <p>'{desc}'</p>
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
                        <img src={imagem} />
                        </SwiperSlide>
                        
                        {videos.map( item => 
                            
                            <SwiperSlide>
                                <video src={item.play} />
                            </SwiperSlide>  

                        )} 
                        
                        {imagens.map( item => 
                            
                            <SwiperSlide>
                                <img src={item.image} />
                            </SwiperSlide>  

                        )}  
                        
                    </Swiper>
    
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
                    {complementos != '' &&
                    <button id="b" onClick={MostrarComplementos}>
                        Complementos
                    </button>}
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
                            <div className='developers'>
                                {developers.map( item =>
                                    <p>{item.name}</p>
                                )}
                            </div>
                            
                        </div>
                        <div className="detalhe">
                            <h2>Publicado por</h2>
                            {publicador.map(item =>
                            <p>{item.name}</p>    
                            )}
                        </div>
                        <div className="detalhe">
                            <h2>Data de lançamento</h2>
                            <p>{lancamento}</p>
                        </div>
                        <div className="detalhe">
                            <h2>Tamanho</h2>
                            <p>Indefinido</p>
                        </div>

                    </div>
                    <p>{desc}</p>
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

            <section id='plataformas'>
                <section className='plataformas'>

                    {plataformas.map( item =>
                        <div className='plataforma'>
                            <p>{item.platform.name}</p>
                        </div>    
                    )}

                </section>
            </section>
            
            {conquistas != '' &&
            <section id='titles'>
                <h1 className='tinf'>Conquistas</h1>
                <a href='http://localhost:3000/conquistas'><button>Ver mais conquistas</button></a>
            </section>}


            <div id="produtos">  

                {conquistas.map( item => 
                
                <section className='produto'>
                    <div className='imagem-produto'>
                        <div className='sombra'>
                            <div className='linha'></div>
                        </div>
                        <div className='produtoIMG'>
                            <img src={item.image} alt='Conquista'/>
                        </div>
                    </div>
                    <div className='informacoes'>
                        <div className='dados'>
                            <a href="">{item.name}</a>
                            <p>{item.description}</p>
                        </div>
                        <div className='info'>
                            <h3>{item.percent}</h3>
                        </div>
                    </div>
                </section>

                )}

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

            {mostcompl == true &&
            <section id='complementos'>
                    <div className='title'>
                        <h1>Complementos</h1>
                    </div>
                    <div id="produtos">  

                        {complementos.map( item => 
                        
                        <section className='produto'>
                            <div className='imagem-produto'>
                                <div className='sombra'>
                                    <div className='linha'></div>
                                </div>
                                <div className='produtoIMG'>
                                    <img src={item.background_image} alt='Conquista'/>
                                </div>
                            </div>
                            <div className='informacoes'>
                                <div className='dados'>
                                    <a href="">{item.name}</a>
                                    <p>{item.description}</p>
                                </div>
                                <div className='info'>
                                    <h3>{item.released}</h3>
                                </div>
                            </div>
                        </section>

                        )}

                    </div>
            </section>}


            <FooterPage/>
        </div>
    )
}