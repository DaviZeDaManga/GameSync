import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import AdmBarraUp from '../../../components/AdminBarraUp';

import storage from 'local-storage';
import { CadastrarProduto, EnviarImagens, BuscarJodoID, InserirCategoriaProduto } from '../../../connection/productAPI';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom'
export default function AddProduct(){

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [precoPro, setprecoPro] = useState(0);
    const [destaque, setDestaque] = useState(false);//falso
    const [promocao, setPromocao] = useState(false);//falso
    const [disponivel, setDisponivel] = useState(false);//falso
    var [qtd, setQtd] = useState(0);
    const [descricao, setdescricao] = useState("");
    let [classificacao, setClassificacao] = useState("");
    let [lancamento, setLancamento] = useState("");
    let [tamanho, setTamanho] = useState("");
    let [empresa, setempresa] = useState("");
    let [desenvolvedor, setdesenvlovedor] = useState('')

    const [imagem, setImagem] = useState();

    let [categoria, setCategoria ] = useState(0);
    var [IDadmin, setIDadmin] = useState();

    //console.log(IDadmin)
    async function SalveClik(){

        try{
            const usuarioLogado = storage('admin-logado');
            
            if (usuarioLogado && usuarioLogado.id) {

                IDadmin = usuarioLogado.id;
        
                if (IDadmin) {

                    if(!imagem){
                    throw new Error('Imagem não selecionada!');
                    }

                    // Verifica se o preço é maior que zero
                    if (preco <= 0) {
                        throw new Error('Preço do jogo inserido é obrigatório. Certifique-se de que o preço seja maior que zero.');
                    }

                        const produto = {
                            nome,
                            preco: parseFloat(preco),
                            precoPro: parseFloat(precoPro),
                            destaque: destaque ? 1 : 0,
                            promocao: promocao ? 1 : 0,
                            disponivel: disponivel ? 1 : 0,
                            qtd: parseInt(qtd, 10),
                            descricao,
                            categoria: parseInt(categoria, 10),
                            classificacao,
                            lancamento,
                            tamanho,
                            empresa,
                            desenvolvedor,
                            admin: IDadmin
                        };
            
                        const jogo = await CadastrarProduto(produto);
                        console.log(jogo.id);

                        const tb_categoria_produto = {
                            categoria: categoria,
                            produto: jogo.id
                        }

                        await InserirCategoriaProduto(tb_categoria_produto);
                        console(tb_categoria_produto)

                        await EnviarImagens(jogo.id, imagem);
                        // setIDadmin(jogo.IDadmin);

                        toast.success('Produto Gamer adicionado com SUCESSO!'); 
                }
                 
                else{
                toast.warning('Usuário logado não é um administrador.');
              }
            } 
            else{
                toast.error('Usuário não está logado.');
            }        
        }
        catch (err) {
            if (err.response) {
              toast.error(err.response.data.erro);
              console.log(err.response.data.erro) //////////aqui
            } else {
              toast.error(err.message);
              console.log()
            }
          }
    }

    function EscolherImagemDIV(){
        document.getElementById('file').click();
    }

    function mostarImagem(){
        if (typeof (imagem) == 'object') {
        return URL.createObjectURL(imagem);
        }
        else{
            return BuscarJodoID(imagem)
        }
    }
    //console.log(preco)
    return(
        <div id='add-main-addproduct'>
            <AdmBarraLateral selecionado='addproduts'/>
            <main className="all">
                <AdmBarraUp/>

               <article className="add">
                   <figure className="add-part1">

                        <div className="add-part1-nome">
                            <h3>Nome do Produto</h3>
                            <input type="text" value={nome} onChange={e => setNome(e.target.value)}/>
                        </div>

                        <div className="add-part1-valores">
                            <h1>Valor do Produto</h1>
                            <div className="add-part1-valores-vl">
                                <input type="number" placeholder='Preço Padrão' value={preco} onChange={e => setPreco(e.target.value)}/>
                                <input type="number" placeholder='Preço Promocional' value={precoPro} onChange={e => setprecoPro(e.target.value)}/>
                            </div>
                        </div>

                        <div className="add-part1-negocio">
                            <h1>Opções de Negócio</h1>

                            <section className="add-part1-negocio-checks">

                            <div className="add-part1-negocio-nr">
                                <input type="text" placeholder='Categoria?' value={categoria} onChange={e => setCategoria(e.target.value)}/>
                            </div>

                            <div className="add-part1-negocio-msm">
                                <input type="radio" value={1} onChange={e => setPromocao(parseInt(e.target.value))}/>
                                <p>Promoção?</p>
                            </div>

                            <div className="add-part1-negocio-msm">
                                <input type="radio" value={1} onChange={e => setDisponivel(parseInt(e.target.value))}/>
                                <p>Disponivel?</p>
                            </div>

                            <div className="add-part1-negocio-msm">
                                <input type="radio" value={1} onChange={e => setDestaque(parseInt(e.target.value))}/>
                                <p>Destaque?</p>
                            </div>

                            <div className="add-part1-negocio-nr">
                                <input type="number" placeholder='Estoque?' value={qtd} onChange={e => setQtd(e.target.value)}/>
                            </div>

                            <div className="add-part1-negocio-nr">
                                <input type="text" placeholder='classificação?' value={classificacao} onChange={e => setClassificacao(e.target.value)}/>
                            </div>

                            <div className="add-part1-negocio-nr">
                                <input type="date" placeholder='Data de lançamento' value={lancamento} onChange={e => setLancamento(e.target.value)}/>
                            </div>
                            
                            <div className="add-part1-negocio-nr">
                                <input type="text" placeholder='Em GB ou MB?' value={tamanho} onChange={e => setTamanho(e.target.value)}/>
                            </div>

                            <div className="add-part1-negocio-nr">
                                <input type="text" placeholder='Empresa que publico?' value={empresa} onChange={e => setempresa(e.target.value)}/>
                            </div>

                            <div className="add-part1-negocio-nr">
                                <input type="text" placeholder='desenvolvedor?' value={desenvolvedor} onChange={e => setdesenvlovedor(e.target.value)}/>
                            </div>

                            </section>
                        </div>

                        <div className='texto-area'>
                          <textarea cols="40" rows="4" value={descricao} onChange={e => setdescricao(e.target.value)} placeholder='Descrição do produto'></textarea>
                        </div>
                    </figure>


                    <figure className="add-part2">
                        <div className="add-part2-imagem1" onClick={EscolherImagemDIV}>
                            {!imagem && 
                                <img src="/assets/images/adm/photo.png" alt="" />
                            }
                            {
                            imagem && 
                            <img id='imagem-capa' src={mostarImagem()} alt="" />
                            }
                            <input type="file" id="file" onChange={e => setImagem(e.target.files[0])}/>

                        </div>

                        <div className="add-part2-imagem2" onClick={EscolherImagemDIV}>
                            {!imagem && 
                                <img src="/assets/images/adm/video.png" alt="" />
                            }
                            {
                            imagem && 
                            <img id='imagem-capa' src={mostarImagem()} alt="" />
                            }
                            
                        </div>

                        <div className="add-part2-imagem-selecionados">
                            <img src="/assets/images/adm/esta-bem.png" alt="" />
                            <h1>Arquivos Selecionados</h1>
                        </div>

                        <div className="add-part2-imagem3">
                            <input type="file" id="file" onChange={e => setImagem(e.target.files[0])}/>
                            
                        </div>

                    <section className='botao'>
                        <button onClick={SalveClik}>Adicionar produto</button>
                    </section>

                    </figure>
               </article>
            </main>
        </div>
    )
} 