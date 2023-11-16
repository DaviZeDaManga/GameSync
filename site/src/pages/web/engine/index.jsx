import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import FooterPage from '../../../components/footerpage/index,'
import Title from '../../../components/title'
import Atropos from 'atropos/react';

export default function Engine() {

    return(
        <div id='engine'>
            <BarraLateral/>
            <Title
            voltar={true}
            nome={'Engine GameSync'}
            />

            <section className='sobre-engine'>
                <Atropos
                className='my-atropos'
                rotateXMax={3}
                rotateYMax={3}
                >
                    <main className='sobre'>
                        {/* <div className='download'>
                            <div>
                                <h1>Crie seus Jogos!</h1>

                            </div>
                            <div className='downloads'>
                                <button>
                                    Get started
                                </button>
                                <button>
                                    Download
                                </button>
                            </div>
                        </div> */}

                        <img className='sonic' src='/assets/images/engine/sonic.png' />
                    </main>
                </Atropos>
            </section>

            {/* <section className='bene-gerais'>
                <section className='card blue'>
                    <h1>Linguagem de programação fácil de aprender:</h1>
                    <p>Embora o Game Maker permita que os desenvolvedores utilizem seu sistema de arrastar e soltar, também incluem seu próprio idioma de programação chamado GML (GameMaker Language). GML é fácil de aprender e é uma boa introdução para aqueles que desejam melhorar suas habilidades de programação.</p>
                </section>
                <section className='card'>

                </section>
                <section className='card'>

                </section>
            </section> */}
        </div>
    )
}