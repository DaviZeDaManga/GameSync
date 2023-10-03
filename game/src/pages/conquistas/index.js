import './index.scss'
import axios from 'axios'

import BarraLateral from '../../components/barraLateral'
import { useState } from 'react'


export default function Conquistas(){
    const [normal, setNormal] = useState (true)
    const [mconquistas, setMconquistas] = useState (false)

    const [idprod, setIdprod] = useState ('Minecraft')

    const [nome, setNome] = useState ('')
    const [desc, setDesc] = useState ('')
    const [conquista, setConquista] = useState ([])

    async function Conquista() {
        let url = 'https://api.rawg.io/api/games/'+ idprod +'/achievements?key=0a526d3c3985430c9469d8d6951eb5cb&&page_size=5'
        let resposta = await axios.get(url)

        setConquista(resposta.data.results)
    }

    useState(() => {
        Conquista()
    }, [])

return(

    <div id='Conquista'>
        <BarraLateral/>
        <div className='image-frame'>
            <div className='image-main'>
                <div className='search-bar'>

                    <button className='search-button'>
                        <a href="http://localhost:3000/procurar">Voltar</a>
                    </button>
                    <input className='search-image-frame' type='text' placeholder='Pesquise por Jogos para Ver as Conquistas'>
                    </input>

                    <div className='user-search-frame'>
                        <img className='user-search-perfil' src="assets/images/GameSync/User.png"/>
                    </div>

                </div>
                <div className='section-texts'>
                    <div className='text-conquistas'>
                        <h2></h2>
                        <p></p>
                    </div>
                </div>

            </div>
        </div>

        <div className='achivements'>
            <div className='achivements-sections'>
                <div className='section-left'>
                    <div className='title-achive'>
                    <img src="assets/images/GameSync/trofeu.svg"/>
                        <h1>Conquistas</h1>
                    </div>
                    
                    <div className='block-points'>
                        <div className='achivements-points'>
                            <img className='points-img' src="assets/images/GameSync/pontos.svg"/>
                            <p>2500 pontos</p> 
                        </div>
                        <div className='line'></div>
                        <div className='achivements-feats'>
                            <img className='feats-img' src="assets/images/GameSync/feitos.svg"/>
                            <p>0 feitos</p>
                        </div>
                        
                    </div>

                </div>

                <div className='section-right'>

                    <input className='search-achives' type='text' placeholder='Procurar por Conquistas'></input>
                    
                    {normal == true &&
                    <div className='achive-unlock'>
                        <div className='awards'>
                            <div className='awards-s1'>
                                <img src="assets/images/GameSync/AchivementsVetor.png"/>
                            </div>
                            <div className='awards-s2'>

                            </div>
                        </div>

                        <div className='awards'>
                            <div className='awards-s1'>
                                <img src="assets/images/GameSync/AchivementsVetor.png"/>
                            </div>
                            <div className='awards-s2'>

                            </div>
                        </div>

                        <div className='awards'>
                            <div className='awards-s1'>
                                <img src="assets/images/GameSync/AchivementsVetor.png"/>
                            </div>
                            <div className='awards-s2'>

                            </div>
                        </div>

                        <div className='awards'>
                            <div className='awards-s1'>
                                <img src="assets/images/GameSync/AchivementsVetor.png"/>
                            </div>
                            <div className='awards-s2'>

                            </div>
                        </div>

                    </div>}

                    {mconquistas == true &&
                    <div className='achive-unlock'>


                        {conquista.map( item => 
                            
                            <div className='awards'>
                                <div className='awards-s1'>
                                    <img src="assets/images/GameSync/AchivementsVetor.png"/>
                                </div>
                                <div className='awards-s2'>

                                </div>
                            </div>

                        )}


                    </div>}

                </div>

            </div>
        </div>


    </div>





)

}