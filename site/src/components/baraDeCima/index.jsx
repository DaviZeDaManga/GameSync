import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import storage, { set } from 'local-storage';
import './index.scss'
import { motion } from 'framer-motion';
    
export default function BarraDeCima () {
    const navigate = useNavigate()

    const [lista, setLista] = useState (230)
    const [idprod, setIdprod] = useState ('')
    const [imguser, setImguser] = useState("")
    const [nome, setNome] = useState('')







    useEffect(() => {
        if(storage('user-logado')){
            const nomeUser = storage('user-logado');
            setNome(nomeUser.nome);

            const imguser = storage('user-logado')
            setImguser(imguser.img)
        }
        else{
            setNome('anonymous')
            
            setImguser('/assets/images/GameSync/User.png')
        }
    }, [])



    const [configcard, setConfigcard] = useState(0)

    return(
        <>

        <section className='perfil'>
            <p>{nome}</p>
            <Link to={`/perfil`}>
                <div className={`card ${imguser == '/assets/images/GameSync/User.png' && 'paddingzing'}`}>
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

        </>
    )
}