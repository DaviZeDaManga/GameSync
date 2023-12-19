import './index.scss'

import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'
import Atropos from 'atropos/react';

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BuscarProdutosCT } from '../../../connection/produtosAPI';
import { BuscarImagem } from '../../../connection/produtosAPI';

export default function Grupos() {
    const { id } = useParams()

    const [jogos, setJogos] = useState([])
    const [categoria, setCategoria] = useState('Categoria')

    async function JogosCategoria() {
        let resposta = await BuscarProdutosCT(id)
        setJogos(resposta)

        // let nomeca = jogos.filter( item => item.nm_categoria)
        // setCategoria(nomeca)
    }

    useEffect(()=> {
        JogosCategoria()
    }, [])
    






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
                    <h1>{categoria}</h1>
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
                    id={item.id_produto}
                    imagem={BuscarImagem(item.img_produto)}
                    nome={item.nm_produto}
                    lancamento={item.ds_tamanho}
                />    
                    
                )}
            </div>
        </section>
    )
}