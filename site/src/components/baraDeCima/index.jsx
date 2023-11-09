import { useState, useEffect } from 'react'
import './index.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import storage, { set } from 'local-storage';
import { motion } from 'framer-motion';
import ProdutoCard from '../produto';
import { ListarTodosJogos } from '../../connection/productAPI';
import { BuscarImagem } from '../../connection/productAPI';
    
export default function BarraDeCima ({barra}) {
    const [lista, setLista] = useState (230)
    const [idprod, setIdprod] = useState ('')
    const [imguser, setImguser] = useState("")
    const [nome, setNome] = useState('')







    useEffect(() => {
        if(storage('user-logado')){
            const nomeUser = storage('user-logado');
            setNome(nomeUser.nome);
        }
        else{
            setNome('anonymous')
        }
    }, [])

    useEffect(() => {
        if(storage('user-logado')) {
            const imguser = storage('user-logado')
            setImguser(imguser.img)
        }
        else {
            setImguser('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAsDSSKeuAFldRDZbOWFuVrdgdAcZf-S6Aw&usqp=CAU')
        }
    }, [])


    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [rotate, setRotate] = useState(0);
    const [escalapesquisa, setEscalapesquisa] = useState(1)
    const [pesquisa, setPesquisa] = useState(false)
    const [games, setGames] = useState (false)
    const [tgames, setTgames] = useState ([])






    function espera (ms) {          
        return new Promise ( resolve => {              
            setTimeout(() => {resolve('')}, ms);          
        })        
    }  

    useEffect(() => {
        if(barra == true) {
            setGames(true)
            setPesquisa(true)
            setX(0)
            setEscalapesquisa(1)
        }

        else {
            setX(-2000)
            Sair()
            
            async function Sair() {
                for (let i = 2; i >= 0; i--){           
                    await espera(1000);         
                    
                    if(i == 0) {
                        setPesquisa(false)
                        setGames(false)
                        setEscalapesquisa(0)
                    }
                }
            }     
        }
    })

    async function RecarregarPagina() {
        for (let i = 0; i >= 0; i--){           
            await espera(1000);         
            
            if(i == 0) {
                window.location.reload()
            }
        }
    }  
     
        








    // async function TodosGames() {
    //     const resposta = await ListarTodosJogos()
    //     setTgames(resposta)
    // }
    
    // useEffect(()=> {
    //     TodosGames()
    // }, [])

    console.log(tgames)


    const [configcard, setConfigcard] = useState(0)

    return(
        <>

        <section className='perfil'>
            <p>{nome}</p>
            <Link to={`/perfil`}>
                <div className='card'>
                    <img src={imguser} />
                </div>
            </Link>
            {configcard == 0 &&
            <div onClick={()=> (setConfigcard(-200))} className='card p'>
                <img src='/assets/images/acoes/pontos.png' />
            </div>}
            {configcard == -200 &&
            <div onClick={()=> (setConfigcard(0))} className='card p selecionado'>
                <img src='/assets/images/acoes/pontos.png' />
            </div>}

            <motion.div
            className='configconta'
            animate={{
                x: configcard
            }}
            >   
            <button>
                Meu Perfil
            </button>

            </motion.div>
        </section>




        

        {pesquisa == true &&
        <motion.div
        className='BarraDeCima'
        animate={{ x, y, rotate, scale: escalapesquisa }}
        transition={{ type: "spring" }}
        >
        <section className='pesquisa'>  
            <input type="text" placeholder="procurar na GameSync" />
        </section>

        {games == true &&
            <section id='pesquisar'>
                <main className='pGames'>

                    {tgames.map( item => 
                        <ProdutoCard 
                        onClick={RecarregarPagina}
                        id={item.produto_id}
                        nome={item.nome}
                        imagem={BuscarImagem(item.imagem_produto)}
                        lancamento={item.tamanho}
                        />    
                    )}

                </main>
                <section className='filtragem'>

                </section>
            </section>
            }
        

        </motion.div>}
        </>
    )
}