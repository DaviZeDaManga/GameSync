import './index.scss'
import { BuscarImagem, BuscarProdutos } from '../../connection/produtosAPI'
import ProdutoCard from '../produto'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoadingBar from "react-top-loading-bar";

export default function Produtos({array, limite, tipo, nome, id}) {
    const [produtosfiltrados, setProdutosfiltrados] = useState([])

    //produtos
    const [produtos, setProdutos] = useState([])
    async function Jogos() {
        let resposta = await BuscarProdutos()
        setProdutos(resposta)
    }
    useEffect(() => {
        Jogos()
    }, [])





    //verificacoes
    const [filtros, setFiltros] = useState([true, true, true])
    const [categoriaparecido, setCategoriaparecido] = useState()
    const [empresaparecido, setEmpresaparecido] = useState()
    const [desenparecido, setDesenparecido] = useState()

    



    

    //verificacao para aparecer jogos parecidos
    function ItensVerificacao() {
        for (let item of array) {
            setEmpresaparecido(item.publi)
            setDesenparecido(item.desenvolvedor)
            setCategoriaparecido(item.categoria_id)
        }
     }
    useEffect(()=> {
        ItensVerificacao()
    }, [produtos])

    function JogosParecidos() {
        let filtrados = produtos.filter(item =>
            (filtros[0] && item.empresa === empresaparecido) ||
            (filtros[1] && item.desenvolvedor === desenparecido) ||
            (filtros[2] && item.categoria_id === categoriaparecido)
        );

        if (limite == true) {
            let resposta = filtrados.slice(0, 6)
            setProdutosfiltrados(resposta)
        }
        else { setProdutosfiltrados(filtrados) }
    }
    useEffect(() => {
        JogosParecidos()
    })

    function MudarFiltro(index) {
        let copia = filtros
        let valor = !filtros[index]
        copia[index] = valor
        setFiltros(copia)
    }





    const navigate = useNavigate()
    const ref = useRef()

    function Navegar() {
        ref.current.continuousStart()

        setTimeout(() => {
            ref.current.complete()
            navigate(`/produtos/${nome}/${id}/jogosparecidos`)
        }, 1500);
    }

    return(
        <div id='produtos'>
            <LoadingBar color="#f11946" ref={ref} />

            <section className='titles'>
                <button className='tipoFiltro'>

                </button>
                {tipo != "" &&
                <button className='tipo'>
                    <h1>{tipo}</h1>
                </button>}

                <button onClick={()=> MudarFiltro(0)} className={`filtro`}>
                    Categoria
                </button>
                <button onClick={()=> MudarFiltro(1)} className={`filtro`}>
                    Desenvolvedor
                </button>
                <button className={`${filtros[2] == false && "false"}`}>
                    Empresa
                </button>
            </section>


            <div className="produtos">  

                {produtosfiltrados.map( item => 

                <ProdutoCard
                id={item.produto_id}
                imagem={BuscarImagem(item.imagem_produto)}
                nome={item.nome}
                lancamento={item.tamanho}
                /> 

                )}

                {limite == true &&
                <section onClick={()=> Navegar()} className='vermais'>
                    <p>Ver mais</p>
                </section>}

            </div>
        </div>
    )
}