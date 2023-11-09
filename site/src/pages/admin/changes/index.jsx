    import './index.scss';
    import AdmBarraLateral from '../../../components/AdminBarraL';
    import AdmBarraUp from '../../../components/AdminBarraUp';

    import storage, { set } from 'local-storage';
    import { ListarTodosJogos, ExcluirProduto, BuscarJogoNome, AlterarProduto, AlterarVideo, AlterarCategoriaEmP, AlterarCategoriaEmCP, AlterarImage, BuscarImagem} from '../../../connection/productAPI';
    import { useNavigate } from 'react-router-dom';
    import { useState, useEffect } from 'react';
    import { toast } from 'react-toastify';
    import { confirmAlert } from 'react-confirm-alert';

    import { Swiper, SwiperSlide } from 'swiper/react';

    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';

    import { Mousewheel, Pagination, Navigation } from 'swiper/modules';

    import { motion, Variants } from 'framer-motion';

    export default function EditarExcluir(){
        const navigate = useNavigate();
        let [filtro, setFiltro] = useState('');
        var [jogos, setJogos] = useState([]);
        let [jogoSelecionado, setJogoSelecionado] = useState(null);
        const [adm, setAdm] = useState();
        let [editar, setEditar] = useState(null);

        //pegar informações do arry
        const [nome, setNome] = useState('');
        const [valor, setValor] = useState(0);
        const [promocao, setPromocao] = useState(false);
        const [destaque, setDestaque] = useState(false);
        const [EmPromocao, setEmPromocao] = useState(false);
        const [disponivel, setDisponivel] = useState(false);
        const [qtd, setQtd] = useState(0);
        const [descricao, setDescricao] = useState('');
        const [classificacao, setClassificacao] = useState('');
        const [lancamento, setLancamento] = useState('');
        const [tamanho, setTamanho] = useState(0);
        const [empresa, setEmpresa] = useState('');
        const [desenvolvedor, setDesenvolvedor] = useState('');
        const [categoria, setCategoria] = useState('');
        const [imagem, setImagem] = useState(null);
        const [video, setVideo] = useState('');

        async function filtrar(){  
            const resposta = await BuscarJogoNome(filtro);
            setJogos(resposta)
        }

        async function Enter(event) {
            if (event.key === "Enter") {
                const resposta = await BuscarJogoNome(filtro);
                if (resposta.length === 0) {
                    // ausência de resultados, mostra uma mensagem de erro.
                    toast.error("Nenhum jogo encontrado com esse nome.");
                } else {
                    // Caso contrário, atualize a lista de jogos.
                    setJogos(resposta);
                }
            }
        }    
    
        async function CarregarTodosJogos(){
            const resposta = await ListarTodosJogos();
            setJogos(resposta)
        }

        useEffect(() => {
            CarregarTodosJogos().then((jogosCarregados) => {
                if (jogosCarregados && jogosCarregados.length > 0) {
                    const Info = jogosCarregados[editar || jogoSelecionado];
        
                    // Defina as variáveis de estado com os valores de cada campo.
                    setNome(Info.nome);
                    setValor(Info.valor);
                    setPromocao(Info.promocao);
                    setDestaque(Info.destaque);
                    setEmPromocao(Info.EmPromocao);
                    setDisponivel(Info.disponivel);
                    setQtd(Info.estoque);
                    setDescricao(Info.descricao);
                    setClassificacao(Info.classificacao);
                    setLancamento(Info.lancamento);
                    setTamanho(Info.tamanho);
                    setEmpresa(Info.empresa);
                    setDesenvolvedor(Info.desenvolvedor);
                    setCategoria(Info.categoria_id);
                    setImagem(Info.imagem_produto);
                    setVideo(Info.video_url);
                }
            });
        }, []);
        console.log(valor)
        async function RemoverJogo(id, nome) {
            console.log("ID do Jogo a ser removido:", id);
            confirmAlert({
                title: 'Remover Jogo',
                message: `Você tem certeza que quer fazer isso? Excluir o jogo ${nome}.`,
                buttons: [
                    {
                        label: 'Sim!',
                        onClick: async () => {
                            console.log("ID dentro da função de remoção:", id);
                            await ExcluirProduto(id);
                            if (filtro === "") {
                                CarregarTodosJogos();
                            } else {
                                CarregarTodosJogos();
                                toast.dark("Jogo Removido💀");
                            }
                        }
                    },
                    {
                        label: 'Não'
                    }
                ]
            });
        }


        function SelecionarJogo(id) {
            setJogoSelecionado(id);
        }
    
        function Fechar() {
            setJogoSelecionado(null);
            setEditar(null)
            setX(0)
        }

        console.log(jogoSelecionado); 
        
        console.log(jogos[1])

        let [x, setX] = useState(0)
        var y = 0
        var rotate = 0
        console.log(editar)

        async function EditarJogo(id){
            setEditar(id)
            try{
                if (id !== 0) {
                    const idAdm = storage('admin-logado');
                    setAdm(idAdm.id)
                    await AlterarProduto(nome, valor, promocao, destaque, EmPromocao, disponivel, qtd, descricao, classificacao, 
                        lancamento, tamanho, empresa, desenvolvedor, categoria, adm);

                    await AlterarVideo(id,video )

                    await AlterarCategoriaEmP(id,categoria )

                    await AlterarCategoriaEmCP(id, categoria)

                    if (typeof(imagem) == 'object')
                        await AlterarImage(id, imagem);

                    ///mudar o comando de consulta no banco para os campos para poder editar
                    ///fazer um comando de update para cada um imagem, video,  categorablalala
                }
            }
            catch(err){

            }
        }

        return (
            <main id='EditarExcluir'>
                {jogoSelecionado && (   
                    <main id='mais'>

                        <motion.div className='sobre'
                        animate={{x, y, rotate}}
                        transition={{ type: "spring" }}>

                            <section className='secao-1'>
                                <SwiperSlide>
                                    <figure className='jogo-1'>
                                        <Swiper
                                            direction={'vertical'}
                                            slidesPerView={1}
                                            spaceBetween={0}
                                            mousewheel={true}
                                            pagination={{
                                            clickable: true,
                                            }}
                                            modules={[Mousewheel, Pagination]}
                                            className="mySwiper"
                                        >

                                            <SwiperSlide>
                                              <div className='jogo-1-um'>
                                                   <img src={jogoSelecionado.imagem_produto} alt="" />
                                                    
                                              </div>
                                            </SwiperSlide>

                                        </Swiper>

                                    </figure>
                                </SwiperSlide>
                            </section>

                            <section className='bene'>

                            </section>
                            <section className='bene'>

                            </section>

                        </motion.div>
                        
                        <section className='navegacao-swiper'>
                    
                            <button onClick={Fechar} className='sair'>
                                <img src='/assets/images/acoes/remover.png' />
                            </button>

                            {x == 0 &&
                            <button onClick={() => ( setX(-950))}>
                                Proximo
                            </button>
                            }   

                            {x == -950 &&
                            <>
                            <button onClick={() => ( setX(0))}>
                                Voltar
                            </button>
                            <button onClick={() => ( setX(-2200))}>
                                Proximo
                            </button>
                            </>
                            }

                            {x == -2200 &&
                            <>
                            <button onClick={() => ( setX(-950))}>
                                Voltar
                            </button>
                            <button onClick={() => ( setX(-3200))}>
                                Proximo
                            </button>
                            </>
                            }

                            {x == -3200 &&
                            <>
                            <button onClick={() => ( setX(-2200))}>
                                Voltar
                            </button>
                            <button onClick={() => ( setX(-3200))}>
                                Proximo
                            </button>
                            </>
                            }                   
                        </section>
                    </main>
                )}

                {editar &&(
                    <main id='editar'>
                        <h1>luis</h1>
                        <button onClick={Fechar} className='sair'>
                            <img src='/assets/images/acoes/remover.png' />
                        </button>
                    </main>
                )}
    
                <div className='container'>
                    <AdmBarraUp jogos={jogos} setJogos={setJogos} />
                    <AdmBarraLateral selecionado='MudarProduto' />
    
                    <div className='pesquisa'>
                        <input type="text" placeholder='Pesquise o nome do Jogo' value={filtro} onChange={e => setFiltro(e.target.value)} onKeyDown={Enter} />
                    </div>
    
                    <div className='conteudo'>
                        <div className='card-container'>
                            {jogos.map(item => (
                                <div className='comp-card' key={item.id}>

                                    <div className='card' onClick={() => SelecionarJogo(item.produto_id)}>

                                        <div className='acoes'>
                                            <img src='/assets/images/adm/pencil.png' alt='editar' onClick={e => { e.stopPropagation(); EditarJogo(item.produto_id)}} />
                                            <img src={BuscarImagem(item.imagem_produto)}/>{/*AQUI!!!!!!!!!*/}
                                            <img src='/assets/images/adm/trash.png' alt='remover' onClick={e => { e.stopPropagation(); RemoverJogo(item.produto_id, item.nome) }} />
                                        </div>

                                        <div>
                                            <div className='sigla'>{item.nome.substr(0, 1)}</div>
                                            <div className='filme'>{item.nome}</div>
                                            <div className='lancamento'>{item.valor}</div>
                                        </div>

                                        <div>
                                            {/* <div>  
                                                <iframe
                                                    width="350"
                                                    height="300"
                                                    src={item.video_url}
                                                    title="YouTube Video"
                                                    frameBorder="0"
                                                    allowFullScreen
                                                ></iframe></div> */}
                                            <div className='avaliacao'>ESTOQUE: {item.estoque}</div>
                                            <div className='disponivel'>DISPONÍVEL: {item.disponivel ? 'Sim' : 'Não'}</div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        )
    }