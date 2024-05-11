import './index.scss'
import { useState, useEffect, useRef } from 'react'
import BarraLateral from '../../../components/barraLateral'
import storage, { set } from 'local-storage';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Keyboard } from 'swiper/modules';
import { BuscarMascoteCliente, DadosCliente, DeletarMascoteCliente, InserirMascoteCliente } from '../../../connection/userAPI';
import { BuscarImagem } from '../../../connection/produtosAPI';
import { toast } from 'react-toastify';
import LoadingBar from "react-top-loading-bar";
import Title from '../../../components/title';

export default function Perfil(){
    
    const [nome, setNome] = useState()
    const [id, setId] = useState()

    const dadosStorage = storage('user-logado');

    useEffect(() => {
        if(storage('user-logado')){
            setNome(dadosStorage.nome);
            setId(dadosStorage.id)
        }
        else{
            setNome('anonymous')
        }
    })

    const [fundo, setFundo] = useState()
    const [escolhermasc, setEscolhermasc] = useState(false)
    const [mascote, setMascote] = useState()
    const [dadosmascote, setDadosmascote] = useState([])
    const [dados, setDados] = useState([])
    const [backgroundColor, setBackgroundColor] = useState('linear-gradient(130deg, rgba(206, 165, 60, 1), rgba(175, 64, 49, 1))');

    async function Dados() {
        let resp = await DadosCliente(id)
        setDados(resp)
    }

    useEffect(() => {
        Dados()
    })

    const [idmascote, setIdmascote] = useState(0)

    async function Customizacao() {
        let resposta = await BuscarMascoteCliente(id)
        setDadosmascote(resposta)

        for (let item of dadosmascote) {
            setFundo(item.fundo)
            setMascote(item.gif)
            setIdmascote(item.id_tb_mascote_cliente)
        }

        if (idmascote == 0) {
            for (let item of dados) {
                setBackgroundColor(item.cor)
            }
        }
        else {
            for (let item of dadosmascote) {
                setBackgroundColor(item.cor)
            }
        }
    }

    useEffect(()=> {
        Customizacao()
    })




    // console.log(dadosmascote)
    const ref = useRef();

    async function DeletarMascote() {
        ref.current.continuousStart();

        try {
            await DeletarMascoteCliente(idmascote)
            toast.dark("Mascote removido com sucesso")
            ref.current.complete()

            setTimeout(() => {
                window.location.reload() 
            }, 2000);
        }
        catch {
            if (idmascote == 0) {
                toast.error("Voce não tem nenhum mascote selecionado")
                ref.current.complete();
            }
            else if (idmascote != 0) {
                toast.error("Parece que tem algo errado")
                ref.current.complete();
            }
        }
    }


    




    async function AdicionarMascote(idmasc) {
        ref.current.continuousStart()

        if (idmascote != 0) {
            try {
                await DeletarMascoteCliente(idmascote)
                toast.warning("Trocando seu mascote...")
                
                setTimeout(async () => {
                    await InserirMascoteCliente(idmasc, id)
                    toast.dark("Voce trocou seu mascote!")
                    ref.current.complete()
                    setEscolhermasc(false)
                }, 1500);
            }
            catch {
                toast.error("Ocorreu um erro ao trocar seu mascote")
                ref.current.complete();
            }
        }
        else {
            try {
                await InserirMascoteCliente(idmasc, id)
                toast.dark("Voce adicionou um mascote!")
                ref.current.complete()
                setEscolhermasc(false)
            }
            catch {
                toast.error("Ocorreu um erro ao adicionar um mascote")
                ref.current.complete();
            }
        }
    }

    return(
        <div className='Change PageTransform'>
            <LoadingBar color="#f11946" ref={ref} />
            <BarraLateral/>

            {escolhermasc == true &&
            <section className='mascotes'>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                    }}
                    keyboard={{
                        enabled: true,
                    }}
                    modules={[EffectCoverflow, Keyboard]}
                    className="mySwiper"
                >

                    <SwiperSlide onClick={()=> (AdicionarMascote(1))} className='sonic'>
                        <img className='sonicimg' src='/assets/images/engine/sonic.png' />
                    </SwiperSlide>

                    <SwiperSlide onClick={()=> (AdicionarMascote(2))} className='hulk'>
                        
                    </SwiperSlide>

                    <SwiperSlide onClick={()=> (DeletarMascote())} >
                        <img className='sair' src='/assets/images/login/add.png' />
                    </SwiperSlide>

                    <section className='useSetinha'>
                        <div className='seta'><img src='/assets/images/acoes/seta-esquerda.png' /></div>
                        <p>Use as teclas para navegação</p>
                        <div className='seta'><img className="direita" src='/assets/images/acoes/seta-esquerda.png' /></div>
                    </section>
                </Swiper>
            </section>
            }

            <Title
            nome={"Meu Perfil"}
            voltar={true}
            />

            <nav className='Change-fundo' style={{"background": backgroundColor}}>
                <main className={`img`}>
                    {dados.map( item => 
                        
                        <img src={BuscarImagem(item.imagem)} />    
                        
                    )}
                </main>

                {mascote != null &&
                <>
                <div className='mascote'>
                    <img src={mascote}  />
                </div>
                <img className='fundo' src={fundo} />
                <div className='filtro'></div>
                </>
                }

            </nav>

            <main className='informacoes'>
                <section className='dados'>
                    {/* <section className='name'>
                        <h1>{nome}</h1>
                    </section> */}
                    <main className='desc'>
                        <div className='linha-desc'></div>

                        <p>Olá, seja bem-vindo! Quer personalizar seu perfil para que as pessoas possam conhecer mais sobre voce? Edite o seu perfil! Voce pode fazer muitas coisas, como alterar sua descrição, adicionar um mascote que voce goste e que esteja disponivel, entre outros, se divirta! Para fazer edição dos dados basta apenas voce criar sua conta, acessa-la e depois procurar por alterar dados.</p>
                    </main>
                    <div className='acoes-dados'>
                        <button className='black'>Trocar conta</button>
                        <button>Alterar dados</button>
                    </div>
                </section>

                <section className='dados'>
                    
                </section>

                <section className='dados-perfil' style={{"background": backgroundColor}}>
                    <div>

                    </div>
                    {idmascote == 0 &&
                    <button onClick={() => (setEscolhermasc(true))}>Adicionar mascote</button>}

                    {idmascote != 0 &&
                    <button onClick={() => (setEscolhermasc(true))}>Trocar mascote</button>}
                </section>
            </main>

        </div>
    )
}