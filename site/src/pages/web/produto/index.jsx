import './index.scss'
import axios from 'axios'

import BarraLateral from '../../../components/barraLateral'
import FooterPage from '../../../components/footerpage/index,'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import storage, { set } from 'local-storage';
import Title from '../../../components/title'

import EmojiPicker from 'emoji-picker-react';
import ProdutoCard from '../../../components/produto'
import { BuscarJogoID, BuscarImagem } from '../../../connection/productAPI'
import { motion } from 'framer-motion'

import { toast } from 'react-toastify';

export default function Produto() {

    const { id } = useParams();

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [mostdesc, setMostdesc] = useState (true)
    const [mostcoment, setMostcoment] = useState (false)
    const [mostcompl, setMostcompl] = useState (false)
    
    const [idprod, setIdprod] = useState (id)
    const [produtoinfo, setProdutoinfo] = useState([])
    const [imagens, setImagens] = useState ([])

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
        setSelectsection(1)
    }

    function MostrarComentarios () {
        setMostdesc(false)
        setMostcoment(true)
        setMostcompl(false)
        setSelectsection(2)
    }

    function MostrarComplementos() {
        setMostdesc(false)
        setMostcoment(false)
        setMostcompl(true)
        setSelectsection(3)
    }





    function naopode() {
        alert('Escolha o número de estrelas')
    }

    



    
    async function InfoGame() {
        let resposta = await BuscarJogoID(id)

        setProdutoinfo(resposta)
    }

    console.log(produtoinfo)

    useEffect(() => {
        InfoGame()
    }, [])









    function Comentando() {
        setComentando(comentando + 1)
        setEmojiselect(false)
    }
    function VolComentar() {
        setComentando(comentando - 1)
    }

    const [user, setUser] = useState('')

    useEffect(() => {
        if(storage('user-logado')) {
            const nomeUser = storage('user-logado')
            setUser(nomeUser.nome)
        }
        else {
            setUser('anonymous')
        }
    })

    function Comentar() {
        const c = {
            user: user,
            desc: comentario,
            estrelas: estrelas
        }

        setComentando(0)
        setComentarios([...comentarios, c])
        setComentario('')
        setEstrelas(0)
        setAvaliacoes(avaliacoes + 1)
    }
    



    const [selectsection, setSelectsection] = useState (1)






    const [emojiselect, setEmojiselect ] = useState(false)





    const [acoes, setAcoes] = useState(0)
    const [acoesboo, setAcoesboo] = useState(false)

    useEffect(()=> {
        if(acoesboo == true) {
            setAcoes(1)
        }
        else{
            setAcoes(0)
        }
    })





    const [carrinhar, setCarronhar] = useState(true)

   function SalvarCarrinho(id, nome, desc, preco, img) {
    	if(carrinhar == true) {
            let carrinho = new Array()

            if(localStorage.hasOwnProperty('carrinho')) {
                carrinho = JSON.parse(localStorage.getItem('carrinho'))
            }

            carrinho.push({
                id: id,
                nome: nome,
                desc: desc,
                preco: preco,
                img: img
            })

            localStorage.setItem('carrinho', JSON.stringify(carrinho))

            setCarronhar(false)
        }

        else {
            toast.warning('Este produto já esta no carrinho!');
        }
   }



   
    
    return(
        <div className="Produto">
            
            <section className='fake-nerwe'>
            <ProdutoCard
            recarregarpage={true}
            />
            </section>

            <BarraLateral/>
            <Title
            nome={"Details"}
            voltar={true}
            />

            <section id="produto-card">
                
                <section id='produto'>
                    <section id="info-produto">      
                        {produtoinfo.map( item => 
                            
                        <>
                        <div className="titulo">
                            <h1>{item.nm_produto}</h1>
                            <p>{item.ds_descricao}</p>
                        </div>
                        <section id='Comprar'>
                            <div className='info'>
                                {item.bt_promocao == true &&
                                <h1 className='promocao'>R${item.vl_preco_promocional}</h1>}
                                <h1 className={`${item.bt_promocao == true && 'noprice'}`}>R${item.vl_preco}</h1>
                            </div>
                            <div className='comprar'>
                                <button><Link to={`/BarraLateral/${id}`}></Link>Comprar</button>    
                                <button onClick={()=> (SalvarCarrinho(id, item.nm_produto, item.ds_descricao, item.vl_preco , item.img_produto))} className='acoes'>
                                    <img src='/assets/images/carrinho/carrinho.png' />
                                </button>   
                                <button onClick={()=> (setAcoesboo(!acoesboo))} className={`acoes ${acoesboo == true && 'selecionado'}`}>
                                    <img src='/assets/images/acoes/pontos.png' />
                                </button> 
                            </div>
                        </section>  
                        </>  
                            
                        )}    

                        <motion.div
                        className='escolhacard'
                        animate={{ scale: acoes  }}
                        >
                        <div className='card'>
                            Compartilhar
                        </div>
                        <div className='linha'></div>
                        <div className='card'>
                            Salvar
                        </div>
                        <div className='linha'></div>
                        <div className='card'>
                            Reportar
                        </div>
                        </motion.div>
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
                            {produtoinfo.map( item =>
                            <img src={BuscarImagem(item.img_produto)} />    
                            )}
                            </SwiperSlide>
                                        
                            {produtoinfo.map( item => 
                                
                                <SwiperSlide>
                                    <video controls="true">  <source src={item.url_video} type="video/mp4" /></video>
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

            </section>

            <nav id="descOUcoment">
                <div className="selecionar">
                    <button className={`${selectsection == 1 && 'selecionado'}`} onClick={MostrarDescricao}>
                        Detalhes
                    </button>
                    <button className={`${selectsection == 2 && 'selecionado'}`} onClick={MostrarComentarios}>
                        Comentarios
                    </button>
                    {complementos != '' &&
                    <button className={`${selectsection == 3 && 'selecionado'}`} onClick={MostrarComplementos}>
                        Complementos
                    </button>}
                </div>
            </nav>

            {mostdesc == true &&
            <>
            <section id="descEstatus">
                <div className="desc">
                    <h1>Sobre</h1>
                    {produtoinfo.map( item => 
                        
                    <>
                    <div className="detalhes">

                    <div className="detalhe">
                        <h2>Desenvolvido por</h2>                          
                        <p>{item.ds_desenvolvedor}</p>
                    </div>
                    <div className="detalhe">
                        <h2>Publicado por</h2>
                        <p>{item.ds_empresa_publi}</p>           
                    </div>
                    <div className="detalhe">
                        <h2>Data de lançamento</h2>
                        <p>{item.dt_lancamento}</p>
                    </div>
                    <div className="detalhe">
                        <h2>Tamanho</h2>
                        <p>{item.ds_tamanho}</p>
                    </div>

                    </div>
                    <p>{item.ds_descricao}</p>
                    </>
                    
                    )}
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
            
            {conquistas != '' &&
            <section id='titles'>
                <h1 className='tinf'>Conquistas</h1>
                <Link to={'/conquistas/' + id}>
                    <button>Ver mais conquistas</button>
                </Link>
            </section>}


            <div id="produtos">  

                {conquistas.map( item => 

                <ProdutoCard
                id={id}
                nome={item.name}
                lancamento={item.parcent}
                imagem={item.image}
                tipo={'conquista'}
                />

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
                            <button onClick={VolComentar}>  
                                <img src='/assets/images/acoes/seta-esquerda.png' />
                            </button>
                            <h1>Adicionar Comentario</h1>
                        </div>
                        <textarea onChange={e => setComentario (e.target.value)} value={comentario}/>

                        
                        <div className='buttons'>
                            <div onClick={()=> (setEmojiselect(!emojiselect))} className={`emojis ${emojiselect == true && 'selecionado'}`}>
                                <img src='/assets/images/acoes/feliz.png' />
                            </div>
                            <button onClick={Comentando} >Escolher estrelas</button>
                        </div>

                        {emojiselect == true &&
                        <div className='emoji'>
                            <EmojiPicker
                            height={500}
                            theme='dark'
                            />
                        </div>}
                    </div>}

                    {comentando == 2 &&
                    <div id='estrelas'>
                        <div className='title'>
                            <button onClick={VolComentar}>
                                <img src='/assets/images/acoes/seta-esquerda.png' />
                            </button>
                            <h1>Escolha o numero de estrelas</h1>
                            {estrelas >= 1 &&
                            <h1 className='starstitle'>{estrelas} estrelas </h1>}
                        </div>
                        <div className='estrelas'>
                            <button className={`${estrelas == 1 && 'selecionado' }`} onClick={() => (setEstrelas(1))}><img src="/assets/images/avaliacao/estrela.png" /></button>
                            <button className={`${estrelas == 2 && 'selecionado' }`} onClick={() => (setEstrelas(2))}><img src="/assets/images/avaliacao/estrela.png" /></button>
                            <button className={`${estrelas == 3 && 'selecionado' }`} onClick={() => (setEstrelas(3))}><img src="/assets/images/avaliacao/estrela.png" /></button>
                            <button className={`${estrelas == 4 && 'selecionado' }`} onClick={() => (setEstrelas(4))}><img src="/assets/images/avaliacao/estrela.png" /></button>
                            <button className={`${estrelas == 5 && 'selecionado' }`} onClick={() => (setEstrelas(5))}><img src="/assets/images/avaliacao/estrela.png" /></button>
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
                        
                            <ProdutoCard
                            id={id}
                            nome={item.nm_produto}
                            imagem={BuscarImagem(item.img_produto)}
                            lancamento={item.released}
                            tipo={'complemento'}
                            />

                        )}

                    </div>
            </section>}


            <FooterPage/>
        </div>
    )
}