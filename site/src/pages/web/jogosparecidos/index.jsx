import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'

import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BuscarProdutos, BuscarProdutosID } from '../../../connection/produtosAPI'
import { BuscarImagem } from '../../../connection/produtosAPI'

export default function JogosParecidos() {
    const { id } = useParams();
    const [jogoinfo, setJogoinfo] = useState([])

    async function JogoInfo() {
        let resposta = await BuscarProdutosID(id)
        setJogoinfo(resposta)
    }

    useEffect(()=> {
        JogoInfo()
    }, [])


    const [jogos, setJogos] = useState([])

    async function Jogos() {
        let resposta = await BuscarProdutos()
        setJogos(resposta)
    }

    useEffect(() => {
        Jogos()
    }, [])








    const [categoria, setCategoria] = useState()
    const [desenvolvedor, setDesenvolvedor] = useState()

    useEffect(() => {
        jogoinfo.map( item => setCategoria(item.nm_categoria))
        jogoinfo.map( item => setDesenvolvedor(item.ds_desenvolvedor))
    })

    const jogosparecidos = jogos.filter(item => item.categoria_nome == categoria || item.desenvolvedor == desenvolvedor)
    console.log(jogosparecidos)

    return(
        <div id='jogosparecidos'>
            <BarraLateral/>
            <Title
            nome={"Jogos Parecidos com"}
            voltar={true}
            />

            <section id='produto'>

                {jogoinfo.map( item => 
                    <section className='produtocard'>
                        <main className='conteudo'>
                            <h1>{item.nm_produto}</h1>
                            <p>{item.ds_descricao}</p>
                        </main>
                        <div className='img'>
                            <img src={BuscarImagem(item.img_produto)} />
                        </div>
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

            <main className='jogos'>
                {jogosparecidos.map( item =>
                    
                    <ProdutoCard
                    id={item.produto_id}
                    imagem={BuscarImagem(item.imagem_produto)}
                    nome={item.nome}
                    lancamento={item.tamanho}
                    />
                    
                )}

            </main>
        </div>
    )
}