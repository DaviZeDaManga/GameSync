import { useEffect, useState, useRef } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { CadastrarCliente, InserirFotoPerfil, LoginCliente } from "../../../connection/userAPI";
import storage, { set } from 'local-storage';
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import { BuscarImagem } from "../../../connection/produtosAPI";

export default function CadastroUser() {
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()
  const [rsenha, setRsenha] = useState()
  const [telefone, setTelefone] = useState()
  const [cpf, setCpf] = useState()
  const [cor, setCor] = useState()
  const [ccor, setCcor] = useState()
  const [imagem, setImagem] = useState(null)

  useEffect(() => {
    if (cor == "Azul") {
      setCcor("linear-gradient(120deg, rgb(26, 88, 189), rgb(11, 77, 134))")
    }
    else if (cor == "Roxo") {
      setCcor("linear-gradient(120deg, rgb(91, 50, 166), rgb(84, 29, 113))")
    }
    else if (cor == "Vermelho") {
      setCcor("linear-gradient(120deg, rgb(162, 49, 47), rgb(113, 29, 29))")
    }
    else if (cor == "Verde") {
      setCcor("linear-gradient(120deg, rgb(50, 166, 53), rgb(29, 113, 49))")
    }
  }, [cor])











  const ref = useRef();

  async function Cadastrar() {
      ref.current.continuousStart();

      try {
        await CadastrarCliente(nome, telefone, cpf, email, senha, ccor)

        setTimeout(async () => {
            const r = await LoginCliente(email, senha)

            if (storage("user-logado")) {
                storage.remove("user-logado")
                storage("user-logado", r)
                
                setTimeout(async () => {
                  await InserirFotoPerfil(r.id, imagem)

                  window.history.back()

                  ref.current.complete()
                  toast.dark("Seja bem-vindo(a) á GameSync")
                }, 1000);
            }
            else {
                storage("user-logado", r)
               
                setTimeout(async () => {
                  await InserirFotoPerfil(r.id, imagem)
                  window.history.back()

                  ref.current.complete()
                  toast.dark("Seja bem-vindo(a) á GameSync")
                }, 1000);
            }
        }, 1500);

      } catch {
          toast.error("Parece que tem algo errado")
      }
  }



  const [verificacao, setVerificacao] = useState(false)
  const [verificardados, setVerificardados] = useState(true)
  const [verificarsenha, setVerificarsenha] = useState(false)

  function Verificacao() {
    if (nome != '' && email != '' && senha != '' && rsenha != '' && telefone != '' && cpf != '' && cor != '' && senha == rsenha) {
      setVerificacao(true)
    }
    else {
      setVerificacao(false)
    }
  }

  useEffect(() => {
    Verificacao()
  }, [])





  function Adicionarimagem() {
      document.getElementById("file").click()
  }

  function MostrarImagem() {
    if (typeof imagem === 'object') {
      return URL.createObjectURL(imagem)
    }
    else {
       return BuscarImagem(imagem)
    }
  }






  const [posicaoimg, setPosicaoimg] = useState("0px 0px")
  const [posicaocard, setPosicaocard] = useState("0px 0px")

  useEffect(() => {
     if (imagem != null) {
       setPosicaocard("-190px 0px")
       setPosicaoimg("190px 0px")
     }
     else {
      setPosicaocard("0px 0px")
      setPosicaoimg("0px 0px")
     }
  })

  return (
    <main id="Cadaster">
      <LoadingBar color="#f11946" ref={ref} />

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

        <div className="mostrarimagem" style={{"translate": posicaoimg}}>
            <div className="img"> 
              {imagem != null &&
              <img id="imagem-capa" src={MostrarImagem()} alt="" />
              }
            </div>
        </div>

        <div class="signin" style={{"translate": posicaocard}}>

          <div class="content">
            <h2>Cadastrar</h2>
            <div class="form">

            <div class="inputBox">
                <input type="text" required onChange={(e)=> setNome(e.target.value)} value={nome}/>
                <i>Nome</i>
              </div>
              <div class="inputBox">
                <input type="text" required onChange={(e) => setEmail(e.target.value)} value={email}/>
                <i>Email</i>
              </div>
              <div class="inputBox">
                <input type="password" required onChange={(e) => setSenha(e.target.value)} value={senha}/>
                <i>Senha</i>
              </div>
              <div class="inputBox">
                <input type="password" required onChange={(e) => setRsenha(e.target.value)} value={rsenha}/>
                <i>Repitir Senha</i>
              </div>
              <div class="inputBox">
                <input type="number" required onChange={(e) => setTelefone(e.target.value)} value={telefone}/>
                <i>Telefone</i>
              </div>
              <div class="inputBox">
                <input type="text" required onChange={(e) => setCpf(e.target.value)} value={cpf}/>
                <i>CPF</i>
              </div>
              <div class="inputBox">
                <select onChange={(e) => setCor(e.target.value)}>
                  <option>Escolher</option>
                  <option value={cor}>Roxo</option>
                  <option value={cor}>Azul</option>
                  <option value={cor}>Vermelho</option>
                  <option value={cor}>Verde</option>
                </select>
              </div>

              {imagem == null &&
              <button className="escolherimg" onClick={Adicionarimagem}>Adicionar imagem</button>
              }
              {imagem != null &&
              <button className="escolherimg" onClick={Adicionarimagem}>Trocar imagem</button>
              }
              <input id="file" type="file" required onChange={e => setImagem(e.target.files[0])}/>

              <div class="links">
                <Link to={'/login'}>
                <a href="#">Ja tenho uma conta</a>
                </Link>
              </div>
              <div class="inputBox">
                
                {verificacao == false &&
                <button className="cadastrar">
                  Informe os dados
                </button>}

                {verificacao &&
                <button onClick={()=> (Cadastrar())} className="cadastrar">
                  Cadastrar
                </button>}

              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
