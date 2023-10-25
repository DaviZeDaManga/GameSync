import './index.scss'
import { useState } from 'react'

import BarraLateral from '../../../components/barraLateral'
import BarraDeCima from '../../../components/baraDeCima'


import LinksPerfil from '../../../components/perfil_mudar_links'

export default function MudarPerfil(){
    const [backgroundColor, setBackgroundColor] = useState('linear-gradient(to bottom, rgba(206, 165, 60, 1), rgba(175, 64, 49, 1))');

    const MudarCor = (NovaCor) => {
        setBackgroundColor(NovaCor);
    };

    return(
        <div id='Change'>
            <BarraLateral/>
            <BarraDeCima/>

            <nav className='Change-fundo' style={{ background: backgroundColor }}>
                <div className='Change-fundo-f'>
                    <img src="assets/images/GameSync/blue.webp" alt="" />
                </div>

                <div className='Change-fundo-n'>
                    <p><strong>piriquitão</strong></p>
                </div>
            </nav>

            <LinksPerfil />

            <main className='Information'>
                <section className='Information-pessoal'>
                    <h1>Informações Pessoais</h1>
                    
                    <div className='Information-name'>
                        <h5>Nome</h5>
                        <input type="text" required="required" placeholder='Digite aqui seu nome'/>
                    </div>

                    <div className='Information-DT-g'>
                        <div className='Information-DT'>
                            <h5>Data de Nascimento</h5>
                            <input type="date" required="required" placeholder='Sua data de Nascimento' />
                        </div>

                        <div className='Information-g'>
                            <h5>Genero</h5>

                            <select required="required" id="gender" name="gender">
                                <option value="male">Masculino</option>
                                <option value="female">Feminino</option>
                                <option value="other">Outro</option>
                            </select>
                        </div>
                    </div>

                    <div className='Information-cpf'>
                        <h5>CPF</h5>
                        <input required="required"
                        type="password" />
                    </div>

                    <button>Alterar dados</button>
                </section>

                <article className='Information-perfil'>
                    <h1>Informações do Perfil</h1>
                    
                    <div className='Information-name'>
                        <h5>Nome do Perfil</h5>
                        <input type="text" placeholder='Digite aqui o nome do perfil'/>
                    </div>

                    <div className='Information-I-FP'>
                        <div className='Information-I-F'>
                            <h5>Escolher imagem de fundo</h5>

                            <label className='upload'>
                                <input type="file" placeholder='Procurar' />
                            </label>
                        </div>

                        <div className='Information-I-F'>
                            <h5>Escolher imagem de Perfil</h5>

                            <label className='upload'>
                                <input type="file" placeholder='Procurar'/>
                            </label>
                        </div>
                    </div>

                    <div className='Information-color'>
                        <h5>Escolher cores</h5>

                        <div className='cores'>
                        <button className='red' onClick={() => MudarCor('rgba(212, 70, 70, 1)')}></button>
                        <button className='green' onClick={() => MudarCor('linear-gradient(to bottom, rgba(107, 189, 106, 1), rgba(22, 133, 133, 1))')}></button>
                        <button className='purple' onClick={() => MudarCor('linear-gradient(to bottom, rgba(143, 69, 201, 1), rgba(84, 63, 212, 1))')}></button>
                        <button className='orangeF' onClick={() => MudarCor('linear-gradient(to bottom, rgba(212, 121, 70, 1), rgba(212, 70, 70, 1))')}></button>
                        <button className='orangeL' onClick={() => MudarCor('linear-gradient(to bottom, rgba(206, 165, 60, 1), rgba(175, 64, 49, 1))')}></button>

                        <button className='nova'><div className='horizontal'></div> <div className='vertical'></div></button>
                        </div>
                    </div>

                    <button className='Alterar'>Alterar dados</button>
                </article>
            </main>

        </div>
    )
}