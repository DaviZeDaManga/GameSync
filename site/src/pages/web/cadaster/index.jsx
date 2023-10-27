import './index.scss';
export default function Cadaster(){

    return(
    
    <main id="Cadaster">
        <div class="box">
            <div class="img-box">
        
            </div>
            <div class="form-box">
                <h2>Criar Conta</h2>
                <p> Já é um membro? <a href="#"> Login </a> </p>
                <form action="#">
                    <div class="input-group">
                        <label for="nome"> Nome Completo</label>
                        <input type="text" id="nome" placeholder="Digite o seu nome completo" required/>
                    </div>

                    <div class="input-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" placeholder="Digite o seu email" required/>
                    </div>

                    <div class="input-group">
                        <label for="telefone">Telefone</label>
                        <input type="tel" maxLength={15} id="telefone" placeholder="Digite o seu telefone" required/>
                    </div>

                    <div class="input-group w50">
                        <label for="senha">Senha</label>
                        <input type="password" id="senha" placeholder="Digite sua senha" required/>
                    </div>

                    <div class="input-group w50">
                        <label for="Confirmarsenha">Confirmar Senha</label>
                        <input type="password" minLength={8} id="Confirmarsenha" placeholder="Confirme a senha" required/>
                    </div>

                    <div class="input-group">
                        <button>Cadastrar</button>
                    </div>

                </form>
            </div>
        </div>
    </main>
    )
  }