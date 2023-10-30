import { useState, useEffect } from 'react'
import './index.scss'
import { Link, json } from 'react-router-dom'
import storage, { set } from 'local-storage';

import { motion } from "framer-motion"

export default function BarraLateral(props) {
    const[nameuser, setNameuser] = useState("")
    const{imguser, setImguser} = useState('/assets/images/GameSync/user.png')

    const[menu, setMenu] = useState(false)
    const[carrin, setCarrin] = useState(false)
    const[fundo, setFundo] = useState(false)
    const[assis, setAssis] = useState(false)
    const[bot, setBot] = useState(true)
    const[configs, setConfigs] = useState(false)

    const [Barra, setBarra] = useState(document.getElementById('barra'))

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





    useEffect(() => {
        if(storage('user-logado')){
            const nomeUser = storage('user-logado');
            setNameuser(nomeUser.nome);
        }
        else{
            setNameuser('anonymous')
        }
    }, [])






    
    function botOUassis() {
        setBot(!bot)
    }

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








    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [rotate, setRotate] = useState(0);

    function Configs() {
        setConfigs(!configs)
    }
    function Mconfigs() {
        if (configs == true) {
            setX(420)
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



    const[xbot, setXbot] = useState (0)
    const[ybot, setYbot] = useState (0)
    const[rotatebot, setRotatebot] = useState (0)

    function MostrarAssistente() {
        setAssis(!assis)
    }

    function Mbot() {
        if (assis == true) {
            setXbot(500)
            setAssis(true)
            Fundo()
        }
        else {
            setXbot(0)
        }
    }

    useEffect(() => {
        Mbot()
    }, [assis])






    return(
        <div id="BarraLateral">

            <div>
                <motion.div
                className="animation-barraL"
                animate={{ x, y, rotate }}
                transition={{ type: "spring" }}
                >

                <div className="BarraLateral">

                    <main className='menu'>
                        <main className='namemenu'>
                            {/* <h1>GameMenu</h1> */}
                        </main>
                        <section className='categorias'>

                            <Link to={'/'}>
                            <div className='categoria'>
                                <img src="/assets/images/barradecima/bolsa-de-compras.png" />
                                <p>Home</p>
                            </div>
                            </Link>
                            <Link to={'/planos'}>
                            <div className='categoria'>
                                <img src="/assets/images/barradecima/controle-de-video-game.png" />
                                <p>Planos</p>
                            </div>
                            </Link>
                            <Link to={'/noticias'}>
                            <div className='categoria'>
                                <img src="/assets/images/barradecima/balao-de-fala.png" />
                                <p>Noticias</p>
                            </div>
                            </Link>
                            


                        </section>
                        <footer className='accout'>
                            <section className='card'>

                            </section>
                        </footer>
                    </main>

                    <img onClick={Configs} className='logo' src="/assets/images/GameSync/giphy-unscreen.gif" />
                    <div className='botoes'>


                        <section onClick={MostrarAssistente} className='redirects'>
                            <img src="/assets/images/carrinho/bot.png" />
                        </section>
                        <section onClick={MostrarCarrin} className='redirects'>
                            <img src="/assets/images/carrinho/carrinho.png" />
                        </section>
                        <section className='redirects'>
                            <img src="/assets/images/barralateral/coracao.png" />
                        </section>
                    </div>

                    {assis == true &&
                        <motion.div
                        className='animation-BarraBot'
                        animate={{ xbot, ybot, rotatebot}}
                        transition={{ type: "spring"}}
                        >

                        <section id='assistente'> 
                            {bot == true &&
                            <div className='linhabot'></div>}
                            {bot == false &&
                            <div className='linhaassis'></div>}

                            <main className='assis'>
                                <section className='assisOUbot'>

                                    {bot == true &&
                                    <>
                                    <button className='botao bot a'>
                                        Bot
                                    </button>
                                    <button onClick={botOUassis} className='botao assistente'>
                                        Assistente
                                    </button>
                                    </>
                                    }

                                    {bot == false &&
                                    <>
                                    <button onClick={botOUassis} className='botao bot'>
                                        Bot
                                    </button>
                                    <button className='botao assistente b'>
                                        Assistente
                                    </button>
                                    </>
                                    }

                                </section>
                                <div className='mensagens'>

                                    <textarea value={Resposta}  onChange={(e) => setResposta(e.target.value)} cols="100" rows="50"></textarea>

                                </div>
                                <nav className='enviar'>
                                    <input onKeyDown={Enter} value={IQuestion}  onChange={(e) => setIQuestion(e.target.value)} type='text' placeholder='Qual a sua duvida?'/>
                                {bot == true &&
                                    <button onClick={GPTbro} className='envbot'><img src="/assets/images/carrinho/enviar.png"/></button>}

                                    {bot == false &&
                                    <button className='envassis'><img src="/assets/images/carrinho/enviar.png"/></button>}
                                </nav>
                            </main>
                        </section>

                        </motion.div>
                    }



                    {carrin == true &&
                    <section className='BarraLateralCar'>
                        <div className='Resumo'>
                            <h1>Resumo do Carrinho</h1>
                        </div>

                        <main className='prodEsub'>
                            <section className='produtos-car'>

                                <Link to={'/produto/54'}>
                                <div className='produto-car'>
                                    <div className='card'>
                                        <div className='verproduto'>
                                            <img src="https://imgs.search.brave.com/A5BOTpwf5ubCH_k3uDrxVORUzgN7nf0oOIAEPZT4n4Y/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5hcGkucGxheXN0/YXRpb24uY29tL3Z1/bGNhbi9pbWcvcm5k/LzIwMjAxMC8xNTIw/L3lQbWxQTmU5ZXh0/VDJBVnN2OTBoT0tt/bi5wbmc" />
                                            <button>Ver Produto</button>
                                        </div>
                                        <div className='info'>
                                            <h1>The Texas Chain Saw Massacre</h1>
                                            <p>O personagem Leatherface teve como inspiração o assassino serial Ed Gein, (1906-1984), que deu origem a outros vilões em outros livros e filmes, mas o caso real do assassino é bem mais monstruoso do que qualquer ficção. Sua primeira vítima foi seu irmão Henry, morto em 1944, embora nada tenha sido provado na época. No ano seguinte, a mãe dele morreu, e então Gein perdeu a razão e, eventualmente, começou a criar roupas e acessórios dos corpos de suas vítimas, das quais guardava os órgãos na sua casa.</p>
                                            <h1>R$109,90</h1>
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
                                </Link>
                                

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
                            </Link>

                            

                            </section>

                            <section className='subtotal'>
                                <div className='dados'>

                                </div>
                                <button>Fechar Pedido</button>
                            </section>
                        </main>

                        <button className='continuar'>
                            Continuar Comprando
                        </button>
                    </section>}
                </div>


                </motion.div>
            </div>




            
            {fundo == true &&
            <div onClick={Sair} className='fundo'>   </div>}            
        </div>
    )
}