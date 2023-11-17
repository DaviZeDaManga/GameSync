import './index.scss';
import { useNavigate, Link } from 'react-router-dom';
import storage from 'local-storage';
import { useState } from 'react';

export default function AdmBarraLateral(props){

    const navigate = useNavigate();

    function sairLogin(){
        storage.remove('admin-logado');
        navigate('/admin')
    }

    function SessionSelect(props) {
        if (props.opcoes === props.selecionado) {
            return 'selecionado';
        } else {
            return '';
        }
    }    

    return(
        <div id='AdmBarraLateral'>
        <nav className="all">
            <header className="title">
                <div className="title-conteudo">
                    <h1 class="animate__animated animate__flash">Game</h1>
                    <img src="/assets/images/GameSync/giphy-unscreen.gif" alt="" />
                    <h1 class="animate__animated animate__flash">Sync</h1>
                </div>
            </header>

            <section className="opcoes">
                <Link to='/admin/dashboard' className={`opcoes-z ${props.selecionado === 'dashboard' ? 'selecionado' : ''}`}>
                    <div className="opcoes-z">
                        <h1 class="animate__animated animate__backInLeft">DASHBOARD</h1>
                        <img src="/assets/images/adm/dashboard.png" alt="dashboard" />
                    </div>
                </Link>
                {/* Se a prop 'selecionado' for 'home', a classe 'selecionado' será aplicada */}
                <Link to='/admin/addproduts' className={`opcoes-z ${SessionSelect({ opcoes: 'addproduts', selecionado: props.selecionado })}`}>
                    <div className="opcoes-z">
                        <h1 class="animate__animated animate__backInLeft">ADD PRODUCTS</h1>
                        <img src="/assets/images/adm/add 2.png" alt="addproduts" />
                    </div>
                </Link>

                <Link to='' className={`opcoes-z ${props.selecionado === 'NEWS' ? 'selecionado' : ''}`}>
                    <div className="opcoes-z">
                        <h1 class="animate__animated animate__backInLeft">NEWS</h1>
                        <img src="/assets/images/adm/newspaper.png" alt="" />
                    </div>
                </Link>

                <Link to='/admin/MudarProduto' className={`opcoes-z ${SessionSelect({ opcoes: 'MudarProduto', selecionado: props.selecionado })}`}>
                    <div className="opcoes-z">
                        <h1 class="animate__animated animate__backInLeft">CHANGES</h1>
                        <img src="/assets/images/adm/mudar.png" alt="MudarProduto" />
                    </div>
                </Link>
            </section>

            <footer className="sair">
                <div className="sair-msm" onClick={sairLogin}>
                    <h1 class="animate__animated animate__fadeIn">Log Out</h1>
                    <img src="/assets/images/adm/sair 1.png" alt="" />
                </div>
            </footer>
        </nav>
    </div>
)
}
