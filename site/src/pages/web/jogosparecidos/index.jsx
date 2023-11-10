import './index.scss'
import BarraDeCima from '../../../components/baraDeCima'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'
import { BuscarJogoID, BuscarImagem } from '../../../connection/productAPI'

import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function JogosParecidos() {
    const { id } = useParams();
    const [jogoinfo, setJogoinfo] = useState([])

    async function JogoInfo() {
        let resposta = await BuscarJogoID(id)
        setJogoinfo(resposta)
    }

    useEffect(()=> {
        JogoInfo()
    }, [])

    console.log(jogoinfo)
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
                <ProdutoCard
                imagem={'https://imgs.search.brave.com/F-akkk9WgONHprNR_K-jNOtLt1TvV4ElecXgduldH-0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9maWxl/cy50ZWNub2Jsb2cu/bmV0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzEyL2NvbW8t/am9nYXItbWluZWNy/YWZ0LXZpYS1oYW1h/Y2hpLTM0MHgxOTEu/anBn'}
                nome={'Minecraft Bedrock Edition'}
                produtora={'Mojang'}
                estado={'Novo'}
                />
            </main>
        </div>
    )
}