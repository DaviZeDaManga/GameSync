        import './index.scss';
        import AdmBarraLateral from '../../../components/AdminBarraL';
        import AdmBarraUp from '../../../components/AdminBarraUp';

        import storage from 'local-storage';
        import { CadastrarProduto, EnviarImagens, InserirCategoriaProduto, InserirVideo, BuscarImagem} from '../../../connection/productAPI';

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
            const [video, setVideo] = useState('');

            let [categoria, setCategoria ] = useState(0);
            var IDadmin
            let [idJogo, setIdjogo] = useState()
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

                            if(!video){
                                throw new Error('URL do trailer não inserida!')
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
                                setIdjogo(jogo)
                                console.log(jogo); // Verifique o valor de 'jogo' antes de acessar 'id'
                                //console.log(jogo.data.id); // Tente acessar 'id' apenas se 'jogo' for um objeto válido

                                const tb_categoria_produto = {
                                    categoria: categoria,
                                    produto: idJogo
                                }
                                
                                await InserirCategoriaProduto(tb_categoria_produto);
                                //console.log(tb_categoria_produto)

                                await EnviarImagens(idJogo, imagem);
                                // setIDadmin(jogo.IDadmin);
                                console.log(video)
                                await InserirVideo(idJogo, video);
                                
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
                    return BuscarImagem(imagem)
                }
            }

            function NovoClick(){
                setIdjogo();
                setNome('');
                setPreco(0);
                setprecoPro(0);
                setDestaque(false);
                setPromocao(false);
                setDisponivel(false);
                setQtd(0);
                setdescricao("");
                setClassificacao("");
                setLancamento("");
                setTamanho("");
                setempresa("");
                setdesenvlovedor("")
                setImagem()
                setVideo('')
                setCategoria(0)
                window.location.reload();
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
                                        <select value={categoria} onChange={e => setCategoria(parseInt(e.target.value, 10))}>
                                            <option value={1}>Ação</option>
                                            <option value={2}>Terror</option>
                                            <option value={3}>FPS</option>
                                            <option value={4}>RPG</option>
                                            <option value={5}>Souls Like</option>
                                            <option value={6}>Aventura</option>
                                            <option value={7}>Tiro</option>
                                            <option value={8}>Estratégia</option>
                                            <option value={9}>Esportes</option>
                                            <option value={10}>Corrida</option>
                                            <option value={11}>Quebra-cabeça</option>
                                            <option value={12}>Plataforma</option>
                                            <option value={13}>Simulação</option>
                                            <option value={14}>Luta</option>
                                            <option value={15}>Sobrevivência</option>
                                            <option value={16}>RTS</option>
                                            <option value={17}>Cartas</option>
                                            <option value={18}>Música</option>
                                            <option value={19}>MMO</option>
                                            <option value={20}>Mundo Aberto</option>
                                            <option value={21}>Sandbox</option>
                                            <option value={22}>História Interativa</option>
                                            <option value={23}>Educacional</option>
                                            <option value={24}>Visual Novel</option>
                                            <option value={25}>Battle Royale</option>
                                            <option value={26}>Rogue-like</option>
                                            <option value={27}>Construção</option>
                                        </select>
                                    </div>

                                    <div className="add-part1-negocio-msm">
                                        <input type="checkbox" value={1} onChange={e => setPromocao(parseInt(e.target.value))}/>
                                        <p>Promoção?</p>
                                    </div>

                                    <div className="add-part1-negocio-msm">
                                        <input type="checkbox" value={1} onChange={e => setDisponivel(parseInt(e.target.value))}/>
                                        <p>Disponivel?</p>
                                    </div>

                                    <div className="add-part1-negocio-msm">
                                        <input type="checkbox" value={1} onChange={e => setDestaque(parseInt(e.target.value))}/>
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

                                <div className="add-part2-imagem2">

                                    <input type="url" value={video} onChange={e => setVideo(e.target.value)}/>
                                    <img src="/assets/images/adm/video.png" alt="" />
                                    
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
                                <button onClick={NovoClick}>Novo Produto</button>
                            </section>

                            </figure>
                    </article>
                    </main>
                </div>
            )
        } 