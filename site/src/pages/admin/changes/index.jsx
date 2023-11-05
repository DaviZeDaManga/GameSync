    import './index.scss';
    import AdmBarraLateral from '../../../components/AdminBarraL';
    import AdmBarraUp from '../../../components/AdminBarraUp';

    import storage from 'local-storage';
    import { ListarTodosJogos, ExcluirProduto, BuscarJogoNome, AlterarProduto, EnviarImagens, InserirCategoriaProduto, InserirVideo } from '../../../connection/productAPI';
    import { useNavigate } from 'react-router-dom';
    import { useState, useEffect } from 'react';
    import { toast } from 'react-toastify';
    import { confirmAlert } from 'react-confirm-alert';

    import { Swiper, SwiperSlide } from 'swiper/react';

    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';

    import { Mousewheel, Pagination, Navigation } from 'swiper/modules';


    export default function EditarExcluir(){
        const navigate = useNavigate()
        let [filtro, setFiltro] = useState('');
        var [jogos, setJogos] = useState([]);
        let [jogoSelecionado, setJogoSelecionado] = useState(null);
        const [adm, setAdm] = useState()

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
        console.log(Enter)
        async function CarregarTodosJogos(){
            const resposta = await ListarTodosJogos();
            setJogos(resposta)
        }

        useEffect(() => {
            CarregarTodosJogos();
        }, [])

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
        
        console.log(RemoverJogo)
        function EditarJogo(id){
            navigate(`/admin/alterar${id}`)
        }


        function SelecionarJogo(id) {
            setJogoSelecionado(id);
        }
    
        function FecharDetalhes() {
            setJogoSelecionado(null);
        }
        console.log(jogoSelecionado); // Adicione esta linha para depurar
        
        console.log(jogos[1])
        
        async function EditarJogo(id, nome, valor, promocao, destaque, Empromocao, disponivel, qtd, descricao, classificacao, lancamento, tamanho, empresa, desenvolvedor, categoria, imagem, video){
            try{
                if (id !== 0) {
                    const idAdm = storage('admin-logado');
                    setAdm(idAdm.id)
                    await AlterarProduto(nome, valor, promocao, destaque, Empromocao, disponivel, qtd, descricao, classificacao, lancamento, tamanho, empresa, desenvolvedor, categoria, adm);

                    await InserirCategoriaProduto 

                    if (typeof(imagem) == 'object')
                        await EnviarImagens(adm, imagem);

                    ///mudar o comando de colsilta no banco para os campos para poder editar
                    ///fazer um comando de update para cada um imagem, video,  categorablalala
                }
            }
            catch{

            }
        }

        return (
            <main id='EditarExcluir'>
                {jogoSelecionado && (
                    <main id='mais'>
                        <section className='mais'>
                            <button onClick={FecharDetalhes}><img src="/assets/images/acoes/remover.png" /></button>

                            <Swiper 
                            pagination={{
                                type: 'progressbar',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            direction={'vertical'}
                            className='mySwiper'
                            >

                                <SwiperSlide>
                                <article id='slide1'>
                                            <figure className='barraLateral'>
                                                <div>
                                                    <h1>Categoria</h1>
                                                     <h1><strong>{jogoSelecionado.nome}</strong></h1>
                                                    
                                                </div>
                                                
                                            </figure>
                                    </article>
                                </SwiperSlide>

                            </Swiper>
                            
                            {/* Renderizar o jogo selecionado */}
                            <div className='detalhes'>
                                {/* Conteúdo do jogo selecionado */}
                                {/* Você pode adicionar aqui as informações do jogo selecionado */}
                            </div>
                        </section>
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

                                    <div className='card' onClick={() => SelecionarJogo(item.id_produto)}>

                                        <div className='acoes'>
                                            <img src='/assets/images/adm/pencil.png' alt='editar' onClick={e => { e.stopPropagation(); EditarJogo(item.id_produto,item.nome,item.valor,
                                            item.promocao,item.destaque,item.EmPromocao,item.disponivel,item.estoque, item.descricao, item.classificacao, item.lancamento, item.tamanho, item.empresa,
                                            item.desenvolvedor,item.categoria, item.imagem, item.video ) }} />
                                            <img src='/assets/images/adm/trash.png' alt='remover' onClick={e => { e.stopPropagation(); RemoverJogo(item.id_produto, item.nome) }} />
                                        </div>

                                        <div>
                                            <div className='sigla'>{item.nome.substr(0, 1)}</div>
                                            <div className='filme'>{item.nome}</div>
                                            <div className='lancamento'>{item.valor}</div>
                                        </div>

                                        <div>
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