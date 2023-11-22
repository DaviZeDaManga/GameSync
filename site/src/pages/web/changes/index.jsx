import './index.scss'
import { useState, useEffect } from 'react'
import BarraLateral from '../../../components/barraLateral'
import storage, { set } from 'local-storage';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

export default function MudarPerfil(){
    const [backgroundColor, setBackgroundColor] = useState('linear-gradient(130deg, rgba(206, 165, 60, 1), rgba(175, 64, 49, 1))');
    const [cor, setCor] = useState('linear-gradient(130deg, rgba(206, 165, 60, 1), rgba(175, 64, 49, 1))');

    const MudarCor = (NovaCor) => {
        setBackgroundColor(NovaCor);
    };




    const [imguser, setImguser] = useState("")
    const [nome, setNome] = useState('')

    useEffect(() => {
        if(storage('user-logado')){
            const nomeUser = storage('user-logado');
            setNome(nomeUser.nome);

            const imguser = storage('user-logado')
            setImguser(imguser.img)
        }
        else{
            setNome('anonymous')
            
            setImguser('/assets/images/GameSync/User.png')
        }
    }, [])



    const [fundo, setFundo] = useState('')
    const [escolhermasc, setEscolhermasc] = useState(false)
    const [mascote, setMascote] = useState('none')

    function EscolherMasc(masc) {
        setEscolhermasc(false)

        if (masc == 0) {
            setBackgroundColor('linear-gradient(130deg, rgba(206, 165, 60, 1), rgba(175, 64, 49, 1))')
            setCor('linear-gradient(130deg, rgba(206, 165, 60, 1), rgba(175, 64, 49, 1))')
            setMascote('none')
        }
        else if(masc == 1) {
           setMascote('/assets/images/mascotes/soniquin.gif')
           setCor('linear-gradient(120deg, rgb(0, 49, 128), rgb(0, 110, 255))')
           setFundo('/assets/images/fundosperfil/sonic.png')
           setBackgroundColor('linear-gradient(to bottom, rgba(0, 0, 0, 0.356), rgba(0, 0, 0, 0.356))')
        }
        else if(masc == 2) {
           setMascote('/assets/images/mascotes/thanos.gif')
           setCor('linear-gradient(130deg, rgb(52, 154, 76), rgb(60, 156, 92))')
           setFundo('/assets/images/fundosperfil/proerd.jpeg')
           setBackgroundColor('linear-gradient(to bottom, rgba(0, 0, 0, 0.356), rgba(0, 0, 0, 0.356))')
        }
        else if(masc == 3) {
           setMascote('/assets/images/mascotes/thanos.mp4')
           setCor('linear-gradient(130deg, rgb(154, 52, 154), rgb(60, 60, 156))')
           setFundo('/assets/images/fundosperfil/sonic.png')
           setBackgroundColor('linear-gradient(to bottom, rgba(0, 0, 0, 0.356), rgba(0, 0, 0, 0.356))')
        }
    }



    return(
        <div id='Change'>
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
                    modules={[EffectCoverflow]}
                    className="mySwiper"
                >

                    <SwiperSlide onClick={()=> (EscolherMasc(1))} className='eu'>
                        <img className='sonicimg' src='/assets/images/engine/sonic.png' />
                    </SwiperSlide>
                    
                    <SwiperSlide onClick={()=> (EscolherMasc(2))} className='dino'>
                        <img className='leaoimg' src='/assets/images/mascotes/leao.png' />
                    </SwiperSlide>
                    
                    <SwiperSlide onClick={()=> (EscolherMasc(3))} className='thanos'>
                        <img className='thanosimg' src='/assets/images/mascotes/thanos.png' />
                    </SwiperSlide>

                    <SwiperSlide onClick={()=> (EscolherMasc(0))} >
                        <img className='sair' src='/assets/images/login/add.png' />
                    </SwiperSlide>

                </Swiper>
            </section>
            }

            <nav className='Change-fundo' style={{"background": backgroundColor}}>
                <main className={`img ${imguser == '/assets/images/GameSync/User.png' && 'paddingzing'}`}>
                    <img src={imguser} />
                </main>
                {mascote != "none" &&
                <div className='videofoda'>
                    <img src={mascote}  />
                </div>}
                <img className='fundo' src={fundo} />
            </nav>

            <main className='informacoes'>
                <section className='dados'>
                    <section className='name'>
                        <h1>{nome}</h1>
                    </section>
                    <main className='desc'>

                    </main>
                    <section className='info'>
                        <button>Cadastrar</button>
                        <button>Entrar</button>
                    </section>
                </section>
                <section className='dados-perfil' style={{"background": cor}}>
                    <div>

                    </div>
                    <button onClick={() => (setEscolhermasc(true))}>Escolher mascote</button>
                </section>
            </main>
           

        </div>
    )
}