import { useState, useEffect } from 'react'
import './index.scss'
import { Link, json } from 'react-router-dom'


export default function BarraLateral(props) {
    const[menu, setMenu] = useState(false)
    const[carrin, setCarrin] = useState(false)
    const[fundo, setFundo] = useState(false)
    const[assis, setAssis] = useState(false)
    const[bot, setBot] = useState(true)

    function Fundo() {
        if(carrin == true || menu == true || assis == true) {
            setFundo(true)
        }
        else {
            setFundo(false)
        }
    }

    useEffect( ()=> {
        Fundo()
    }, [carrin, menu, assis])

    function MostrarAssistente() {
        setAssis(!assis)
        Fundo()
    }

    function MostrarCarrin() {
        setCarrin(!carrin)
        Fundo()
    }

    function MostrarMenu() {
        setMenu(!menu)
        Fundo()
    }
    
    function Sair() {
        setCarrin(false)
        setMenu(false)
        setAssis(false)
    }

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


          //carrinho id
    // var {idProduto} = useParams();
    // const [nome, setNome] = useState('')
    // const [image, setImage] = useState('');
    // const [descricao, setDescricao] = useState('')

    // useEffect(() => {
    //     async function DetalhesBuy(){
    //         try{
    //             const response = await axios.get('https://api.rawg.io/api/games/' + idProduto + '?key=0a526d3c3985430c9469d8d6951eb5cb&');
    //             console.log(idProduto)
    //             setNome(response.data.name)
    //             setImage(response.data.background_image)
    //             setDescricao(response.data.description_raw)
    //         }
    //         catch(error){
    //             console.log('Infelizmente deu erro' + error)
    //         }
    //     }
    //     DetalhesBuy();
    // }, [idProduto]);


    return(
        <div id="BarraLateral">
            {fundo == true &&
            <div onClick={Sair} className='fundo'></div>}
            
            {menu == true &&
            <section className='Menu'>
                <main className='geral'>
                    <section className='pages'>
                        <h1 className='none'>Paginas</h1>
                        <div className='linha'></div>
                        <a href="http://localhost:3000/">Descobrir</a>
                        <a href="http://localhost:3000/procurar">Procurar</a>
                        <a href="http://localhost:3000/planos">Planos</a>
                        <a href="">Noticias</a>
                        <a href="http://localhost:3000/conquistas">Sessao Conquista</a>
                        <a href="http://localhost:3000/sobregamesync">Sobre Nós</a>

                        <h1 >Menu</h1>
                        <div className='linha'></div>
                        <a href="">Configurações</a>
                        <a href="">Usuario</a>
                        <a href="">Privacidade</a>
                        <a href="">Gerenciar pagamento</a>

                        <h1 >Eu</h1>
                        <div className='linha'></div>
                        <a href="">Minha Conta</a>
                        <a href="">Favoritos</a>
                        <a href="">Compras</a>
                    </section>
                </main>
            </section>}

            {assis == true &&
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
            </section>}


            <div className="BarraLateral">
                <img onClick={MostrarMenu} className='logo' src="/assets/images/GameSync/giphy-unscreen.gif" />
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
            </div>


            {carrin == true &&
            <section className='BarraLateralCar'>
                <div className='Resumo'>
                    <h1>Resumo do Carrinho</h1>
                </div>

                <main className='prodEsub'>
                    <section className='produtos'>

                        <div className='produto'>
                            <div className='card'>
                                <div className='verproduto'>
                                    <img src="/assets/images/teste/jogo.jpg" />
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
                                    <img src="/assets/images/carrinho/lixeira.png" />
                                </div>
                                <div className='buton qnt'>
                                    
                                </div>
                            </div>
                        </div>

                        

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
    )
}