import './index.scss'

import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'
import Atropos from 'atropos/react';

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BuscarImagem, FiltarCategoria } from '../../../connection/productAPI';

export default function Grupos() {
    const { id } = useParams()

    const [jogos, setJogos] = useState([])

    async function JogosCategoria() {
        let resposta = await FiltarCategoria(id)
        setJogos(resposta)
    }

    useEffect(()=> {
        JogosCategoria()
    }, [])
    
    console.log(jogos)

    return (
        <section id='Grupos'>
            <BarraLateral/>
            <Title
            voltar={true}
            nome={'Grupos de Games'}
            />

            <Atropos
            className='my-atropos'
            rotateXMax={3}
            rotateYMax={3}
            >
                <div className='name'>
                    <h1>{}</h1>
                </div>
            </Atropos>

            <section className='filtragem'>
                <div className='mostrar'>
                    <h3>Mostrar</h3>
                    <p>Novos</p>
                    <img src='/assets/images/acoes/seta-esquerda.png' />
                </div>
            </section>

            <div className='grupo'>
                {jogos.map( item => 
                    
                <ProdutoCard
                    imagem={BuscarImagem(item.img_produto)}
                    nome={item.nm_produto}
                    estado={item.ds_tamanho}
                />    
                    
                )}
            </div>
        </section>
    )
}