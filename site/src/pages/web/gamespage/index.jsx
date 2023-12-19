import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'

import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { BuscarProdutos } from '../../../connection/produtosAPI'
import { BuscarGames } from '../../../connection/jogosAPI'
import { BuscarImagem } from '../../../connection/produtosAPI'

export default function Gamespage() {

    const [games, setGames] = useState([])
    const [jogos, setJogos] = useState([])

    async function Games() {
        let resposta = await BuscarProdutos()
        setGames(resposta)
    }

    useEffect(() => {
        Games()
    })

    async function Jogos() {
        let resposta = await BuscarGames()
        setJogos(resposta)
    }

    useEffect(() => {
        Jogos()
    })

    console.log(jogos)
    console.log(games)


    return (
        <div className='Games'>
            <BarraLateral
            games={true}
            />

            <section className='oqjogar'>

                <main className='card'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {jogos.map( item => 
                            
                        <SwiperSlide>
                            <section className='game'>
                                <img src={BuscarImagem(item.imagem_produto)} />
                                <div className='info'>
                                    {/* <p>{item.descricao}</p> */}
                                    <button>
                                        Jogar
                                    </button>
                                </div>
                            </section>
                        </SwiperSlide>    
                            
                        )}
                        
                    </Swiper>
                </main>
                
            </section>

            <Title
            nome={'Jogos'}
            />

            <section className='games'>
                {games.map( item =>

                <ProdutoCard
                    id={item.id_jogos}
                    nome={item.nm_jogo}
                    imagem={item.img_jogo}
                    lancamento={'Plebe'}
                    tipo={'jogar'}
                />

                )}
            </section>
            
        </div>
    )
}