import { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import storage, { set } from 'local-storage';
import { motion } from 'framer-motion';
import ProdutoCard from '../produto';
import { ListarTodosJogos } from '../../connection/productAPI';
import { BuscarImagem } from '../../connection/productAPI';
import './index.scss'
    
export default function BarraDeCima ({barra}) {
    const navigate = useNavigate()

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

            setTimeout(() => {
                setPesquisa(true)
                setX(5000)
                setEscalapesquisa(1)
            }, 1000);
        }

        else {
            setX(0)

            setTimeout(() => {
                setPesquisa(false)
                setGames(false)
                setEscalapesquisa(0)
            }, 2000);    
        }
    })
     
        








    async function TodosGames() {
        const resposta = await ListarTodosJogos()
        setTgames(resposta)
    }
    
    useEffect(()=> {
        TodosGames()
    }, [])

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
                <img className='pontos' src='/assets/images/acoes/pontos.png' />
            </div>}
            {configcard == -200 &&
            <div onClick={()=> (setConfigcard(0))} className='card p selecionado'>
                <img className='pontos' src='/assets/images/acoes/pontos.png' />
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
                        id={item.produto_id}
                        nome={item.nome}
                        imagem={BuscarImagem(item.imagem_produto)}
                        lancamento={item.tamanho}
                        recarregarpage={true}
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