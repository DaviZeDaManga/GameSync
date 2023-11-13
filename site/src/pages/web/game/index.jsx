import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import { useState } from 'react'

export default function Game() {
    const [jogar, setJogar] = useState(false)

    return(
        <div className='game'>
            <BarraLateral/>
            <Title
            nome={'Game'}
            voltar={true}
            />

            <section className='gameinfo'>
                <main className='jogo'>
                    {jogar == false &&
                    <>
                    <img src='/assets/images/games/img/termo.webp' />
                    <div className='name'>
                        <div>
                            <h1>Termo</h1>
                        </div>
                    </div>
                    </>
                    }
                    {jogar == true &&
                    <iframe src='https://ev.io' />}
                </main>
                <section className='sobre'>
                    <section className='title'>
                        <h1>Termo</h1>
                    </section>

                    <section className='info'>
                        <p>O objetivo da brincadeira é fazer o usuário adivinhar uma palavra em até seis tentativas. Enquanto a resposta certa não é dada, o jogador precisa arriscar termos ao invés de dar palpites de letras. Além disso, uma nova palavra é escolhida a cada 24h e é a mesma para todos que estejam jogando naquele dia.</p>
                    </section>

                    <section className='jogar'>
                        <button onClick={()=> (setJogar(!jogar))}>
                            {jogar == false && "Jogar"}
                            {jogar == true && "Parar"}
                        </button>
                    </section>
                </section>
            </section>



            

        </div>
    )
}