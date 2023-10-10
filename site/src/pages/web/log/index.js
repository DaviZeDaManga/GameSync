import './index.scss';


export default function LoginUser(){


    return(
        <div id="LoginUser">
            <main className='all'>

                <figure className='card'>
                    <div id='login'>
                        <form method="post" action="">
                            <p>
                                <label htmlFor="email_login">Seu e-mail</label>
                                <input id="email_login" name="email_login" required="required" type="text" placeholder="contato@htmlecsspro.com" />
                            </p>
                            <p>
                                <label htmlFor="senha_login">Sua senha</label>
                                <input id="senha_login" name="senha_login" required="required" type="password" placeholder="1234" />
                            </p>
                            <p>
                                <label htmlFor="senha_login">Repetir Senha</label>
                                <input id="senha_login" name="senha_login" required="required" type="password" placeholder="1234" />
                            </p>
                            <p>
                                <input type="checkbox" name="manterlogado" id="manterlogado" value="" />
                                <label htmlFor="manterlogado">Manter-me logado</label>
                            </p>
                            <p>
                               <button value="Logar">Login</button>
                            </p>
                            <p className="link">
                                <a href="#paracadastro">Não tem conta? Cadastre-se</a>
                            </p>
                        </form>
                    </div>
                </figure>
            </main>
        </div>
    )
}
