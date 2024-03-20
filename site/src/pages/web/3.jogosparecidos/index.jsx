import './index.scss'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'

import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BuscarProdutos, BuscarProdutosID } from '../../../connection/produtosAPI'
import { BuscarImagem } from '../../../connection/produtosAPI'
import FooterPage from '../../../components/footerpage/index,'

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










    const [produtos, setProdutos] = useState([])
    const [produtosparecidos, setProdutosparecidos] = useState([])

    //verificacoes
    const [categoriaparecido, setCategoriaparecido] = useState()
    const [empresaparecido, setEmpresaparecido] = useState()
    const [desenparecido, setDesenparecido] = useState()

    //aparecer produtos
    async function Jogos() {
        let resposta = await BuscarProdutos()
        setProdutos(resposta)
    }

    useEffect(() => {
        Jogos()
    }, [])

    //verificacao para aparecer jogos parecidos
    function VerificacaoParecidos() {
        for (let item of jogoinfo) {
            setEmpresaparecido(item.publi)
            setDesenparecido(item.desenvolvedor)
            setCategoriaparecido(item.categoria_id)
        }
     }
 
    useEffect(()=> {
        VerificacaoParecidos()
    }, [produtos])

    //verificar jogos com as verificacoes
    function JogosParecidos() {
        let filtrados = produtos.filter( item => item.publi == empresaparecido || item.desenvolvedor == desenparecido || item.categoria_id == categoriaparecido) 
        setProdutosparecidos(filtrados)
    }

    useEffect(() => {
        JogosParecidos()
    }, [categoriaparecido])

    return(
        <div className='jogosparecidos PageTransform'>
            <BarraLateral/>
            <Title
            nome={"Jogos Parecidos com"}
            voltar={true}
            />

            <section id='produto'>

                {jogoinfo.map( item => 
                    <section className='produtocard'>
                        <main className='conteudo'>
                            <h1>{item.nome}</h1>
                            <p>{item.descricao}</p>
                        </main>
                        <div className='img'>
                            <img src={BuscarImagem(item.img)} />
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
                {produtosparecidos.map( item =>
                    
                    <ProdutoCard
                    id={item.produto_id}
                    imagem={BuscarImagem(item.imagem_produto)}
                    nome={item.nome}
                    lancamento={item.tamanho}
                    />
                    
                )}

            </main>

            <FooterPage/>
        </div>
    )
}