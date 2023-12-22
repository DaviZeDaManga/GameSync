import './index.scss'
import BarraDeCima from '../baraDeCima'
import { Link, useNavigate } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BuscarImagem, BuscarItensCarrinho, BuscarItensSalvos } from '../../connection/produtosAPI';
import storage, { set } from 'local-storage';
import { toast } from 'react-toastify';
import { ExcluirCarrinho, ExcluirFavorito, InserirCarrinho } from '../../connection/userAPI';

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

    function Navegar(para, id) {
        ref.current.continuousStart()

        if (para == 1) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/pesquisar')
            }, 1500);
        }

        else if (para == 2) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/')
            }, 1500);
        }

        else if (para == 3) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/games')
            }, 1500);
        }

        else if (para == 4) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/planos')
            }, 1500);
        }
        else if (para == 6) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/produto/${id}`)
            }, 1500);
        }
        else if (para == 7) {
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
                setFuncaoname("Chat")
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
            for (let item of itenscarrinho) {
                setTotalcarrin(totalcarrin + Number(item.preco))
            }
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

    console.log(itenssalvos)






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