import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import AdmBarraUp from '../../../components/AdminBarraUp';

import storage, { set } from 'local-storage';
import { ListarTodosJogos, ExcluirProduto, BuscarJogoNome, AlterarProduto, AlterarVideo, AlterarCategoriaEmP, AlterarCategoriaEmCP, AlterarImage, BuscarImagem} from '../../../connection/productAPI';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';

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


    //console.log(valor)
    async function RemoverJogo(id, nome) {
        //console.log("ID do Jogo a ser removido:", id);
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

    //console.log(jogoSelecionado); 
    
    //console.log(jogos[1])

    let [x, setX] = useState(0)
    var y = 0
    var rotate = 0
    //console.log(editar)

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

    const cardVariants = {
        hidden: {
          opacity: 0,
          y: -100,
        },
        visible: {
          opacity: 1,
          y: 8,
          transition: {
            duration: 0.7,
            delay: 0.2,
          },
        },
      };

      console.log(jogos[1])

    return (
        <main id='EditarExcluir'>
          <AdmBarraLateral selecionado='MudarProduto' />

          {editar &&(
            <main id='editar'>
                 <button onClick={Fechar} className='sair'>
                    <img src="/assets/images/acoes/remover.png" alt="" />
                </button>

                <section className='all'>

                    <Swiper pagination={{
                    type: 'progressbar',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}>

                        <SwiperSlide>
                            <section className='alterar-first'>
                                <nav className='title'>
                                    <h1>Alterar Informações Gerais</h1>
                                </nav>

                                <header className='body'>

                                    <div className='items1'>
                                        <h1>Nome:</h1>
                                        <input type="text" placeholder='Corrija o nome do produto'/>
                                    </div>

                                    <div className='items1'>
                                        <h1>Categoria:</h1>
                                        <select >
                                            <option>Selecionar</option>
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

                                    <div className='items1'> 
                                        <h1>Classificação:</h1>
                                        <input type="text" placeholder='Corrija a classificação do produto'/>
                                    </div>

                                    <div className='items1'>
                                        <h1>Empresa:</h1>
                                        <input type="text" placeholder='Corrija o nome da Empresa do produto'/>
                                    </div>

                                    <div className='items1'>
                                        <h1>Desenvolvedor:</h1>
                                        <input type="text" placeholder='Corrija o nome do Desenvolvedora do produto'/>
                                    </div>

                                    <div className='items1'>
                                        <h1>Lançamento:</h1>
                                        <input type="date" placeholder='Corrija o nome do Desenvolvedora do produto'/>
                                    </div>

                                    <div className='items1'>
                                        <h1>Tamanho:</h1>
                                        <input type="text" placeholder='Corrija o nome do Desenvolvedora do produto'/>
                                    </div>

                                </header>
                            </section>
                        </SwiperSlide>

                        <SwiperSlide>
                            <section className='alterar-second'>
                                <nav className='title'>
                                    <h1>Informações de négocio</h1>
                                </nav>

                                <header className='body'>
                                    <div className='items2'>
                                        <h1>Estoque:</h1>
                                        <input type="number" />
                                    </div>

                                    <div className='items2-RADIO'>
                                       <div className='radio'>
                                            <h6>Disponivel:</h6>
                                            <input type='checkbox' />
                                       </div>

                                       <div className='radio'>
                                            <h6>Destaque:</h6>
                                            <input type='checkbox' />
                                       </div>

                                       <div className='radio'>
                                            <h6>Em Promoção:</h6>
                                            <input type='checkbox' />
                                       </div>
                                    </div>

                                    <div className='items2-preco'>
                                        <div className='preco'>
                                            <h1>Preço:</h1>
                                            <input type="number" />
                                        </div>

                                        <div className='preco'>
                                            <h1>Preço em Promoção:</h1>
                                            <input type="number" />
                                        </div>
                                    </div>
                                </header>
                            </section>
                        </SwiperSlide>

                        <SwiperSlide>
                            <section className='alterar-third'>
                                <nav>
                                    <h1>Detalhes Finais</h1>
                                </nav>

                                <header className=''>
                                    <div>
                                    <textarea cols='40' rows='4' placeholder='Descrição do Produto'></textarea>
                                    </div>

                                    <div>
                                        <input type="file" id="file"/>
                                    </div>
                                </header>

                                <footer>
                                    <input type="url"/>
                                </footer>
                            </section>
                        </SwiperSlide>
                    </Swiper>
                </section>
            </main>
          )}

          {jogoSelecionado && (
            <main id='detalhes'>

                <button onClick={Fechar} className='sair'> 
                    <img src="/assets/images/acoes/remover.png" alt="" />
                </button>

                <section className='all'>
                {jogos
                .filter(item => item.produto_id === jogoSelecionado)
                .map(selectedItem => (
                    
                    <Swiper
                    navigation={true}
                    modules={[ Navigation ]}
                    key={selectedItem.produto_id}
                    >
                        <SwiperSlide>
                            <section className='info-gerais'>
                                <aside className='barra'>
                                    <article className='info-jogo'>
                                       <h1>Informações Gerais</h1>

                                       <div className='coisas'>
                                            <h4>{selectedItem.nome}</h4>
                                            <h6>Gênero: {selectedItem.categoria_nome}</h6>
                                            <h6>{selectedItem.classificacao}</h6>
                                            <h6>{selectedItem.empresa}</h6>
                                            <h6>{selectedItem.desenvolvedor}</h6>
                                       </div>

                                        <h1>Informações de négocio</h1>

                                        <div className='negocio'>
                                            <h6>estoque: {selectedItem.estoque}</h6>
                                            <h6>Disponivel: {selectedItem.disponivel ? 'Sim' : 'Não'}</h6>
                                            <h6>Destaque: {selectedItem.destaque ? 'Sim' : 'Não'}</h6>
                                            <h6>Promoção: {selectedItem.EmPromocao ? 'Sim' : 'Não'}</h6>
                                        </div>
                                    </article>
                                </aside>

                                <figure className='principal'>
                                    <article className='img'>
                                        <img src={BuscarImagem(selectedItem.imagem_produto)} alt="" />
                                    </article>

                                    <article className='jogo'>
                                        <div className='preco'>
                                            <h6>Preço: {selectedItem.valor}</h6>
                                            <h6>Preço em Promoção: {selectedItem.promocao}</h6>
                                        </div>

                                        <div className='adicional'>
                                            <h6>Lacamento: {selectedItem.lancamento.substr(0, 10)}</h6>
                                            <h6>Estoque: {selectedItem.estoque}</h6>
                                        </div>
                                    </article>
                                </figure>
                            </section>
                        </SwiperSlide>

                        <SwiperSlide>
                           <section className='plus'>
                                <figure className='player'>
                                    <video controls="true">  <source src={selectedItem.video_url} type="video/mp4" /></video>
                                </figure>

                                <article className='descricao'>
                                    <p>{selectedItem.descricao}</p>
                                </article>
                           </section>
                        </SwiperSlide>

                    </Swiper>
                    ))}
                </section>

            </main>
          )}
          
            <section className='cards' >
                {jogos.map(item => (

                <motion.div
                className='card'
                key={item.id}
                variants={cardVariants}
                initial='hidden'
                animate='visible'
                onClick={() => SelecionarJogo(item.produto_id)}>
                    <div className='acoes'>
                        <img src='/assets/images/adm/pencil.png' alt='editar' onClick={e => { e.stopPropagation(); EditarJogo(item.produto_id)}} />
                        <img src='/assets/images/adm/trash.png' alt='remover' onClick={e => { e.stopPropagation(); RemoverJogo(item.produto_id, item.nome) }} />
                    </div>
                    <div className='card-L'>
                        <div className='Letra'>
                            <h1>{item.nome.substr(0, 1)}</h1>
                        </div>
                    </div>

                    <div className='conteudo1'>
                        <p>{item.nome}</p>
                        <p>{item.valor}</p>
                        <p>{item.tamanho}</p>
                        <p>{item.categoria}</p>
                    </div>

                     {/* <div>  
                                                <iframe
                                                    width="350"
                                                    height="300"
                                                    src={item.video_url}
                                                    title="YouTube Video"
                                                    frameBorder="0"
                                                    allowFullScreen
                                                ></iframe></div> */}

                    <div className='conteudo2'>
                        <p>ESTOQUE: {item.estoque}</p>
                        <p>DISPONÍVEL: {item.disponivel ? 'Sim' : 'Não'}</p>
                    </div>
                </motion.div>
                ))}
            </section>
        </main>
    )
}