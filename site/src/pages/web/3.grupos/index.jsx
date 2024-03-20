import './index.scss'

import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'
import Atropos from 'atropos/react';

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BuscarCategoria, BuscarProdutosCT } from '../../../connection/produtosAPI';
import { BuscarImagem } from '../../../connection/produtosAPI';

export default function Grupos() {
    const { id } = useParams()

    const [jogos, setJogos] = useState([])
    const [categoria, setCategoria] = useState([])

    async function JogosCategoria() {
        let resposta = await BuscarProdutosCT(id)
        setJogos(resposta)
    }

    useEffect(()=> {
        JogosCategoria()
    }, [])

    async function Categoria() {
        let resposta = await BuscarCategoria(id)
        setCategoria(resposta)
    }

    useEffect(() => {
        Categoria()
    }, [])







    return (
        <section className='Grupos PageTransform'>
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
                    {categoria.map( item =>
                        
                        <h1>
                            {item.categoria}
                        </h1>    
                        
                    )}
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
                    id={item.id}
                    imagem={BuscarImagem(item.img)}
                    nome={item.nome}
                    lancamento={item.tamanho}
                />    
                    
                )}
            </div>
        </section>
    )
}