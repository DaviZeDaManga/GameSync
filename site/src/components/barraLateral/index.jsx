import './index.scss'
import BarraDeCima from '../baraDeCima'
import { useNavigate } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BuscarImagem, BuscarItensCarrinho, BuscarItensSalvos } from '../../connection/produtosAPI';
import storage, { set } from 'local-storage';
import { toast } from 'react-toastify';
import { ExcluirCarrinho, ExcluirFavorito, InserirCarrinho, InserirMensagem, insirirImagemMensagem } from '../../connection/userAPI';
import { BuscarBatepapo, BuscarBatepapos, BuscarBatepaposMensagens } from '../../connection/batepapoAPI';
import EmojiPicker from 'emoji-picker-react';
import 'react-image-crop/src/ReactCrop.scss'


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

    function Navegar(destino, nome, id) {
        ref.current.continuousStart()

        if (destino == 1) {
            setTimeout(() => {
                ref.current.complete()
                navigate('/produtos')
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
                navigate(`/produtos/${nome}/${id}`)
            }, 1500);
        }
    }







    //acoes

    const [fundo, setFundo] = useState(false)

    const [menu, setMenu] = useState(0)
    const [pagetransform, setPagetransform] = useState(15)

    const [funcoes, setFuncoes] = useState(false)
    const [aparecer, setAparecer] = useState([])
    const [funcaoname, setFuncaoname] = useState("Algo")

    function Menu() {
        if (menu == 0) {
            setMenu(450)
        }
        if (menu == 450) {
            setMenu(0)
        }
    }

    function Funcao(qual) {
        if (funcoes == false) {
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
            setFuncaoname('')
            setFuncoes(false)
        }
    }

    //acoes configs
    useEffect(()=> {
        // mudar fundo
        
        if (menu == 450 || funcoes == true) {
            setFundo(true)
        }

        else {
            setFundo(false)
        }
    })

    //acoes das funcoes
    useEffect(() => {
        if (funcoes == true) {
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
            let aparecer = {
                barra: 0,
                barrinha: 0
            }
            setAparecer(aparecer)
        }
    })






    //acao carrinho

    const [funcaocarrinho, setFuncaocarrinho] = useState(false)
    const [aparecercarrinho, setAparecercarrinho] = useState([])

    function Carrinho() {
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
    }, [itenscarrinho])

    useEffect(()=> {
        for (let item of itenscarrinho) {
            setTotalcarrin(totalcarrin + Number(item.preco))
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
    }, [itenssalvos])

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
    }, [meusbatepapos])

    //buscar dados do batepapo
    const [batepapo, setBatepapo] = useState(0)
    const [dadosbatepapo, setDadosbatepapo] = useState([])

    async function DadosBatepapo() {
        try {
            let resposta = await BuscarBatepapo(batepapo, idcliente)
            setDadosbatepapo(resposta)
        }
        catch {
            toast.warning('Dados do Bate-papo nâo retornados!')
        }
    }

    useEffect(() => {
        DadosBatepapo()
    }, [dadosbatepapo])

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
    }, [mensagens])

    //inserir mensagem no batepapo
    const [mensagem, setMensagem] = useState('')
    const [imagemmensagem , setImagemmensagem] = useState(null)
    const [idmensagemselecionada, setIdmensagemselecionada] = useState(null)
    const [mensagemselecionada, setMensagemselecionada] = useState(null)
    const [nomemensagemselecionada, setNomemensagemselecionada] = useState(null)

    async function MandarMensagem() {
        try {
            let dados = {
                id_cliente: idcliente,
                id_batepapo: batepapo,
                mensagem: mensagem,
                id_mensagem_respondida: idmensagemselecionada,
                mensagem_respondida: mensagemselecionada
            }
            await InserirMensagem(dados)
            setMensagem('')
        }
        catch {
            if (mensagem == '') {
                toast.warning("Mensagem vazia!")
            }
            else {
                toast.warning('Erro ao enviar a mensagem')
            }
        }
        finally {
            setIdmensagemselecionada(null)
            setMensagemselecionada(null)
            setNomemensagemselecionada(null)
        }
    }

    //escolher imagem
    function EscolherImagemMensagem() {
        document.getElementById('flie_imagem_mensagem').click()
    }

    //mostrar imagem da mensagem
    function MostarImagemMensagem() {
        if (typeof imagemmensagem === 'object') {
            return URL.createObjectURL(imagemmensagem);
        } 
        else {
            return BuscarImagem(imagemmensagem);
        }
    }

    //editar imagem pare envio
    //arrumar
    const [crop, setCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })

    //insirir mensagem com foto
    async function MandarMensagemImagem() {
        try {

            if (mensagem == '') {
                let dados = {
                    id_cliente: idcliente,
                    id_batepapo: batepapo,
                    mensagem: "Apenas imagem",
                    id_mensagem_respondida: idmensagemselecionada,
                    mensagem_respondida: mensagemselecionada
                }
                const idmensagem = await InserirMensagem(dados)

                await insirirImagemMensagem(idmensagem, imagemmensagem)
            }

            else {
                let dados = {
                    id_cliente: idcliente,
                    id_batepapo: batepapo,
                    mensagem: mensagem,
                    id_mensagem_respondida: idmensagemselecionada,
                    mensagem_respondida: mensagemselecionada
                }
                const idmensagem = await InserirMensagem(dados)

                await insirirImagemMensagem(idmensagem, imagemmensagem)

                setMensagem('')
            }

        }
        catch {
            if (mensagem == '') {
                toast.warning("Mensagem vazia!")
            }
            else {
                toast.warning('Erro ao enviar a mensagem')
            }
        }
        finally {
            setIdmensagemselecionada(null)
            setMensagemselecionada(null)
            setNomemensagemselecionada(null)
            setImagemmensagem(null)
        }
    }

    //funcoes butao do batepapo
    function FuncoesBatepapo() {
        if (batepapo == 0) {
            toast.warning('Procurar pessoas')
        }
        else if (imagemmensagem == null) {
            MandarMensagem()
            toast.warning('enviar mensagem')
        }
        else if (imagemmensagem != null) {
            MandarMensagemImagem()
            toast.warning('enviar mensagem com imagem')
        }
    }

    //insirir audio ao batepapo







    const [emojiselect, setEmojiselect ] = useState(false)

    return ( 
        <>
            <LoadingBar color="#f11946" ref={ref} />
            <BarraDeCima/>

            <div className='PageTransform' style={{"left": "20%"}}></div>

            {fundo &&
            <div onClick={()=> (Funcao())} className='fundo'></div>}

            <motion.div 
            className='barralateral'
            animate={{
                x: menu,
                y: 0,
                scale: 1,
                rotate: 0,
            }}
            transition={{ type: "just" }}
            >
                <div className='meu-menu'></div>

                <main className='navegacao'>
                    {/* <div onClick={()=> (Menu())} className='abrirmenu'>
                        <img className={`${menu == 450 && "sairmenu"}`} src='/assets/images/acoes/seta-esquerda.png' />
                    </div> */}

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
                </main>
            </motion.div>





            <motion.div 
            className={`rgb ${menu == 450 && "menu"}`}
            animate={{
                x: 0,
                y: aparecer.barrinha,
                scale: 1,
                rotate: 0,
            }}
            transition={{ type: "just" }}>

            </motion.div>

            <motion.div 
            className={`funcoes ${menu == 450 && "menu"}`}
            animate={{
                x: 0,
                y: aparecer.barra,
                scale: 1,
                rotate: 0,
            }}
            transition={{ type: "just" }}
            >
                {emojiselect == true &&
                <div className='emoji'>
                    <EmojiPicker
                    height={380}
                    width={410}
                    theme='dark'
                    onEmojiClick={mensagem}
                    customEmojis={[
                    {
                        names: ['Sonic', 'sonic the game'],
                        imgUrl:
                        'https://i.imgur.com/3jjFzMv.gif',
                        id: 'sonic'
                    },]}
                    />
                </div>}

                {/* <div className={`funcoes-mensagens ${batepapo != 0 && 'aparecer'}`}>
                    <section className='card-funcoes-mensagens s'>
                        
                    </section>

                    <section className='card-funcoes-mensagens'>
                        <p>Enquete</p>
                    </section>
                    <section onClick={EscolherImagemMensagem} className='card-funcoes-mensagens'>
                        <p>Imagem</p>
                        <input type='file' id='flie_imagem_mensagem' onChange={e => setImagemmensagem(e.target.files[0])} />
                    </section>
                </div> */}

                {mensagemselecionada != null &&
                <section className='mensagem-selecionada'>
                    <h3>Respondendo ao {nomemensagemselecionada}</h3>
                    <p>{mensagemselecionada}</p>
                </section>
                }

                {imagemmensagem &&
                <div className='editar_imagem'>
                    <section className='imagem_mensagem'>
                        <img src={MostarImagemMensagem()} />
                    </section>
                    {/* <ReactCrop className='imagem_mensagem-crop' crop={crop} onChange={c => setCrop(c)}>
                        <img src={MostarImagemMensagem()} />
                    </ReactCrop> */}
                </div>}

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

                    <motion.div 
                    className='batepapo'
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

                        {item.id_cliente == idcliente &&
                            <>
                            {item.id_mensagem_respondida != null &&
                            <section className='mensagem-respondida'>
                                <p>{item.ds_mensagem_respondida}</p>
                            </section>
                            } 

                            <main onClick={()=> (setIdmensagemselecionada(item.id_mensagem), setNomemensagemselecionada(item.nm_cliente), setMensagemselecionada(item.ds_mensagem))} style={{"background": item.ds_cor}} className='mensagem'>
                                <img className={`${item.img_mensagem == null && 'semimagem'}`} src={BuscarImagem(item.img_mensagem)} />

                                <p>{item.ds_mensagem}</p>

                                <div className={`naolida ${item.bt_lida == true && 'lida'}`}></div>
                            </main>
                            </>
                        }

                        {item.id_cliente != idcliente &&
                            <>
                            {item.id_mensagem_respondida != null &&
                            <section className='mensagem-respondida'>
                                <p>{item.ds_mensagem_respondida}</p>
                            </section>
                            } 

                            <main onClick={()=> (setIdmensagemselecionada(item.id_mensagem), setNomemensagemselecionada(item.nm_cliente), setMensagemselecionada(item.ds_mensagem))} className='mensagem'>
                                <img className={`${item.img_mensagem == null && 'semimagem'}`} src={BuscarImagem(item.img_mensagem)} />

                                <p>{item.ds_mensagem}</p>

                                <div className={`naolida ${item.bt_lida == true && 'lida'}`}></div>
                            </main>
                            </>
                        }
                    </section>    
                        
                    )}

                    </motion.div>

                    <section className='enviar'>
                        <section className='enviar-mensagem'>
                            
                            <div onClick={()=> (setEmojiselect(!emojiselect))} className={`emojis ${emojiselect == true && 'selecionado'}`}>
                                <img src='/assets/images/acoes/feliz.png' />
                            </div>

                            {!imagemmensagem &&
                            <input type='text' placeholder='Mande uma mensagem! :)' onChange={(e) => (setMensagem(e.target.value))} value={mensagem}/>}

                            {imagemmensagem &&
                            <input type='text' placeholder='Escreva alguma legenda! ;)' onChange={(e) => (setMensagem(e.target.value))} value={mensagem}/>}
                        </section>
                        
                        <button className={`${batepapo != 0 && 'cubo'}`} onClick={()=> (FuncoesBatepapo())}>
                            {batepapo == 0 &&
                            <>
                            Procurar pessoas
                            </>
                            }
                        </button>
                        
                    </section>
                </div>
                }








                {funcaoname == "Carrinho" &&
                <section className='carrinho'>
                    <main className='itens'>
                        {itenscarrinho.map( item =>
                            
                            <section className='item'>
                                <section className='img'>
                                    <div className='ver'>
                                        <button onClick={()=> (Navegar(6, item.nome, item.id_produto))}>Ver produto</button>
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