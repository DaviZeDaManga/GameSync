import './index.scss'

import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'

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
            nome={"Categoria"}
            comp={"Ação"}
            voltar={true}
            />

            <section id='categoria'>

                {categoria.map( item => 
                    <section className='categoriacard'>
                        <div className='conteudo vazio'>
                            
                            <section className='categorianame'>
                                <h1>{item.categoria}</h1>
                            </section>
                            <section className='categoriainfo'>
                                
                            </section>

                        </div>
                        <main className='conteudo'>
                            
                            

                        </main> 
                    </section>
                )}

            </section>

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