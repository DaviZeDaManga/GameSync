import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import storage, { set } from 'local-storage';
import './index.scss'
import { motion } from 'framer-motion';
import { DadosCliente } from '../../connection/userAPI';
import { BuscarImagem } from '../../connection/produtosAPI';
    
export default function BarraDeCima () {
    const navigate = useNavigate()

    const [dados, setDados] = useState ([])
    const [idcliente, setIdcliente] = useState()
    const [nome, setNome] = useState('')

    async function Dados() {
        let resposta = await DadosCliente(idcliente)
        setDados(resposta)
    }

    useEffect(() => { 
        Dados()
    })





    useEffect(() => {
        if(storage('user-logado')){
            const opa = storage('user-logado');
            setNome(opa.nome)
            setIdcliente(opa.id)
        }
        else{
            setNome('anonymous')
        }
    })



    const [configcard, setConfigcard] = useState(0)




    function SairContaUser() {
        storage.remove("user-logado")
        window.location.reload()
    }





    const ref = useRef()

    function Navegar(destino, nome, id) {
        ref.current.continuousStart()

        if (destino == 1) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/produtos')
            }, 1500);
        }

        else if (destino == 2) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/')
            }, 1500);
        }

        else if (destino == 3) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/games')
            }, 1500);
        }

        else if (destino == 4) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/planos')
            }, 1500);
        }
        else if (destino == 6) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/produtos/${nome}/${id}`)
            }, 1500);
        }
    }

    return(
        <>

        <section className='perfil'>
            <p>{nome}</p>
            <Link to={`/perfil/${nome}`}>
                <div className={`card`}>
                    {dados.map( item =>
                        
                    <>
                    <img src={BuscarImagem(item.imagem)} />
                    </>    
                        
                    )}
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
            <div className='acoes'>
                <Link to={'/cadastro'}>
                    <button className='ac'>
                        Cadastrar
                    </button>
                </Link>
                <Link to={'/login'}>
                    <button className='ac'>
                        Login
                    </button>
                </Link>
                <button onClick={()=> (SairContaUser())}>
                    Sair
                </button>
            </div>

            <button>
                Meu Perfil
            </button>

            </motion.div>
        </section>

        </>
    )
}