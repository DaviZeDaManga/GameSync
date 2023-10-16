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
import { useParams, Link } from 'react-router-dom'

export default function Produto() {

    const { id } = useParams();

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mostdesc, setMostdesc] = useState (true)
    const [mostcoment, setMostcoment] = useState (false)
    const [mostcompl, setMostcompl] = useState (false)
    const [idprod, setIdprod] = useState (id)

    const [fodasi, setFodasi] = useState([4143, 264642, 742])

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
    const [qntdconq, setQntdconq] = useState(6)

    const [comentarios, setComentarios] = useState ([])
    const [comentando, setComentando] = useState (0)
    const [estrelas, setEstrelas] = useState (0)
    const [comentario, setComentario] = useState ('')

    const [avaliacoes, setAvaliacoes] = useState (0)


    


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





    function naopode() {
        alert('Escolha o número de estrelas')
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
        let url = 'https://api.rawg.io/api/games/'+ idprod +'/achievements?key=0a526d3c3985430c9469d8d6951eb5cb&&page_size=' + qntdconq
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
        let url = 'https://api.rawg.io/api/games/'+ idprod +'/movies?key=0a526d3c3985430c9469d8d6951eb5cb&'
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



    function Comentando() {
        setComentando(comentando + 1)
    }
    function VolComentar() {
        setComentando(comentando - 1)
    }

    function Comentar() {
        const c = {
            user: "Luis Viado",
            desc: comentario,
            estrelas: estrelas
        }

        setComentando(0)
        setComentarios([...comentarios, c])
        setComentario('')
        setEstrelas(0)
        setAvaliacoes(avaliacoes + 1)
    }
    
    
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
                            <button><Link to={`/BarraLateral/${id}`}></Link>Comprar</button>//////////////////////////////////
                            <div className='paraconta carrin'>
                                <p>D</p>
                            </div>
                            <div className='paraconta fav'>
                                <p>F</p>
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
                                <video controls="true">  <source src={item.data.max} type="video/mp4" /></video>
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
                            {developers.map( item =>
                                <p>{item.name}</p>
                            )}
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
                <Link to={'/conquistas/' + id}>
                    <button>Ver mais conquistas</button>
                </Link>
            </section>}


            <div id="produtos">  

                {conquistas.map( item => 

                <Link to={'/conquistas/' + id}>
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
                </Link>
                )}

            </div>
            </>}

            {mostcoment == true &&
            <section id="comentarios">
                <div id='status'>
                    <div className="status">
                        <div className="resultado">
                            <h1>4.9</h1>
                            <p>{avaliacoes} avaliações feitas</p>
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
                    <button onClick={Comentando}>Fazer comentario</button>
                </div>
                <div className="comentarios">

                    

                    {comentarios.map( item => 
                        
                        <div className="comentario">
                            <div className='conteudo'>
                                <section className='c-user'>
                                    <div className='c-user-image'>

                                    </div>
                                    <h1>{item.user}</h1>
                                </section>
                                <main id='comentario'>
                                    <p>{item.desc}</p>
                                </main>
                            </div>
                            <section className='estrelas'>
                                <h3>Avaliado em <span>{item.estrelas} estrelas</span></h3>
                            </section>
                        </div>
                        
                    )}


                    {comentarios == '' &&
                    <section className='NoComentarios'>
                        <h1>Esse produto ainda nao tem nunhum comentario, no que tal ser o primeiro a comentar?</h1>
                    </section>}

                      
                    
                </div>


                
                {comentando >= 1 && 
                <section id='FazerComentario'>

                    {comentando == 1 &&
                    <div className='Comentar'>
                        <div className='title'>
                            <button onClick={VolComentar}> c </button>
                            <h1>Adicionar Comentario</h1>
                        </div>
                        <textarea onChange={e => setComentario (e.target.value)} value={comentario}/>

                        <button onClick={Comentando} >Escolher estrelas</button>
                    </div>}

                    {comentando == 2 &&
                    <div id='estrelas'>
                        <div className='title'>
                            <button onClick={VolComentar}> c </button>
                            <h1>Escolha o numero de estrelas</h1>
                            {estrelas >= 1 &&
                            <h1 className='starstitle'>{estrelas} estrelas </h1>}
                        </div>
                        <div className='estrelas'>
                            <button onClick={() => (setEstrelas(1))}><img src="/assets/images/avaliacao/estrela.png" /></button>
                            <button onClick={() => (setEstrelas(2))}><img src="/assets/images/avaliacao/estrela.png" /></button>
                            <button onClick={() => (setEstrelas(3))}><img src="/assets/images/avaliacao/estrela.png" /></button>
                            <button onClick={() => (setEstrelas(4))}><img src="/assets/images/avaliacao/estrela.png" /></button>
                            <button onClick={() => (setEstrelas(5))}><img src="/assets/images/avaliacao/estrela.png" /></button>
                        </div>
                        {estrelas == '' &&
                        <button onClick={naopode}>Escolha o numero de estrelas</button>}
                        {estrelas != '' &&
                        <button onClick={Comentar}>Comentar</button>}
                    </div>}
                    
                </section>}

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
                                            <a>{item.name}</a>
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