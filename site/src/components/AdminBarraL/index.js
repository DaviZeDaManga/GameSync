import './index.scss';

export default function AdmBarraLateral(props){

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
                    <div className="opcoes-z">
                        <h1>DASHBOARD</h1>
                        <img src="/assets/images/adm/dashboard.png" alt="" />
                    </div>

                    <div className="opcoes-z">
                        <h1>ADD PRODUCTS</h1>
                        <img src="/assets/images/adm/add 2.png" alt="" />
                    </div>

                    <div className="opcoes-z">
                        <h1>COMMENTS</h1>
                        <img src="/assets/images/adm/comment 1.png" alt="" />
                    </div>
                </section>

                <footer className="sair">
                    <div className="sair-msm">
                        <h1>Log Out</h1>
                        <img src="/assets/images/adm/sair 1.png" alt="" />
                    </div>
                </footer>
            </nav>
        </div>
    )
}