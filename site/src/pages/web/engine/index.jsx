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
                        <div className='download'>
                            <div>
                                <p>A GameMaker Engine é uma ferramenta de desenvolvimento de jogos que opera com base em eventos e ações. Ela oferece uma linguagem de programação chamada GML e suporta a criação de jogos 2D e 3D. Além disso, fornece recursos para design de níveis e permite exportar jogos para várias plataformas, tornando-a uma escolha popular para desenvolvedores de jogos de todos os níveis de habilidade.</p>
                            </div>
                            <div className='downloads'>
                                <button>
                                    Get started
                                </button>
                                <button>
                                    Download
                                </button>
                            </div>
                        </div>

                        <img className='sonic' src='/assets/images/engine/sonic.png' />
                    </main>
                </Atropos>
            </section>

            <section className='bene'>
                
            </section>
        </div>
    )
}