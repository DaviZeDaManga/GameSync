import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import { useState, useEffect, useRef } from 'react'
import storage, { set } from 'local-storage';
import EmojiPicker from 'emoji-picker-react';
import FooterPage from '../../../components/footerpage/index,';
import { useParams, useNavigate } from 'react-router-dom';
import { BuscarGameID, BuscarImagem } from '../../../connection/productAPI';
import LoadingBar from 'react-top-loading-bar';

export default function Game() {
    const [jogar, setJogar] = useState(false)
    const { id } = useParams()

    const [infogame, setInfogame] = useState([])

    async function InfoJogo() {
        let resposta = await BuscarGameID(id)

        setInfogame(resposta)
        console.log(resposta[0])
    }

    useEffect(() => {
        InfoJogo()
    }, [])

    console.log(infogame)
    







    const [comentarios, setComentarios] = useState ([])
    const [comentando, setComentando] = useState (0)
    const [estrelas, setEstrelas] = useState (0)
    const [comentario, setComentario] = useState ('')
    const [avaliacoes, setAvaliacoes] = useState (0)

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

    function naopode() {
        alert('Escolha o número de estrelas')
    }

    const [emojiselect, setEmojiselect ] = useState(false)




    const [mostrar, setMostrar] = useState('desc')
    const [mostrardesc, setMostrardesc] = useState(true)
    const [mostrarcoment, setMostrarcoment] = useState(true)

    // useEffect(() => {
    //     if(mostrar == 'coment') {
    //         setMostrarcoment(true)
    //         setMostrardesc(false)
    //     }
    //     else {
    //         setMostrardesc(true)
    //         setMostrarcoment(false)
    //     }
    // }, [mostrar])





    const ref = useRef()
    const navegate = useNavigate()
    var   [carregando, setCarregando] = useState(false)

    function Navegar() {
        ref.current.continuousStart();
        setCarregando(true);

        setTimeout(() => {
            navegate('/planos/engine')
        }, 3000);
    }

    return(
        <div className='game'>
            <BarraLateral/>
            <Title
            nome={'Jogar'}
            voltar={true}
            />

            <LoadingBar color='#f11946' ref={ref} />

            <section className='gameinfo'>

                <main className='jogo'>
                    {jogar == false &&
                    <>
                    {infogame.map( item =>
                    <img src={BuscarImagem(item.img_jogo)} />    
                    )}
                    <div className='name'>
                        {infogame.map( item => [
                            <div>
                                <h1>{item.nm_jogo}</h1>
                            </div>
                        ])}
                    </div>
                    </>
                    }
                    {jogar == true &&

                    <>
                    {infogame.map( item =>
                    
                    <>
                    <iframe src={item.url_jogo} />
                    </>

                    )}
                    </>
                    
                    }
                </main>
                <section className='sobre'>
                    <div className='acoes'>
                        {infogame.map( item => 
                            
                        <>
                        <section className='title'>
                            <h1>{item.nm_jogo}</h1>
                        </section>

                        <section className='info'>
                            <p>{item.ds_descricao}</p>
                        </section>
                        </>
                            
                        )}

                        <section className='jogar'>
                            <button onClick={()=> (setJogar(!jogar))}>
                                {jogar == false && "Jogar"}
                                {jogar == true && "Parar"}
                            </button>
                        </section>
                    </div>

                    
                </section>
            </section>



            {/* <section className='trocar'>
                <button className={`${mostrar == 'desc' && 'selecionado'}`} onClick={()=> (setMostrar('desc'))}>Sobre</button>
                <button className={`${mostrar == 'coment' && 'selecionado'}`} onClick={()=> (setMostrar('coment'))}>Comentarios</button>
            </section> */}


            {mostrardesc == true &&
            <section className='desc_engine'>
                <div className="desc">
                    <h1>Sobre</h1>
                    {infogame.map( item => [
                        <>
                        <p>{item.ds_descricao}</p> 
                        </>
                    ])}
                </div>
                <div onClick={()=> (Navegar())} className='engine'>
                    <div className='card'>
                        <img src='/assets/images/GameSync/Rectangle 860.png' />
                    </div>
                </div>
            </section>}

            {mostrarcoment == true &&
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
                        {estrelas == '' &&
                        <button onClick={naopode}>Escolha o numero de estrelas</button>}
                        {estrelas != '' &&
                        <button onClick={Comentar}>Comentar</button>}
                    </div>}
                    
                </section>}

            </section>}

            {/* <FooterPage/> */}

        </div>
    )
}