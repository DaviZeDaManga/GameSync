import './index.scss';
import { useNavigate, Link} from 'react-router-dom';
import storage from 'local-storage';

export default function AdmBarraLateral(props){

    const navigate = useNavigate();

    function sairLogin(){
        storage.remove('admin-logado');
        navigate('/admin')
    }

    function SessionSelect(opcoes) {
        if(opcoes === props.selecionado)
        return 'selecionado'

        else return '';
    }

    return(
        <div id='mae'>
            <nav className="all">
                <header className="title">
                    <div className="title-conteudo">
                        <h1>Game</h1>
                        <img src="/assets/images/GameSync/giphy-unscreen.gif" alt="" />
                        <h1>Sync</h1>
                    </div>
                </header>

                <section className="opcoes">
                    <Link to='/admin/home' className={`opcoes-z ${props.selecionado === 'home' ? 'selecionado' : ''}`}>
                        <div className="opcoes-z">
                            <h1>DASHBOARD</h1>
                            <img src="/assets/images/adm/dashboard.png" alt="home" />
                        </div>
                    </Link>
                    {/* Se a prop 'selecionado' for 'home', a classe 'selecionado' será aplicada */}
                    <Link to='/admin/addproduts' className={`opcoes-z ${props.selecionado === 'addproduts' ? 'selecionado' : ''}`}>                    
                        <div className="opcoes-z">
                            <h1>ADD PRODUCTS</h1>
                            <img src="/assets/images/adm/add 2.png" alt="addproduts" />
                        </div>
                    </Link>

                    <div className="opcoes-z">
                        <h1>COMMENTS</h1>
                        <img src="/assets/images/adm/comment 1.png" alt="" />
                    </div>
                </section>

                <footer className="sair">
                    <div className="sair-msm" onClick={sairLogin}>
                        <h1>Log Out</h1>
                        <img src="/assets/images/adm/sair 1.png" alt="" />
                    </div>
                </footer>
            </nav>
        </div>
    )
}