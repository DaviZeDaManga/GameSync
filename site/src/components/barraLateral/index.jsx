import { useState, useEffect } from 'react'
import './index.scss'
import { Link, json, useNavigate } from 'react-router-dom'
import storage, { set } from 'local-storage';
import { motion } from "framer-motion"
import { BuscarImagem } from '../../connection/produtosAPI';
import BarraDeCima from '../baraDeCima';

export default function BarraLateral({home, planos, noticias, pesquisa, games}) {
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
        navigate('/pesquisar')
    }

    useEffect(()=> {
        if(pesquisa == false) {
            setBarra(false)
        }
    })



    const [carrinho, setCarrinho] = useState([])
    const [quantitens, setQuantitens] = useState(0)

    async function Carrinho() {

        let carrin = []
        carrin = JSON.parse(localStorage.getItem('carrinho'))
        setCarrinho(carrin || [])

        let totalitens = carrinho.length
        setQuantitens(totalitens)
    }

    useEffect(()=> {
        Carrinho()
    }, [carrinho])

    function Limpar() {
        localStorage.clear('carrinho')
    }





    function ContinuarComprando() {
        setBarra(true)
        setCarrin(false)
    }



    const [precos, setPrecos] = useState([])
    const [total, setTotal] = useState(0)

    function Precinhos() {
        let numero = 1

        setPrecos([...precos, numero])
    }





    const navigate = useNavigate()

    function GameGrupos(id) {
        navigate('/gamegrupos/' + id)
    }

    return(
        <div id="BarraLateral">
            <BarraDeCima/>

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
                            <Link to={'/games'}>
                            <div className={`categoria ${games == true && 'selecionado'}`}>
                                <img src="/assets/images/barradecima/balao-de-fala.png" />
                                <p>Jogar</p>
                            </div>
                            </Link>

                            <div className='linhaBarra'></div>
                        
                            <div onClick={PesquisaBarra} className={`categoria ${cateb == 1 &&'selecionado'}`}>
                                <img src="/assets/images/barralateral/navegar/lupa.png" />
                                <p>GameGrupos</p>
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

                            <section onClick={()=> (GameGrupos(1))} className='gamegrupo'>
                                <h1>Ação</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(2))} className='gamegrupo'>
                                <h1>Terror</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(3))} className='gamegrupo'>
                                <h1>FPS</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(4))} className='gamegrupo'>
                                <h1>RPG</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(5))} className='gamegrupo'>
                                <h1>Souls Like</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(6))} className='gamegrupo'>
                                <h1>Aventura</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(7))} className='gamegrupo'>
                                <h1>Tiro</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(8))} className='gamegrupo'>
                                <h1>Estratégia</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(9))} className='gamegrupo'>
                                <h1>Esportes</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(10))} className='gamegrupo'>
                                <h1>Corrida</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(11))} className='gamegrupo'>
                                <h1>Quebra-Cabeça</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(12))} className='gamegrupo'>
                                <h1>Plataforma</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(13))} className='gamegrupo'>
                                <h1>Simulação</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(14))} className='gamegrupo'>
                                <h1>Luta</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(15))} className='gamegrupo'>
                                <h1>Sobrevivência</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(16))} className='gamegrupo'>
                                <h1>RTS</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(17))} className='gamegrupo'>
                                <h1>Cartas</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(18))} className='gamegrupo'>
                                <h1>Musica</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(19))} className='gamegrupo'>
                                <h1>MMO</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(20))} className='gamegrupo'>
                                <h1>Mundo aberto</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(21))} className='gamegrupo'>
                                <h1>Sandbox</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(22))} className='gamegrupo'>
                                <h1>História interatva</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(23))} className='gamegrupo'>
                                <h1>Educacional</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(24))} className='gamegrupo'>
                                <h1>Visual Novel</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(25))} className='gamegrupo'>
                                <h1>Battle Royale</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(26))} className='gamegrupo'>
                                <h1>Rogue-like</h1>
                            </section>
                            <section onClick={()=> (GameGrupos(27))} className='gamegrupo'>
                                <h1>Construção</h1>
                            </section>

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
                            {carrinho.length > 0 &&
                            <div className='itenscar'>
                                <p>{quantitens}</p>
                            </div>}
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

                                   {carrinho.length >= 1 &&
                                        
                                    <>
                                    {carrinho.map( item =>
                                        <Link to={'/produto/' + item.id}>
                                            <div className='produto-car'>
                                                <div className='card'>
                                                    <div className='verproduto'>
                                                        <img src={BuscarImagem(item.img)} />
                                                    </div>
                                                    <div className='info'>

                                                        <div className='text'>
                                                        <h1>{item.nome}</h1>
                                                        <p>{item.desc}</p>
                                                        </div>

                                                        <h1>R${item.preco}</h1>
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
                                    </>

                                   }
                                    

                                </section>

                            </section>

                        
                            <section className='menu-carrin'>
                                <div className='subtotal'>
                                    <button onClick={Limpar}>Limpar tudo</button>

                                    <div className='total'>
                                        <h1>Subtotal</h1>
                                        <p>R${total}</p>
                                    </div>


                                    <a href='/PayCard'>         
                                          <div className='cartao'>  
                                        <section className='card'>
                                            <div className='img'>
                                                <img src='/assets/images/carrinho/cartao-de-credito.png' />
                                            </div>
                                            <div className='info'>
                                                <h1>2x de R$63,89</h1>
                                                <p>sem juros</p>
                                            </div>                                         
                                        </section>
                                    </div>
                                     </a>
                                   
                                            <div className='boleto'>
                                        <section onClick={Precinhos} className='card'>
                                            <div className='img'>
                                                <img src='/assets/images/carrinho/codigo-de-barras.png' />
                                            </div>
                                            <div className='info'>
                                                <h1>R$100,89</h1>
                                                <p>com boleto ou no pix a vista</p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                
                                <div className='botao continuar'>
                                    <p className='black'>Fechar pedido</p>
                                </div>
                                <div onClick={ContinuarComprando} className='botao sair'>
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