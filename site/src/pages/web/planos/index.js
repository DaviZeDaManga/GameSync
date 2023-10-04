import './index.scss'
import { useState } from 'react'

import BarraLateral from '../../../components/barraLateral'
import BarraDeCima from '../../../components/baraDeCima'
import FooterPage from '../../../components/footerpage/index,'

export default function Planos(){
    const [perguntaum, setPerguntaum] = useState(false)
    const [perguntadois, setPerguntadois] = useState(false)
    const [perguntatres, setPerguntatres] = useState(false)
    const [perguntaquatro, setPerguntaquatro] = useState(false)

    function PerguntaumF() {
        setPerguntaum(!perguntaum)
        setPerguntadois(false)
        setPerguntatres(false)
        setPerguntaquatro(false)
    }

    function PerguntadoisF() {
        setPerguntaum(false)
        setPerguntadois(!perguntadois)
        setPerguntatres(false)
        setPerguntaquatro(false)
    }

    function PerguntatresF() {
        setPerguntaum(false)
        setPerguntadois(false)
        setPerguntatres(!perguntatres)
        setPerguntaquatro(false)
    }

    function PerguntaquatroF() {
        setPerguntaum(false)
        setPerguntadois(false)
        setPerguntatres(false)
        setPerguntaquatro(!perguntaquatro)
    }

    return(
        <div id='Plano'>
            <BarraLateral/>
            <BarraDeCima/>

            <header className='explain'>
                <section className='explain-1'>
                    
                    <article className='explain-part1'>
                        <div className='explain-1-benefis'>
                         <h1>Beneficios</h1>
                            <p>Aproveite centenas de jogos de alta qualidade e seja o primeiro a jogar novos jogos, como Starfield e SadMouse, no primeiro dia. Nao podemos esquecer do acesso aos jogos nuvem, onde voce pode jogar de qualquer lugar atraves de nosso serviço Alem do preço incrivel dos demais planos da GameMaker, voce tera acesso a um pacote imenso de recursos para ser usados na nossa engine, Vantagens e descontos de membros.</p>
                        </div>
                    </article>

                    <article className='explain-part2'>
                        <div className='explain-1-jogos'>
                            <h1>Jogos</h1>
                            <p>Tem acesso a uma biblioteca imensa de jogos para que voce jogue junto de sua familia, ou ate mesmo sozinho, temos de tudo! </p>
                        </div>

                        <div className='explain-1-engine'>
                            <h1>Engine</h1>
                         <p>Acessibilidade, prototipagem rápida, suporte multiplataforma, recursos visuais avançados e uma comunidade ativa. Permite desenvolver jogos 2D e 3D </p>
                        </div>
                    </article>
                </section>

                <section className='explain-2'>
                    <div className='explain-2-logo'>
                        <img src="assets/images/GameSync/giphy-1--unscreen.gif" alt="" />
                    </div>
                </section>

                <section className='explain-3'>
                    <div className='explain-3-tools'>
                        <p>Nossa engine</p>
                    </div>
                </section>
            </header>

            <main className='planos1'>
                <aside className='planos1-title'>
                    <h1>Plano para Gamers</h1>
                </aside>

                <section className='planos1-gamers'>

                    <div className='planos1-gamers-Recursos'>
                        <h1>Recursos</h1>

                        <div className='planos1-gamers-Recursos-p'>
                        <p>Jogue uma biblioteca com mais de 100 jogos para pc</p>
                        <div className='barrinha'></div>
                        <p>Descontos e promoções exclusivos para integrantes</p>
                        <div className='barrinha'></div>
                        <p>Exclusivos da Game Maker no lançamento</p>
                        <div className='barrinha'></div>
                        <p>Vantagens como, complementos, etc</p>
                        <div className='barrinha'></div>
                        <p>Jogos da nuvem</p>
                        <div className='barrinha'></div>
                        </div>

                    </div>

                    <div className='planos1-gamers-Diamond'>
                        <h1>DimaSync</h1>

                        <div className='planos1-gamers-Recursos-g'>
                        <p>Sim</p>
                        <div className='barrinha a'></div>
                        <p>Sim</p>
                        <div className='barrinha a'></div>
                        <p>Sim</p>
                        <div className='barrinha a'></div>
                        <p>Sim</p>
                        <div className='barrinha a'></div>
                        <p>Sim</p>
                        <div className='barrinha a'></div>
                        </div>
                    
                    </div>

                    <div className='planos1-gamers-Gold'>
                        <h1>UltraSync</h1>

                        <div className='planos1-gamers-Recursos-o'>
                        <p>Sim</p>
                        <div className='barrinha b'></div>
                        <p>Sim</p>
                        <div className='barrinha b'></div>
                        <p>Sim</p>
                        <div className='barrinha b'></div>
                        <p>Não</p>
                        <div className='barrinha b'></div>
                        <p>Não</p>
                        <div className='barrinha b'></div>
                        </div>
            
                    </div>
                </section>
            </main>

            <article className='preco1'>
                    <div className='preco1-mes'>
                        <h1>Preço Mensal</h1>
                    </div>

                    <div className='preco1-acao1'>
                        <div className='preco1-acao1-first'>
                            <p><strong>R$34,99</strong></p>
                        </div>

                        <div className='preco1-acao1-second'>
                            <button className='botao'>Assinar</button>
                        </div>
                    </div>

                    <div className='preco1-acao2'>
                        <div className='preco1-acao1-third'>
                            <p><strong>R$24,99</strong></p>
                        </div>

                        <div className='preco1-acao1-fourth'>
                            <button className='botao'>Assinar</button>
                        </div>
                    </div>

                </article>

                <main className='planos2'>
                    <aside className='planos2-title'>
                        <h1>Plano para  Desenvolvedores</h1>
                    </aside>

                    <section className='planos2-gamers'>

                        <div className='planos2-gamers-Recursos'>
                            <h1>Recursos</h1>

                            <div className='planos2-gamers-Recursos-p'>
                            <p>Biblioteca imensa de extensões para nossa Engine</p>
                            <div className='barrinha'></div>
                            <p>Acesso a 7 videos mostrando como usar a Engine</p>
                            <div className='barrinha'></div>
                            <p>Jogos feitos por voce estarao na sessao “DevMaker”</p>
                            <div className='barrinha'></div>
                            <p>Assistente que estara disponivel sempre pra você</p>
                            <div className='barrinha'></div>
                            </div>

                        </div>

                        <div className='planos2-gamers-Programer'>
                            <h1>Programer</h1>

                            <div className='planos2-gamers-Programer-o'>
                            <p>Sim</p>
                                <div className='barrinha c'></div>
                            <p>Sim</p>
                                <div className='barrinha c'></div>
                            <p>Sim</p>
                                <div className='barrinha c'></div>
                            <p>Sim</p>
                                <div className='barrinha c'></div>
                            <div className='kkkk'></div>
                            </div>
                        </div>
                    </section>
                </main>

                <article className='preco2'>
                    <div className='preco2-mes'>
                        <h1>Preço Mensal</h1>
                    </div>

                    <div className='preco2-acao1'>
                        <div className='preco2-acao1-first'>
                            <p><strong>R$14,99</strong></p>
                        </div>

                        <div className='preco2-acao1-second'>
                            <button className='botao'>Assinar</button>
                        </div>
                    </div>
                </article>

                <footer className='perguntas'>
                    <div className='perguntas-title'>
                        <h1>Perguntas frequentes</h1>
                    </div>

                    <section onClick={PerguntaumF} className='perguntas-card'>
                        <h1>O que são esses planos para pc?</h1>
                   </section>

                   {perguntaum == true &&
                    <nav className='pergunta-resp'>
                        <p>Os planos de serviço de games são uma abordagem revolucionária para a experiência de jogos, oferecendo aos jogadores uma maneira completamente nova de explorar o mundo dos jogos. Imagine que, em vez de comprar jogos individuais separadamente, você tenha acesso a uma vasta biblioteca de jogos, conteúdos extras e vantagens, tudo por meio de uma assinatura ou modelo de pagamento recorrente. Esses planos são oferecidos por lojas de jogos como a Game Maker e transformam a maneira como você joga e experimenta os jogos.</p>
                   </nav>}

                   <section onClick={PerguntadoisF} className='perguntas-card'>
                        <h1>Como obter algum desses planos?</h1>
                   </section>

                   {perguntadois == true &&
                    <nav className='pergunta-resp'>
                        <p>Os planos de serviço de games são uma abordagem revolucionária para a experiência de jogos, oferecendo aos jogadores uma maneira completamente nova de explorar o mundo dos jogos.</p>
                   </nav>}

                   <section onClick={PerguntatresF} className='perguntas-card'>
                        <h1>Com que frequencia sao adicionados os jogos na biblioteca?</h1>
                   </section>

                   {perguntatres == true &&
                    <nav className='pergunta-resp'>
                        <p>Os planos de serviço de games são uma abordagem revolucionária para a experiência de jogos, oferecendo aos jogadores uma maneira completamente nova de explorar o mundo dos jogos. Os planos de serviço de games são uma abordagem revolucionária para a experiência de jogos, oferecendo aos jogadores uma maneira completamente nova de explorar o mundo dos jogos. Os planos de serviço de games são uma abordagem revolucionária para a experiência de jogos, oferecendo aos jogadores uma maneira completamente nova de explorar o mundo dos jogos.</p>
                   </nav>}

                   <section onClick={PerguntaquatroF} className='perguntas-card'>
                        <h1>Como saber quando um jogo irá sair do catálogo?</h1>
                   </section>

                   {perguntaquatro == true &&
                    <nav className='pergunta-resp'>
                        <p>Os planos de serviço de games são uma abordagem revolucionária para a experiência de jogos, oferecendo aos jogadores uma maneira completamente nova de explorar o mundo dos jogos. Os planos de serviço de games são uma abordagem revolucionária para a experiência de jogos, oferecendo aos jogadores uma maneira completamente nova de explorar o mundo dos jogos. Os planos de serviço de games são uma abordagem revolucionária.</p>
                   </nav>}
                </footer>

                <FooterPage />
        </div>
    )
}