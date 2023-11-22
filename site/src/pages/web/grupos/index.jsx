import './index.scss'

import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'
import Atropos from 'atropos/react';

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BuscarImagem, ListarTodosJogos } from '../../../connection/productAPI';

export default function Grupos() {
    const { id } = useParams()

    const [jogos, setJogos] = useState([])

    async function JogosCategoria() {
        let resposta = await ListarTodosJogos(id)
        setJogos(resposta)
    }

    useEffect(()=> {
        JogosCategoria()
    }, [])
    
    console.log(jogos)

    const categoria = jogos.filter(categoria => (categoria.categoria_id == id));




    console.log( categoria );

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
                    <h1>Teste</h1>
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
                {categoria.map( item => 
                    
                <ProdutoCard
                    id={item.produto_id}
                    imagem={BuscarImagem(item.imagem_produto)}
                    nome={item.nome}
                    lancamento={item.tamanho}
                />    
                    
                )}
            </div>
        </section>
    )
}