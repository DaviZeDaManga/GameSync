import './index.scss'

import BarraLateral from '../../../components/barraLateral'
import FooterPage from '../../../components/footerpage/index,'
import Title from '../../../components/title';

import React, { useRef, useState } from 'react';

export default function Planos(){
 
    return(
        <div className='Planos PageTransform'>
            <BarraLateral/>
            <Title
            nome={'Planos'}
            />

            <section className='sobre'>

                <main className='card'>

                    <section className='bloco'>
                        <section className='cardbloco roxo'>
                            {/* <h1>Beneficios</h1>
                            <p>Aproveite centenas de jogos de alta qualidade e seja o primeiro a jogar novos jogos, como Starfield e SadMouse, no primeiro dia. Nao podemos esquecer do acesso aos jogos nuvem, onde voce pode jogar de qualquer lugar atraves de nosso serviço Alem do preço incrivel dos demais planos da GameMaker, voce tera acesso a um pacote imenso de recursos para ser usados na nossa engine, Vantagens e descontos de membros.</p> */}
                        </section>
                    </section>

                    <section className='bloco'>
                        <section className='cardbloco azul'>
                            {/* <h1>Jogos</h1>
                            <p>Tem acesso a uma biblioteca imensa de jogos para que voce jogue junto de sua familia, ou ate mesmo sozinho, temos de tudo! </p> */}
                        </section>
                        <section className='cardbloco '>
                            {/* <h1>Engine</h1>
                            <p>Acessibilidade, prototipagem rápida, suporte multiplataforma, recursos visuais avançados e uma comunidade ativa. Permite desenvolver jogos 2D e 3D </p> */}
                        </section>
                    </section>

                </main>
                <main className='card'>
                    <img src='/assets/images/GameSync/giphy-1--unscreen.gif' />
                </main>
                <main className='card engine'>

                </main>

            </section>





            <BarraLateral/>
            <Title
            nome={'Planos para Gamers'}
            />
        </div>
    )
}