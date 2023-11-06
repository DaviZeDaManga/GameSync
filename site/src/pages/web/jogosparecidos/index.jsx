import './index.scss'
import BarraDeCima from '../../../components/baraDeCima'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'

import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function JogosParecidos() {
    const { id } = useParams();

    const [idprod, setIdprod] = useState (id)
    const [nome, setNome] = useState ('Minecraft Bedrock Edition')
    const [desc, setDesc] = useState ('Minecraft é um jogo eletrônico sandbox de sobrevivência criado pelo desenvolvedor sueco Markus "Notch" Persson e posteriormente desenvolvido e publicado pela Mojang Studios, cuja propriedade intelectual foi obtida pela Microsoft em 2014. Lançado inicialmente em maio de 2009 como um projeto em desenvolvimento, seu lançamento completo ocorreu em novembro de 2011 para Microsoft Windows, macOS, Linux e alguns dispositivos móveis, sendo posteriormente relançado para uma ampla variedade de plataformas.')

    const [imagem, setImagem] = useState ('https://imgs.search.brave.com/F-akkk9WgONHprNR_K-jNOtLt1TvV4ElecXgduldH-0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9maWxl/cy50ZWNub2Jsb2cu/bmV0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzEyL2NvbW8t/am9nYXItbWluZWNy/YWZ0LXZpYS1oYW1h/Y2hpLTM0MHgxOTEu/anBn')

    return(
        <div id='jogosparecidos'>
            <BarraDeCima/>
            <BarraLateral/>
            <Title
            nome={"Jogos Parecidos com"}
            voltar={true}
            />

            <section id='produto'>
                <section className='produtocard'>
                    <main className='conteudo'>
                        <h1>{nome}</h1>
                        <p>{desc}</p>
                    </main>
                    <div className='img'>
                        <img src={imagem} />
                    </div>
                </section>
            </section>
        </div>
    )
}