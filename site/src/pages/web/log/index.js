import './index.scss';
import { useState, useRef, useEffect } from 'react';
import { LoginUser } from '../../../connection/userAPI';
import storage from 'local-storage';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';

export default function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    let [erro, setErro] = useState('');
    var [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();
    const ref = useRef();

    useEffect(() => {
        if (storage('user-logado')){
            navigate('/')
        }
    }, []);

    async function LoginUsuario(){

        ref.current.continuousStart();
        setCarregando(true);
    
    try{
        const r = await LoginUser(email, senha);

        storage('user-logado', r);

        setTimeout(() => {
            navigate('/')
        } ,3000)
    }
    catch(err){
        ref.current.complete();
        setCarregando(false);
        toast.error(err.message);

        if(err.response.status === 401){
            setErro(err.response.data.erro)
        }

        else{
            navigate('/')
            toast.error('Usuario não logado, tente novamente');
        }

    }
}
    return(
        <div id="LoginUser">
            <LoadingBar color='#f11946' ref={ref} /> 

            <main className='all'>

                <figure className='card'>
                    <div id='login'>
                        <form method="post" action="">
                            <p>
                                <label htmlFor="email_login">Seu e-mail</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} name="email_login" required="required" type="text" placeholder="contato@htmlecsspro.com" />
                            </p>
                            <p>
                                <label htmlFor="senha_login">Sua senha</label>
                                <input value={senha} onChange={e => setSenha(e.target.value)} name="senha_login" required="required" type="password" placeholder="1234" />
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
                               <button value="Logar" onClick={LoginUsuario} disabled={carregando} >Login</button>
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
