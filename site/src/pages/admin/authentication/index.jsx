import './index.scss'
import { useState, useRef, useEffect } from 'react'
import { LoginAdm } from '../../../connection/adminAPI'
import storage from 'local-storage';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default function CadastroAdmin(){

    const [email, setEmail] = useState('');
    var   [senha, setSenha] = useState('');
    let   [codigo, setCodigo] = useState('');
    let   [erro, setErro] = useState('');
    var   [carregando, setCarregando] = useState(false)

    const navigate = useNavigate();
    const ref = useRef();

    useEffect(() => {
        if (storage('admin-logado')){
            navigate('/admin/dashboard')
        }
    }, [])

    async function LogAdmin(){

        ref.current.continuousStart();
        setCarregando(true);

        try{
            const r = await LoginAdm(email, senha, codigo);

            storage('admin-logado', r);

            setTimeout(() => {
                navigate('/admin/dashboard')
            }, 3000)
        }
        catch(err){
            console.log(err);
            ref.current.complete();
            setCarregando(false);

            if(err.response.status === 400){
                setErro(err.response.data.erro)
            }
        }
    }

    return(
        <div id='CadastroAdmin'>
            <LoadingBar color='#f11946' ref={ref} /> 

            <figure className='mae-formulario'>
                <div className='n-creio'>
                    <span className='borda2'></span>
                    <form>
                        <h1 class="animate__animated animate__lightSpeedInLeft">Login Admin</h1>
                        <div className='formulario'>
                            <input type="text" required="required" value={email} onChange={e => setEmail(e.target.value)}/>
                            <span class="animate__animated animate__fadeInTopLeft">Email</span>
                            <i></i>
                        </div>

                        <div className='formulario'>
                            <input type="password" required="required" value={senha} onChange={e => setSenha(e.target.value)}/>
                            <span class="animate__animated animate__fadeInTopRight">Senha</span>
                            <i></i>
                        </div>

                        <div className='formulario'>
                            <input type="text" required="required" value={codigo} onChange={e => setCodigo(e.target.value)}/>
                            <span class="animate__animated animate__fadeInBottomLeft">Codigo</span>
                            <i></i>
                        </div>

                        <div className="botao">
                            <button class="animate__animated animate__rubberBand" onClick={LogAdmin} disabled={carregando} >Entrar</button>
                            {erro && <div class="animate__animated animate__rubberBand" className="erro">{erro}</div>}
                        </div>
                    </form>
                </div>
            </figure>
        </div>
    )
}