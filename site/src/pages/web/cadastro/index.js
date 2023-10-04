import './index.scss'

import BarraLateral from '../../../components/barraLateral'


export default function Cadastro(){


return(

    <div id='Cadastro'>
        <BarraLateral/>

      

<div className="container" >
        <a class="links" id="paracadastro"></a>
        <a class="links" id="paralogin"></a>
  
     
            
        <div className='descricao'>
            <h1>
              Entrando com um novo login
            </h1>
            </div>    

         <div class="content">      
         

     

          <div id="login">
    
      
         
            <form method="post" action=""> 
        
              <p> 
                <label for="email_login">Seu e-mail</label>
                <input id="email_login" name="email_login" required="required" type="text" placeholder="contato@htmlecsspro.com"/>
              </p>
              
              <p> 
                <label for="senha_login">Sua senha</label>
                <input id="senha_login" name="senha_login" required="required" type="password" placeholder="1234" /> 
              </p>

              <p> 
                <label for="senha_login">Repetir Senha</label>
                <input id="senha_login" name="senha_login" required="required" type="password" placeholder="1234" /> 
              </p>
              
              <p> 
                <input type="checkbox" name="manterlogado" id="manterlogado" value="" /> 
                <label for="manterlogado">Manter-me logado</label>
              </p>
              
              <p> 
                <input type="submit" value="Logar" /> 
              </p>
              
              <p class="link">
                Ainda não tem conta?
                <a href="#paracadastro">Cadastre-se</a>
              </p>
            </form>

            
          </div>

        
    <div className='container-2'>
          <div id="cadastro">
            <form method="post" action=""> 
              
              <p> 
                <label for="nome_cad">Seu nome</label>
                <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="Luiz Augusto" />
              </p>
              
              <p> 
                <label for="email_cad">Seu e-mail</label>
                <input id="email_cad" name="email_cad" required="required" type="email" placeholder="contato@htmlecsspro.com"/> 
              </p>
              
              <p> 
                <label for="senha_cad">Sua senha</label>
                <input id="senha_cad" name="senha_cad" required="required" type="password" placeholder="1234"/>
              </p>
              
              <p> 
                <label for="senha_cad">Repetir Senha</label>
                <input id="senha_cad" name="senha_cad" required="required" type="password" placeholder="1234"/>
              </p>

              <p> 
                <label for="senha_cad">Cpf</label>
                <input id="senha_cad" name="senha_cad" required="required" type="number" placeholder="123.123.123-12"/>
              </p>

              <p> 
                <label for="senha_cad">Número</label>
                <input id="senha_cad" name="senha_cad" required="required" type="number" placeholder="(99) 12345-6789"/>
              </p>

              <p> 
                <input type="submit" value="Cadastrar"/> 
              </p>
              
              <p class="link">  
                Já tem conta?
                <a href="#paralogin"> Ir para Login </a>
              </p>
            </form>
          </div>
        </div>
        </div>
        

              

        <div className='imagem'>
<img src="/assets/images/login/Rectangle 865 (1).png" />







</div>
</div>
</div>

)

}