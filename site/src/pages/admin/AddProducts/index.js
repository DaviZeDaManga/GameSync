import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import AdmBarraUp from '../../../components/AdminBarraUp';

import storage from 'local-storage';
import { CadastrarProduto, EnviarImagens, BuscarJodoID } from '../../../connection/productAPI';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom'
export default function AddProduct(){

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [precoPro, setprecoPro] = useState(0);
    const [destaque, setDestaque] = useState(false);
    const [promocao, setPromocao] = useState(false);
    const [disponivel, setDisponivel] = useState(false);
    var [qtd, setQtd] = useState(0);
    const [details, setDetails] = useState("");

    const [imagem, setImagem] = useState();

    let [categoria, setCategoria ] = useState(0);
    var [IDadmin, setIDadmin] = useState(0);

    const { idParam } = useParams();

    async function SalveClik(){

        try{
            const usuarioLogado = storage('admin-logado');
            console.log(usuarioLogado)
            if (usuarioLogado) {

                const admin = usuarioLogado.IDadmin;
        
                if (admin === 0) {

                    if(!imagem)
                    throw new Error('Imagem não selecionada!');

                    if(IDadmin === 0){
                        const jogo = await CadastrarProduto(nome, preco, precoPro, destaque, promocao, disponivel, qtd, details, categoria, admin);

                        const EnviarIMG = await EnviarImagens(jogo.IDadmin, imagem);
                        setIDadmin(jogo.IDadmin);

                        toast.success('Produto Gamer adicionado com SUCESSO!');
                    }
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
            } else {
              toast.error(err.message);
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
                                <input type="radio" value={promocao} onChange={e => setPromocao(e.target.value)}/>
                                <p>Promoção?</p>
                            </div>

                            <div className="add-part1-negocio-msm">
                                <input type="radio" value={disponivel} onChange={e => setDisponivel(e.target.value)}/>
                                <p>Disponivel?</p>
                            </div>

                            <div className="add-part1-negocio-msm">
                                <input type="radio" value={destaque} onChange={e => setDestaque(e.target.value)}/>
                                <p>Destaque?</p>
                            </div>

                            <div className="add-part1-negocio-nr">
                                <input type="number" placeholder='Estoque?' value={qtd} onChange={e => setQtd(e.target.value)}/>
                            </div>

                            </section>
                        </div>

                        <div className='texto-area'>
                          <textarea cols="40" rows="4" value={details} onChange={e => setDetails(e.target.value)} placeholder='Descrição do produto'></textarea>
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
                            <input type="file" onClick={mostarImagem}/>
                            <input type="file" onClick={mostarImagem}/>
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