import { useState, useEffect } from 'react'
import './index.scss'
import { Link, json } from 'react-router-dom'
import storage, { set } from 'local-storage';
import { motion } from "framer-motion"

import BarraDeCima from '../baraDeCima';
import { BuscarJogoID } from '../../connection/productAPI';

export default function BarraLateral({home, planos, noticias, pesquisa, carrinho}) {
    const[nameuser, setNameuser] = useState("")
    const{imguser, setImguser} = useState('/assets/images/GameSync/user.png')

    useEffect(() => {
        if(storage('user-logado')){
            const nomeUser = storage('user-logado');
            setNameuser(nomeUser.nome);
        }
        else{
            setNameuser('anonymous')
        }
    }, [])

    const[menu, setMenu] = useState(false)
    const[carrin, setCarrin] = useState(false)
    const[fundo, setFundo] = useState(false)

    function MostrarCarrin() {
        setAssis(false)
        setCarrin(!carrin)
        Fundo()
    }
    
    function Sair() {
        setCarrin(false)
        setMenu(false)
        setAssis(false)
        setConfigs(false)
        setX(0)
    }





   const[configs, setConfigs] = useState(false)
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [rotate, setRotate] = useState(0);

    function Configs() {
        setConfigs(!configs)
    }
    function Mconfigs() {
        if (configs == true) {
            setX(320)
            setConfigs(true)
            Fundo()
        }
        else {
            setX(0)
        }
    }

    useEffect( () => {
        Mconfigs()
    }, [configs])





    

    //parte do bot
    const [IQuestion, setIQuestion] = useState('');
    const [Resposta, setResposta] = useState('');


    function GPTbro() {
        const OPENAI_API_KEY = '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';
    
        fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {

          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
          },
          body: JSON.stringify({
            prompt: IQuestion,
            max_tokens: 2048,
            temperature: 0.5,
          })
        })
        
        .then((response) => response.json())
        .then((json) => {
          if (json.error?.message) {
            setResposta(`Error: ${json.error.message}`);
          } else if (json.choices?.[0].text) {
            const text = json.choices[0].text || "Sem resposta";
            setResposta(text);
          }
        })
        .catch((error) => console.log('Error:', error));
      }

      async function Enter(event) {
        if (event.key === "Enter") {
            const resposta = await GPTbro();
            setResposta(resposta)
        }
      }




   





    





    
    const [assis, setAssis] = useState(false)
    const [xbot, setXbot] = useState(-520)
    const [ybot, setYbot] = useState(0)

    const [bot, setBot] = useState(true)

    function Massistente() {
        setAssis(!assis)
    }

    useEffect(()=> {
        if(assis ==true) {
            setYbot(0)
        }
        else {
            setXbot(0)
        }
    })

    function botOUassis() {
        setBot(!bot)
    }










    const [namepbarra, setNamepbarra] = useState('')
    const [pesqB, setPesqB] = useState(false)
    const [notiB, setNotiB] = useState(false)

    function SairSegundaBarra() {
        setX(320)
        setPesqB(false)
        setNotiB(false)
        setNamepbarra('tchau')
        setCateb(0)
    }

    function PesquisaBarra() {
        setX(620)
        setNamepbarra('Jogos')
        setCateb(1)

        if(notiB == true) {
            setNotiB(false)
            setPesqB(true)
        }
        else{
            setPesqB(true)
        }
    }
    function PesquisaNoti() {
        setX(620)
        setNamepbarra('Notificações')
        setCateb(2)

        if(pesqB == true) {
            setPesqB(false)
            setNotiB(true)
        }
        else {
            setNotiB(true)
        }
    }


    const [cateb, setCateb] = useState(0)







    function Fundo() {
        if(carrin == true || menu == true || assis == true || configs == true ) {
            setFundo(true)
        }
        else {
            setFundo(false)
        }
    }

    useEffect( ()=> {
        Fundo()
    }, [carrin, menu, assis, configs])









    const [barra, setBarra] = useState(false)

    function pesquisar() {
        setConfigs(false)
        setBarra(true)
    }

    useEffect(()=> {
        if(pesquisa == false) {
            setBarra(false)
        }
    })



    const [categorias, setCategorias] = useState([])

    async function Categorias() {
        
    }

    useEffect(()=> {
        Categorias()
    }, [])




    return(
        <div id="BarraLateral">
            <BarraDeCima
            barra={barra}
            />

            <div>
                <motion.div
                className="animation-barraL"
                animate={{ x, y, rotate }}
                transition={{ type: "spring" }}
                >

                <div className="BarraLateral">

                    <main className='menu'>
                        
                        <section className='categorias'>

                            <div onClick={(pesquisar)} className={`categoria p`}>
                                <img src="/assets/images/barralateral/navegar/lupa.png" />
                                <p>Pesquisar</p>
                            </div>
                            <Link to={'/'}>
                            <div className={`categoria ${home == true && 'selecionado'}`} >
                                <img src="/assets/images/barradecima/bolsa-de-compras.png" />
                                <p>Home</p>
                            </div>
                            </Link>
                            <Link to={'/planos'}>
                            <div className={`categoria ${planos == true && 'selecionado'}`}>
                                <img src="/assets/images/barradecima/controle-de-video-game.png" />
                                <p>Planos</p>
                            </div>
                            </Link>
                            <Link to={'/noticias'}>
                            <div className={`categoria ${noticias == true && 'selecionado'}`}>
                                <img src="/assets/images/barradecima/balao-de-fala.png" />
                                <p>Noticias</p>
                            </div>
                            </Link>

                            <div className='linhaBarra'></div>
                        
                            <div onClick={PesquisaBarra} className={`categoria ${cateb == 1 &&'selecionado'}`}>
                                <img src="/assets/images/barralateral/navegar/lupa.png" />
                                <p>Jogos</p>
                            </div>
                            <div onClick={PesquisaNoti} className={`categoria ${cateb == 2 && 'selecionado'}`}>
                                <img src="/assets/images/barralateral/navegar/envelope.png" />
                                <p>Notificações</p>
                            </div>
                            
                            <div className='linhaBarra'></div>

                            <div className={`categoria ${cateb == 3 && 'selecionado'}`}>
                                <img src="/assets/images/barralateral/navegar/configuracoes.png" />
                                <p>Configurações</p>
                            </div>


                        </section>
                        <footer className='accout'>
                            <section className='card'>

                            </section>
                        </footer>
                    </main>


                    <section className='pesquisa'>
                        
                        
                        <div className='titulo-pesquisa'>
                            <div onClick={SairSegundaBarra} className='sair'>
                                <img src='/assets/images/acoes/remover.png' />
                            </div>

                            <h1>{namepbarra}</h1>
                        </div>

                        {pesqB == true &&
                        <>

                        {categorias.map( item =>
                            <Link to={'/gamegrupos/' + item.id}>
                            <section className='categoria'>
                                <p>{item.name}</p>
                            </section>
                            </Link>
                        )}

                        </>}

                        {notiB == true &&
                        <>
                        <section className='cardnoti'>
                            <h1>Você recebeu um código!</h1>
                            <p>Parabéns! Você acaba de ter a sorte de ganhar um código que pode ser usado na GameSync, quando estiver finalizando sua compra. 10% de desconto</p>
                            <button>Ver código</button>
                        </section>

                        <section className='cardnoti'>
                            <h1>Você recebeu um código!</h1>
                            <p>Parabéns! Você acaba de ter 20% de taxa!</p>
                            <button>Ver código</button>
                        </section>
                        </>
                        }
                    </section>

                    <img onClick={Configs} className='logo' src="/assets/images/GameSync/giphy-unscreen.gif" />
                    <div className='botoesup'>
                        <section onClick={()=> (setBarra(!barra))} className='redirects'>
                            <img src="/assets/images/carrinho/bot.png" />
                        </section>
                    </div>

                    <div className='botoesdown'>
                        <section onClick={Massistente} className='redirects'>
                            <img src="/assets/images/carrinho/bot.png" />
                        </section>
                        <section onClick={MostrarCarrin} className='redirects'>
                            <img src="/assets/images/carrinho/carrinho.png" />
                        </section>
                        <section className='redirects'>
                            <img src="/assets/images/barralateral/coracao.png" />
                        </section>
                    </div>

                    
                    



                    {carrin == true &&
                    <section className='BarraLateralCar'>
                        <div className='Resumo'>
                            <h1>Resumo do Carrinho</h1>
                        </div>

                        <main className='prodEsub'>
                            <section className='produtins'>
                                <section className='produtos'>

                                   {carrinho.map( item =>
                                    <Link to={'/produto/23'}>
                                        <div className='produto-car'>
                                            <div className='card'>
                                                <div className='verproduto'>
                                                    <img src="https://imgs.search.brave.com/TBlZEjcbJciqDQgy_SeMfc5EKiISv9VuTkDjOdVDca0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMubmludGVuZG8u/Y29tL2ltYWdlL3Vw/bG9hZC9hcl8xNjo5/LGNfbHBhZCx3XzEy/NDAvYl93aGl0ZS9m/X2F1dG8vcV9hdXRv/L25jb20vc29mdHdh/cmUvc3dpdGNoLzcw/MDEwMDAwMDAwOTY0/LzgxMTQ2MWI4ZDFj/YWNmMWYyZGE3OTFi/NDc4ZGNjZmUyYTU1/NDU3NzgwMzY0YzNk/NWE5NWZiZmNkZDRj/MzA4NmY.jpeg" />
                                                    <button>Ver Produto</button>
                                                </div>
                                                <div className='info'>
                                                    <h1>Minecraft Bedrock Edition</h1>
                                                    <p>Minecraft é um jogo eletrônico sandbox de sobrevivência criado pelo desenvolvedor sueco Markus "Notch" Persson e posteriormente desenvolvido e publicado pela Mojang Studios, cuja propriedade intelectual foi obtida pela Microsoft em 2014. Lançado inicialmente em maio de 2009 como um projeto em desenvolvimento, seu lançamento completo ocorreu em novembro de 2011 para Microsoft Windows, macOS, Linux e alguns dispositivos móveis, sendo posteriormente relançado para uma ampla variedade de plataformas.</p>
                                                    <h1>R$79,90</h1>
                                                </div>
                                            </div>

                                            <div className='acoes'>
                                                <div className='buton apagar'>
                                                    <img src="/assets/images/barralateral/carrinho/lixo.png" />
                                                </div>
                                                <div className='buton qnt'>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </Link>)}
                                    

                                </section>

                                <main className='fake'></main>
                            </section>

                        
                            <section className='menu-carrin'>
                                <div className='subtotal'>

                                </div>
                                <div className='botao continuar'>
                                    <p>Fechar pedido</p>
                                </div>
                                <div className='botao sair'>
                                    <p>Continuar comprando</p>
                                </div>
                            </section>
                        </main>
                    </section>}
                </div>


                </motion.div>
            </div>




            
            {fundo == true &&
            <div onClick={Sair} className='fundo'>   </div>}            
        </div>
    )
}