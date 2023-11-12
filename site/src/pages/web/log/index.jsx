import './index.scss';
import { useState, useRef, useEffect } from 'react';
import { LoginUser } from '../../../connection/userAPI';
import storage from 'local-storage';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';

export default function LoginUsuario(){
  
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

      if(err.response.status === 400){
          setErro(err.response.data.erro)
      }

      else{
          toast.error('Usuario não logado, tente novamente');
      }

  }
}
    return(
    
    <main id="Cadaster">
        <LoadingBar color='#f11946' ref={ref} /> 
   <section>

<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>

<div class="signin">
  <div class="content">
    <h2>Sign In</h2>
    <div class="form">
      <div class="inputBox">
        <input value={email} onChange={e => setEmail(e.target.value)} type="text" required/>
        <i>EMAIL</i>
      </div>
      <div class="inputBox">
        <input value={senha} onChange={e => setSenha(e.target.value)} type="password" required/>
        <i>Password</i>
      </div>
      <div class="links">
        <a href="#">Forgot Password</a>
        <a href="#">Signup</a>
      </div>
      <div class="inputBox">
        <input value="Logar" onClick={LoginUsuario} disabled={carregando} type="submit" />
      </div>
    </div>
    {erro && <div>{erro}</div>}
  </div>
</div>
</section>
    </main>
    )
  }