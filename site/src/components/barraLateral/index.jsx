import './index.scss'
import BarraDeCima from '../baraDeCima'
import { Link, useNavigate } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BuscarImagem, BuscarItensCarrinho, BuscarItensSalvos } from '../../connection/produtosAPI';
import storage, { set } from 'local-storage';
import { toast } from 'react-toastify';
import { DadosCliente, ExcluirCarrinho, ExcluirFavorito, InserirCarrinho, InserirMensagem } from '../../connection/userAPI';
import { BuscarBatepapo, BuscarBatepapos, BuscarBatepaposMensagens } from '../../connection/batepapoAPI';



export default function BarraLateral() {
    const [idcliente, setIdcliente] = useState(0)

    const dadosStorage = storage('user-logado');

    useEffect(() => {
        if(storage('user-logado')){
            setIdcliente(dadosStorage.id)
        }
        else{
            setIdcliente(0)
        }
    })










    const navigate = useNavigate()
    const ref = useRef()

    function Navegar(destino, id) {
        ref.current.continuousStart()

        if (destino == 1) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/pesquisar')
            }, 1500);
        }

        else if (destino == 2) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/')
            }, 1500);
        }

        else if (destino == 3) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/games')
            }, 1500);
        }

        else if (destino == 4) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/planos')
            }, 1500);
        }
        else if (destino == 6) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/produto/${id}`)
            }, 1500);
        }
        else if (destino == 7) {
            setTimeout(() => {
                ref.current.complete()
                navigate("/pesquisar")
            }, 1500);
        }
    }







    //acoes

    const [fundo, setFundo] = useState(false)
    const [funcoes, setFuncoes] = useState(false)
    const [aparecer, setAparecer] = useState([])
    const [funcaoname, setFuncaoname] = useState("Algo")

    function Funcao(qual) {
        if (fundo == false) {
            setFuncoes(true) 

            if (qual == 1) {
                setFuncaoname("Chat Rapido")
            }
            else if (qual == 2) {
                setFuncaoname("Carrinho")
            }
            else if (qual == 3) {
                setFuncaoname("Salvos")
            }
        }  
        else {
            setFuncoes(false) 
            setFuncaoname("Algo")
        }  
    }





    //acao carrinho

    const [funcaocarrinho, setFuncaocarrinho] = useState(false)
    const [aparecercarrinho, setAparecercarrinho] = useState([])

    function Carrinho(parametro) {
        setFuncaocarrinho(!funcaocarrinho)
    }

    const [itenscarrinho, setItenscarrinho] = useState([])
    const [totalcarrin, setTotalcarrin] = useState(0)

    async function ItensCarrinho() {
        try {
            const resposta = await BuscarItensCarrinho(idcliente)
            setItenscarrinho(resposta)
        }
        catch {
            toast.warning("Nao estamos conseguindo retornar seus itens do carrinho")
        }
    } 

    useEffect(()=> {
        ItensCarrinho()
    })

    useEffect(()=> {
        for (let i = 0; i < itenscarrinho.length; i++) {
            
        }
    }, [itenscarrinho.length])

    async function DelItemCarrinho(iditem) {
        ref.current.continuousStart();

        try {
            await ExcluirCarrinho(iditem)
            toast.dark("Item do carrinho removido com sucesso")
            ref.current.complete()
        }
        catch {
            toast.error("Parece que deu algo errado")
            ref.current.complete();
        }
    }

    async function SalvarCarrinho(idproduto, idcliente) {
        ref.current.continuousStart();

        try {
            await InserirCarrinho(idproduto, idcliente)
            toast.dark("Item adicionado ao carrinho com sucesso")
            ref.current.complete()
        }
        catch {
            toast.error("Parece que deu algo errado")
            ref.current.complete();

        }
    }

    








    //acao salvos

    const [itenssalvos, setItenssalvos] = useState([])

    async function ItensSalvos() {
        try {
            const resposta = await BuscarItensSalvos(idcliente)
            setItenssalvos(resposta)
        }
        catch {
            toast.warning("Nao estamos conseguindo retonar seus itens salvos")
        }
    } 

    useEffect(()=> {
        ItensSalvos()
    })

    async function DelItemSalvos(iditem) {
        ref.current.continuousStart();

        try {
            await ExcluirFavorito(iditem)
            toast.dark("Item salvado removido com sucesso")
            ref.current.complete()
        }
        catch {
            toast.error("Parece que deu algo errado")
            ref.current.complete();
        }
    }

    async function ApagarTudoSalvos() {
        ref.current.continuousStart();

        try {
            for (let item of itenssalvos) {
                await ExcluirFavorito(item.id_favoritos)
            }

            toast.dark("Todos os itens foram removidos")
            ref.current.complete()
        }
        catch {
            toast.error("Parece que deu algo errado")
            ref.current.complete();
        }
    }

    async function AdicionarTudoAoCarrinhho() {
        ref.current.continuousStart();

        try {
            for (let item of itenssalvos) {
                await InserirCarrinho(item.id_produto, idcliente)
            }

            toast.dark("Todos os itens foram salvos no carrinho!")
            ref.current.complete()
        }
        catch {
            toast.error("Parece que deu algo errado")
            ref.current.complete()
        } 
    }






    //acoes configs

    useEffect(()=> {
        // qualquer acao

        if (funcoes == true) {
            setFundo(true)
            let aparecer = {
                barra: -850,
                barrinha: -7
            }
            setAparecer(aparecer)

            //acao carrinho

            if (funcaocarrinho == true) {
                let aparecercarrinho = {
                    subtotal: -290
                }
                setAparecercarrinho(aparecercarrinho)
            }
            else {
                let aparecercarrinho = {
                    subtotal: -50
                }
                setAparecercarrinho(aparecercarrinho)
            }
        }
        else {
            setFundo(false)
            let aparecer = {
                barra: 0,
                barrinha: 0
            }
            setAparecer(aparecer)
        }
    })






    ////batepapos

    //buscar batepapos
    const [meusbatepapos, setMeusbatepapos] = useState([])

    async function MeusBatepapos() {
        try {
            let resposta = await BuscarBatepapos(idcliente)
            setMeusbatepapos(resposta)
        }
        catch {
            toast.warning("Bate-papos nâo retornados!")
        }
    }

    useEffect(() => {
        MeusBatepapos()
    })

    //buscar dados do batepapo
    const [batepapo, setBatepapo] = useState(0)
    const [dadosbatepapo, setDadosbatepapo] = useState([])

    async function DadosBatepapo() {
        try {
            let resposta = await BuscarBatepapo(batepapo)
            setDadosbatepapo(resposta)
        }
        catch {
            toast.warning('Dados do Bate-papo nâo retornados!')
        }
    }

    useEffect(() => {
        DadosBatepapo()
    })

    //buscar mensagens de um batepapo
    const [aparecermensagens, setAparecermensagens] = useState(0)
    const [mensagens, setMensagens] = useState([])
    
    async function MensagensBatepapo() {
        try {
            let resposta = await BuscarBatepaposMensagens(batepapo)
            setMensagens(resposta)

        }
        catch {
            toast.warning("Mensagens do Bate-papo nâo retornados!")
        }  
    }

    useEffect(() => {
        MensagensBatepapo()

        if (batepapo != 0) {
            setAparecermensagens(-700)
        }
        else {
            setAparecermensagens(0)
        }
    })

    //inserir mensagem no batepapo
    const [mensagem, setMensagem] = useState('')

    async function MandarMensagem() {
        try {
            let dados = {
                id_cliente: idcliente,
                id_batepapo: batepapo,
                mensagem: mensagem
            }
            await InserirMensagem(dados)

            setMensagem('')
        }
        catch {
            toast.warning('Erro ao enviar a mensagem')
        }
    }

    return ( 
        <>
            <LoadingBar color="#f11946" ref={ref} />
            <BarraDeCima/>

            {fundo &&
            <div onClick={()=> (Funcao())} className='fundo'></div>}

            <section className='barralateral'>
                <div onClick={()=> (Navegar(1))} className='navigation'>
                    <img src="/assets/images/barralateral/navegar/lupa.png" />
                </div>
                <div onClick={()=> (Navegar(2))} className='navigation'>
                    <img src="/assets/images/barradecima/bolsa-de-compras.png" />
                </div>
                <div onClick={()=> (Navegar(3))} className='navigation'>
                    <img src="/assets/images/barradecima/controle-de-video-game.png" />
                </div>
                <div onClick={()=> (Navegar(4))} className='navigation'>
                    <img src="/assets/images/barradecima/balao-de-fala.png" />
                </div>

                <div className='linha'></div>

                <div onClick={()=> (Funcao(1))} className={`navigation ${funcaoname == "Chat" && 'selecionado'}`}>
                    <img src="/assets/images/carrinho/bot.png" />
                </div>
                <div onClick={()=> (Funcao(2))} className={`navigation ${funcaoname == "Carrinho" && 'selecionado'}`}>
                    <img src="/assets/images/carrinho/carrinho.png" />
                    {/* {itenscarrinho.length != 0 &&
                    <div className='bolinha'></div>
                    } */}
                </div>
                <div onClick={()=> (Funcao(3))} className={`navigation ${funcaoname == "Salvos" && 'selecionado'}`}>
                    <img src="/assets/images/barralateral/coracao.png" />
                    {/* {itenssalvos.length != 0 &&
                    <div className='bolinha'></div>
                    } */}
                </div>
            </section>





            <motion.div 
            className='rgb'
            animate={{
                x: 0,
                y: aparecer.barrinha,
                scale: 1,
                rotate: 0,
            }}
            transition={{ type: "just" }}>

            </motion.div>

            <motion.div 
            className='funcoes'
            animate={{
                x: 0,
                y: aparecer.barra,
                scale: 1,
                rotate: 0,
            }}
            transition={{ type: "just" }}
            >
                <section className='nome'>
                    <h1>{funcaoname}</h1>
                </section>

                <div onClick={()=> (setBatepapo(0))} className={`voltar ${batepapo != 0 && 'aparecer'}`}>
                    <img src='/assets/images/acoes/seta-esquerda.png' />
                </div>

                {dadosbatepapo.map( item => 
                <div style={{"background": item.cor}} className={`perfil-contato ${batepapo != 0 && 'aparecer'}`}>
                    <div className='foto'>
                        <img src={BuscarImagem(item.img)} />   
                    </div>
                </div>
                )}

                {funcaoname == "Chat Rapido" &&
                <div className='chat'>

                    <div className='batepapos'>

                        <section className='help'>

                        </section>
                        <section className='contatos'>

                            {meusbatepapos.map( item => 
                                
                            <section onClick={()=> (setBatepapo(item.id_batepapo))} className='contato'>
                                <div className='img'>
                                    <img src={BuscarImagem(item.img)} />
                                </div>

                                <div className='dados'>
                                    <p>{item.nome}</p>
                                </div>
                            </section>    
                                
                            )}

                        </section>

                    </div>

                    <motion.div className='batepapo'
                    animate={{
                        x: 0,
                        y: aparecermensagens,
                        y: aparecermensagens,
                        scale: 1,
                        rotate: 0,
                    }}
                    transition={{ type: "just" }}
                    >

                    {mensagens.map( item =>
                        
                    <section className={`bloco-mensagem ${item.id_cliente == idcliente && 'minhamensagem'}`}>
                        <main className='mensagem'>
                            <p>{item.ds_mensagem}</p>

                            <div className={`naolida ${item.bt_lida == true && 'lida'}`}></div>
                        </main>
                    </section>    
                        
                    )}

                    </motion.div>

                    <motion.button
                    animate={{
                        x: aparecermensagens,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                    }}
                    transition={{ type: "just" }}
                    >
                    Procurar por pessoas
                    </motion.button>

                    <motion.div
                    className='enviar'
                    animate={{
                        x: aparecermensagens,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                    }}
                    transition={{ type: "just" }}
                    >
                        <input type='text' onChange={(e) => (setMensagem(e.target.value))} value={mensagem}/>
                        <button onClick={()=> (MandarMensagem())}></button>
                    </motion.div>
                </div>
                }








                {funcaoname == "Carrinho" &&
                <section className='carrinho'>
                    <main className='itens'>
                        {itenscarrinho.map( item =>
                            
                            <section className='item'>
                                <section className='img'>
                                    <div className='ver'>
                                        <button onClick={()=> (Navegar(6, item.id_produto))}>Ver produto</button>
                                    </div>
                                    <img src={BuscarImagem(item.img_produto)} />
                                </section>

                                <section className='info'>
                                    <h1>{item.nome}</h1>
                                    <p>{item.descricao}</p>
                                    <h1>{item.preco}</h1>
                                </section>

                                <button onClick={()=> (DelItemCarrinho(item.id_pedido_item))} className='delete'>
                                    Apagar
                                </button>
                            </section>    
                            
                        )}

                       {itenscarrinho.length == 0 &&
                        <section className='vazio'>
                            <img src='/assets/images/GameSync/logo.png'/>
                        </section>
                        }
                    </main>

                    <div className='acoes-carrinho'>
                        <motion.div 
                        className='acoes'
                        animate={{
                            x: 0,
                            y: aparecercarrinho.subtotal
                        }}
                        transition={{ type: "just" }}
                        >
                            <div onClick={()=> (Carrinho())} className='aparecer'>
                                <p>Ver subtotal</p>
                            </div>

                            <div className='subtotal'>
                                <h1>Subtotal</h1>
                                <h1>R${totalcarrin}</h1>
                            </div>
                            <div className='infocartao'>

                            </div>
                            <div className='infopix'>

                            </div>
                        </motion.div>
                        <button>Finalizar Carrinho</button>
                    </div>
                </section>}







                {funcaoname == "Salvos" &&
                <section className='salvos'>
                    <main className='itens'>
                        {itenssalvos.map( item =>
                            
                            <section className='item'>
                                <section className='img'>
                                    <div className='ver'>
                                        <button onClick={()=> (Navegar(6, item.id_produto))}>Ver produto</button>
                                    </div>
                                    <img src={BuscarImagem(item.img_produto)} />
                                </section>

                                <section className='info'>
                                    <h1>{item.nome}</h1>
                                    <p>{item.descricao}</p>
                                    <h1>{item.preco}</h1>
                                </section>

                                <button onClick={()=> (SalvarCarrinho(item.id_produto, item.id_cliente))} className='add'>
                                    Carrinho
                                </button>
                                <button onClick={()=> (DelItemSalvos(item.id_favoritos))} className='delete'>
                                    Apagar
                                </button>
                            </section>    
                            
                        )}

                        {itenssalvos.length == 0 &&
                        <section className='vazio'>
                            <img src='/assets/images/GameSync/logo.png'/>
                        </section>
                        }
                    </main>

                    <div className='acoes-salvos'>
                        <div className='acoes'>
                            {itenssalvos.length != 0 &&
                            <>
                            <button onClick={()=> (AdicionarTudoAoCarrinhho())}>
                                Adicionar tudo no carrinho
                            </button>
                            <button onClick={()=> (ApagarTudoSalvos())}>
                                Apagar tudo
                            </button>
                            </>
                            }
                        </div>
                        
                        {itenssalvos.length == 0 &&
                        <button onClick={()=> (Navegar(7))}>Procurar por jogos</button>
                        }
                        {itenssalvos.length != 0 &&
                        <button onClick={()=> (Navegar(7))}>Procurar por mais jogos</button>
                        }
                    </div>
                </section>}
            </motion.div>
        </>
    )
}