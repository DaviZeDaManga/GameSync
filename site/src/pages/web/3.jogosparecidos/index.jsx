import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import Produtos from '../../../components/produtos'

import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { BuscarProdutosID } from '../../../connection/produtosAPI'
import { BuscarImagem } from '../../../connection/produtosAPI'
import FooterPage from '../../../components/footerpage/index,'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Keyboard } from 'swiper/modules';

import storage from 'local-storage';
import LoadingBar from "react-top-loading-bar";

export default function JogosParecidos() {
    const dadoscliente = storage('user-logado')

    const { id } = useParams();
    const { nomejogo } = useParams()
    const [jogoinfo, setJogoinfo] = useState([])

    async function JogoInfo() {
        let resposta = await BuscarProdutosID(id)
        setJogoinfo(resposta)
    }

    useEffect(()=> {
        JogoInfo()
    }, [])






    const ref = useRef()
    const navigate = useNavigate()

    function verProduto() {
        ref.current.continuousStart()

        setTimeout(() => {
            ref.current.complete()
            navigate(`/produtos/${nomejogo}/${id}`)
        }, 1500);
    }

    return(
        <div className='jogosparecidos PageTransform'>
            <LoadingBar color="#f11946" ref={ref} />
            <BarraLateral/>
            <Title
            nome={"Jogos Parecidos com"}
            // comp={"Assassins II"}
            voltar={true}
            />

            {jogoinfo.map( item => 
                <Swiper
                    slidesPerView={2}
                    spaceBetween={15}
                    keyboard={{
                        enabled: true,
                    }}
                    modules={[Keyboard]}
                    className="mySwiper2"
                >
                    <SwiperSlide>
                        <img src={BuscarImagem(item.img)} />
                    </SwiperSlide>  
                    <SwiperSlide>
                        <section id="info-produto">  
                            <div className="titulo">
                                <h1>{item.nome}</h1>
                                <p>{item.descricao}</p>
                            </div>
                            <section id='Comprar'>
                                <div className='comprar'>
                                    <div className='info'>
                                    {item.promocao &&
                                        <h1 className='promocao'>R${item.vlPromo}</h1>
                                    }
                                    {item.promocao != true &&
                                        <h1>R${item.preco}</h1>
                                    }
                                    </div>
                                    <button onClick={()=> verProduto()}>Ver produto</button> 
                                </div>
                            </section>
                        </section>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <div className="status">
                            <h1>Estatisticas</h1>
                            <div className="cards">

                                <div className="card">
                                    <h2>Historia Principal</h2>
                                    <p>0 minutos</p>
                                    <div></div>
                                </div>

                                <div className="card">
                                    <h2>Principal + Extras</h2>
                                    <p>0 minutos</p>
                                    <div></div>
                                </div>

                                <div className="card">
                                    <h2>Complementos</h2>
                                    <p>0 minutos</p>
                                    <div></div>
                                </div>

                                <div className="card">
                                    <h2>Todos os estilos</h2>
                                    <p>0 minutos</p>
                                    <div></div>
                                </div>

                            </div>
                            <div></div>
                        </div>
                    </SwiperSlide> 
                </Swiper>
            )}

            <Produtos
            array={jogoinfo}
            tipo={""}
            />

            <FooterPage/>
        </div>
    )
}