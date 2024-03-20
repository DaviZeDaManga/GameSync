import './index.scss'

import BarraLateral from '../../../components/barraLateral'
import FooterPage from '../../../components/footerpage/index,'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import storage, { set } from 'local-storage';
import Title from '../../../components/title'

import EmojiPicker from 'emoji-picker-react';
import ProdutoCard from '../../../components/produto'
import { motion } from 'framer-motion'

import { toast } from 'react-toastify';
import { BuscarComentariosProd, BuscarProdutos, BuscarProdutosID } from '../../../connection/produtosAPI';
import { AdicionarAvaliacaoProd, DeletarAvaliacaoProd, InserirCarrinho, InserirFavorito } from '../../../connection/userAPI';
import { BuscarImagem } from '../../../connection/produtosAPI';
import { confirmAlert } from 'react-confirm-alert';
import LoadingBar from "react-top-loading-bar";


export default function Produto() {
    const dadoscliente = storage('user-logado')

    //buscar informacoes do game
    const { id } = useParams();
    const [idprod, setIdprod] = useState (id)
    const [produtoinfo, setProdutoinfo] = useState([])
    const [imagens, setImagens] = useState ([])

    async function InfoGame() {
        let resposta = await BuscarProdutosID(id)
        setProdutoinfo(resposta)
    }

    useEffect(() => {
        InfoGame()
    }, [produtoinfo])





    //sessoes do pagina
    const [mostdesc, setMostdesc] = useState (true)
    const [mostcoment, setMostcoment] = useState (false)
    const [mostcompl, setMostcompl] = useState (false)

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

    //parte futura
    const [conquistas, setConquistas] = useState ([])
    const [complementos, setComplementos] = useState ([])
    const [qntdconq, setQntdconq] = useState(6)

    const navigate = useNavigate()
    const ref = useRef()

    




    //abrir pop up para comentar
    const [comentando, setComentando] = useState (0)

    function Comentando() {
        if(storage('user-logado')){
            setComentando(comentando + 1)
            setEmojiselect(false)
        }
        else {
            toast.warning('Você precisa estar logado para comentar!')
        }
    }
    function VolComentar() {
        setComentando(comentando - 1)
    }

    //comentar no produto
    const [comentarios, setComentarios] = useState ([])
    const [estrelas, setEstrelas] = useState (0)
    const [comentario, setComentario] = useState ('')

    async function Comentar() {
        if (estrelas != '') {
            if (storage('user-logado')) {
                await AdicionarAvaliacaoProd(id, estrelas, comentario, dadoscliente.id)
            }
    
            else {
                toast.warning('Você precisa estar logado para comentar!')
            }
    
            setComentando(0)
            setComentario('')
            setEstrelas(0)
            setAvaliacoes(avaliacoes + 1)
        }
        else {
            toast.warning('Escolha o numero de estrelas')
        }
    }

    //buscar comentarios
    async function Comentarios() {
        let resposta = await BuscarComentariosProd(id)
        setComentarios(resposta)
    }

    useEffect(() => {
        Comentarios()
    })
    



    




    //acoes
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





    const [salvo, setSalvo] = useState(false)
    const [carrado, setCarrado] = useState(false)

    function VerificarSalvoCarrinho() {
        for (let item of produtoinfo) {
            setSalvo(item.salvo)
            setCarrado(item.item)
        }
    }

    useEffect(() => {
        VerificarSalvoCarrinho()
    })

     //salvar item no favoritos
    async function SalvarFavoritos() {
        ref.current.continuousStart();

        try {
            await InserirFavorito(id, dadoscliente.id)
            toast.dark("Item salvado com sucesso")
            ref.current.complete()

        }
        catch {
            if (!storage("user-logado")) {
                toast.warning("Voce precisa estar logado para salvar este item")
                ref.current.complete();
            }
            else {
                toast.error("Parece que deu algo errado")
                ref.current.complete();
            }
        }
    }

    //salvar item no carrinho
    async function SalvarCarrinho() {
        ref.current.continuousStart();

        try {
            await InserirCarrinho(id, dadoscliente.id)
            toast.dark("Item adicionado ao carrinho com sucesso")
            ref.current.complete()

        }
        catch {
            if (!storage("user-logado")) {
                toast.warning("Voce precisa estar logado para salvar este item")
                ref.current.complete();
            }
            else {
                toast.error("Parece que deu algo errado")
                ref.current.complete();
            }
        }

    	// if(storage('user-logado')) {
        //     let carrinho = new Array()

        //     if(localStorage.hasOwnProperty('carrinho')) {
        //         carrinho = JSON.parse(localStorage.getItem('carrinho'))
        //     }

        //     carrinho.push({
        //         id: id,
        //         nome: nome,
        //         desc: desc,
        //         preco: preco,
        //         img: img
        //     })

        //     localStorage.setItem('carrinho', JSON.stringify(carrinho))
        // }

        // else {
        //     toast.warning('Voce precisa estar logado para salvar este item no carrinho!');
        // }
    }

    //nao sera possivel adicionar
    function JaAdicionado(para) {
        if (para == 1) {
            toast.warning("Este produto já está no carrinho!")
        }
        if (para == 2) {
            toast.warning("Este produto já está salvo!")
        }
    }








    //estabelecer nota do produto
    const [avaliacoes, setAvaliacoes] = useState ()

    const [nota, setNota] = useState("0.0")
    const [porcum, setPorcum] = useState(0)
    const [porcdois, setPorcdois] = useState(0)
    const [porctres, setPorctres] = useState(0)
    const [porcquatro, setPorcquatro] = useState(0)
    const [porccinco, setPorccinco] = useState(0)

    function Avaliacoes() {
        let qntdavaliacao = comentarios.length
        setAvaliacoes(qntdavaliacao)
    }

    useEffect(() => {
            Avaliacoes()
    })

    useEffect(() => {
        let nota = comentarios.filter( item => item.avaliacao == 5)
        let qtdnota = nota.length

        if (qtdnota > 0) {
            let resp = qtdnota * 100 / avaliacoes
            setPorccinco(Math.trunc(resp))
        }
        else {
            setPorccinco(0)
        }
    })

    useEffect(() => {
        let nota = comentarios.filter( item => item.avaliacao == 4)
        let qtdnota = nota.length

        if (qtdnota > 0) {
            let resp = qtdnota * 100 / avaliacoes
            setPorcquatro(Math.trunc(resp))
        }
        else {
            setPorcquatro(0)
        }
    })

    useEffect(() => {
        let nota = comentarios.filter( item => item.avaliacao == 3)
        let qtdnota = nota.length

        if (qtdnota > 0) {
            let resp = qtdnota * 100 / avaliacoes
            setPorctres(Math.trunc(resp))
        }
        else {
            setPorctres(0)
        }
    })

    useEffect(() => {
        let nota = comentarios.filter( item => item.avaliacao == 2)
        let qtdnota = nota.length
        
        if (qtdnota > 0) {
            let resp = qtdnota * 100 / avaliacoes
            setPorcdois(Math.trunc(resp))
        }
        else {
            setPorcdois(0)
        }
    })

    useEffect(() => {
        let nota = comentarios.filter( item => item.avaliacao == 1)
        let qtdnota = nota.length
        
        if (qtdnota > 0) {
            let resp = qtdnota * 100 / avaliacoes
            setPorcum(Math.trunc(resp))
        }
        else {
            setPorcum(0)
        }
    })



   
    
    const [produtos, setProdutos] = useState([])
    const [produtosparecidos, setProdutosparecidos] = useState([])

    //verificacoes
    const [categoriaparecido, setCategoriaparecido] = useState()
    const [empresaparecido, setEmpresaparecido] = useState()
    const [desenparecido, setDesenparecido] = useState()

    //aparecer produtos
    async function Jogos() {
        let resposta = await BuscarProdutos()
        setProdutos(resposta)
    }

    useEffect(() => {
        Jogos()
    }, [])

    //verificacao para aparecer jogos parecidos
    function VerificacaoParecidos() {
        for (let item of produtoinfo) {
            setEmpresaparecido(item.publi)
            setDesenparecido(item.desenvolvedor)
            setCategoriaparecido(item.categoria_id)
        }
     }
 
    useEffect(()=> {
        VerificacaoParecidos()
    }, [produtos])

    //verificar jogos com as verificacoes
    function JogosParecidos() {
        let filtrados = produtos.filter( item => item.empresa == empresaparecido || item.desenvolvedor == desenparecido || item.categoria_id == categoriaparecido) 

        let resposta = filtrados.slice(0, 7)
        setProdutosparecidos(resposta)
    }

    useEffect(() => {
        JogosParecidos()
    }, [categoriaparecido])






    const [acoescomentarios, setAcoescomentarios] = useState(false)

    async function ApagarComentario(idcoment) {

        confirmAlert({
            title: 'Remover Comentario',
            message: `Você tem certeza que quer fazer isso? Excluir o comentario?.`,
            buttons: [
                {
                    label: 'Sim!',
                    onClick: async () => {
                        console.log("ID dentro da função de remoção:", idcoment);
                        await DeletarAvaliacaoProd(idcoment);
                    }
                },
                {
                    label: 'Não'
                }
            ]
        });
        
        setAcoescomentarios(false)
    }
     
    return(
        <div className="Produto PageTransform">
            <LoadingBar color="#f11946" ref={ref} />
            
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
                            <h1>{item.nome}</h1>
                            <p>{item.descricao}</p>
                        </div>
                        <section id='Comprar'>
                            <div className='info'>
                                {item.promocao == true &&
                                <h1 className='promocao'>R${item.vlPromo}</h1>}
                                <h1 className={`${item.promocao == true && 'noprice'}`}>R${item.preco}</h1>
                            </div>
                            <div className='comprar'>
                                <button><Link to={`/BarraLateral/${id}`}></Link>Comprar</button> 

                                {produtoinfo.map( item => 
                                <>
                                {item.item != idprod &&
                                <button onClick={()=> (SalvarCarrinho())} className='acoes'>
                                    <img src='/assets/images/carrinho/carrinho.png' />
                                </button> } 

                                {item.item == idprod &&
                                <button onClick={() => (JaAdicionado(1))} className='acoes'>
                                    <img src='/assets/images/carrinho/carrinho.png' />
                                </button>
                                } 
                                </>    
                                )} 

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
                        {produtoinfo.map( item => 

                        <>
                        {item.salvo != idprod &&
                        <div onClick={()=> (SalvarFavoritos())} className='card'>
                            Salvar
                        </div> 
                        }  
                            
                        {item.salvo == idprod &&
                        <div onClick={() => (JaAdicionado(2))} className='card'>
                            Salvo
                        </div> 
                        }  
                        </> 
                            
                        )}
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
                            modules={[FreeMode, Navigation]}
                            className="mySwiper2"
                        >
                            <SwiperSlide>
                            {produtoinfo.map( item =>
                                <img src={BuscarImagem(item.img)} />    
                            )}
                            </SwiperSlide>
                                        
                            {produtoinfo.map( item => 
                                
                                <SwiperSlide className={`${item.video == "nao" && 'none'}`}>
                                    <video controls="true">  <source src={item.video} type="video/mp4" /></video>
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
                        <p>{item.desenvolvedor}</p>
                    </div>
                    <div className="detalhe">
                        <h2>Publicado por</h2>
                        <p>{item.publi}</p>           
                    </div>
                    <div className="detalhe">
                        <h2>Data de lançamento</h2>
                        <p>{item.lancamento}</p>
                    </div>
                    <div className="detalhe">
                        <h2>Tamanho</h2>
                        <p>{item.tamanho}</p>
                    </div>

                    </div>
                    <p>{item.descricao}</p>
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

            {produtosparecidos != '' &&
            <section id='titles'>
                <h1 className='tinf'>Jogos Parecidos</h1>
                <Link to={'/produto/'+id+'/jogosparecidos'}>
                    <button>Ver mais jogos</button>
                </Link>
            </section>}


            <div id="produtos">  

                {produtosparecidos.map( item => 

                <ProdutoCard
                id={item.produto_id}
                imagem={BuscarImagem(item.imagem_produto)}
                nome={item.nome}
                lancamento={item.tamanho}
                /> 

                )}

            </div>
            
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
                            <h1>{nota}</h1>
                            <p>{avaliacoes} avaliações feitas</p>
                        </div>
                        <div className='estatisticas'>

                            <div className='resultado'>
                                <p>5</p>
                                <div className='porcentagem'>
                                    <div id="p5" style={{"width": porccinco + '%'}} className='porcento'></div>
                                </div>
                                {/* <p>{porccinco}%</p> */}
                            </div>
                            <div className='resultado'>
                                <p>4</p>
                                <div className='porcentagem'>
                                    <div id="p4" style={{"width": porcquatro + '%'}} className='porcento'></div>
                                </div>
                                {/* <p>{porcquatro}%</p> */}
                            </div>
                            <div className='resultado'>
                                <p>3</p>
                                <div className='porcentagem'>
                                    <div id="p3" style={{"width": porctres + '%'}} className='porcento'></div>
                                </div>
                                {/* <p>{porctres}%</p> */}
                            </div>
                            <div className='resultado'>
                                <p>2</p>
                                <div className='porcentagem'>
                                    <div id="p2" style={{"width": porcdois + '%'}} className='porcento'></div>
                                </div>
                                {/* <p>{porcdois}%</p> */}
                            </div>
                            <div className='resultado'>
                                <p>1</p>
                                <div className='porcentagem'>
                                    <div id="p1" style={{"width": porcum + '%'}} className='porcento'></div>
                                </div>
                                {/* <p>{porcum}%</p> */}
                            </div>

                        </div>
                    </div>
                    <button onClick={Comentando}>Fazer comentario</button>
                </div>
                <div className="comentarios">

                    

                    {comentarios.map( item => 
                        
                        <div className="comentario">
                            {(storage("user-logado")) &&
                            <>
                                {dadoscliente.id == item.id_cliente &&
                                    <div onClick={() => (setAcoescomentarios(!acoescomentarios))} className='b-acoes'></div>}
        
                                    {acoescomentarios == true &&
                                    <section className='acoes'>
                                        <button onClick={()=> (ApagarComentario(item.id_comentario_avaliacao))}>Apagar</button>
                                        <button>Alterar</button>
                                    </section>}
                            </>
                            }

                            <div className='conteudo'>
                                <section className='c-user'>
                                    <div className='c-user-image'>
                                        <img src={BuscarImagem(item.img_cliente)} />
                                    </div>
                                    <h1>{item.nm_cliente}</h1>
                                </section>
                                <main id='comentario'>
                                    <p>{item.comentario}</p>
                                </main>
                            </div>
                            <section className='estrelas'>

                                {item.avaliacao == 1 &&
                                    <div className='bolinha'></div>
                                }
                                {item.avaliacao == 2 &&
                                    <>
                                    <div className='bolinha'></div>
                                    <div className='bolinha'></div>
                                    </>
                                }
                                {item.avaliacao == 3 &&
                                    <>
                                    <div className='bolinha bom'></div>
                                    <div className='bolinha bom'></div>
                                    <div className='bolinha bom'></div>
                                    </>
                                }
                                {item.avaliacao == 4 &&
                                    <>
                                    <div className='bolinha bom'></div>
                                    <div className='bolinha bom'></div>
                                    <div className='bolinha bom'></div>
                                    <div className='bolinha bom'></div>
                                    </>
                                }
                                {item.avaliacao == 5 &&
                                    <>
                                    <div className='bolinha amei'></div>
                                    <div className='bolinha amei'></div>
                                    <div className='bolinha amei'></div>
                                    <div className='bolinha amei'></div>
                                    <div className='bolinha amei'></div>
                                    </>
                                }
                            </section>
                        </div>
                        
                    )}


                    {comentarios == '' &&
                    <section className='NoComentarios'>
                        <h1>Esse produto ainda nao tem nunhum comentario, que tal ser o primeiro a comentar?</h1>
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
                        
                        <button onClick={Comentar}>Comentar</button>
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