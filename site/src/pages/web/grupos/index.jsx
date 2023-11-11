import './index.scss'

import BarraDeCima from '../../../components/baraDeCima'
import BarraLateral from '../../../components/barraLateral'
import Title from '../../../components/title'
import ProdutoCard from '../../../components/produto'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useState } from 'react'

export default function Grupos() {
    const [titulo, setTitulo] = useState("GameGrupos")

    return (
        <section id='Grupos'>
            <BarraLateral/>
            <Title
            voltar={true}
            nome={'Grupos de Games'}
            />

            <section className='name-grupo'>
                <div className='name'>
                    <h1>{titulo}</h1>
                </div>
            </section>

            <section className='filtragem'>
                <div className='mostrar'>
                    <h3>Mostrar</h3>
                    <p>Novos</p>
                    <img src='/assets/images/acoes/seta-esquerda.png' />
                </div>
            </section>

            <div className='grupo'>
                <ProdutoCard
                    imagem={'https://imgs.search.brave.com/F-akkk9WgONHprNR_K-jNOtLt1TvV4ElecXgduldH-0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9maWxl/cy50ZWNub2Jsb2cu/bmV0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzEyL2NvbW8t/am9nYXItbWluZWNy/YWZ0LXZpYS1oYW1h/Y2hpLTM0MHgxOTEu/anBn'}
                    nome={'Minecraft Bedrock Edition'}
                    produtora={'Mojang'}
                    estado={'Novo'}
                />
            </div>
        </section>
    )
}