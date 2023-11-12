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

    return (
        <main id='EditarExcluir'>
          <AdmBarraLateral selecionado='MudarProduto' />

          {editar &&(
            <main id='editar'>
                <button onClick={Fechar} className='sair'>
                    <img src="/assets/images/acoes/remover.png" alt="" />
                </button>

                <section className='editar'>

                    <div className='nome'>

                    </div>

                </section>
               
            </main>
          )}

          {jogoSelecionado && (
            <main id='detalhes'>
                <button onClick={Fechar} className='sair'></button>
                 <section>
                    <article> {/*barra lateral*/}
                        
                    </article>

                    <article>  {/*conteudo do lado*/}
                        <section>

                        </section>
                    </article>
                </section>
            </main>
          )}
          
            <section className='cards'>
                {jogos.map(item => (

                <motion.div
                className='card'
                key={item.id}
                variants={cardVariants}
                initial='hidden'
                animate='visible'
                >
                    <div className='acoes'>
                        <img src='/assets/images/adm/pencil.png' alt='editar' onClick={e => { e.stopPropagation(); EditarJogo(item.produto_id)}} />
                        <img src='/assets/images/adm/trash.png' alt='remover' onClick={e => { e.stopPropagation(); RemoverJogo(item.produto_id, item.nome) }} />
                    </div>
                    <div className='card-L' onClick={() => SelecionarJogo(item.produto_id)}>
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