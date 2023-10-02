import './index.scss'
import { Link } from 'react-router-dom'

export default function LinksPerfil(props){

    return(
        <header className='Change-links'>
        <div className='Change-links-a'>
            <Link to="/">
                <p>Informações Gerais</p>
            </Link>
            <Link to="/">
                <p>Favoritos</p>
            </Link>
            <Link to="/">
                <p>Meus pedidos</p>
            </Link>
            <Link to="/">
                <p>Atendimento ao Cliente</p>
            </Link>
            <Link to="/">
                <p>Devoluções</p>
            </Link>         
        </div>
        </header>
    )
}