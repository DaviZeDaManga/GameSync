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
    const [backgroundColor, setBackgroundColor] = useState('linear-gradient(to bottom, rgba(206, 165, 60, 1), rgba(175, 64, 49, 1))');

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
            
            setImguser('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAsDSSKeuAFldRDZbOWFuVrdgdAcZf-S6Aw&usqp=CAU')
        }
    }, [])





    const [escolhermasc, setEscolhermasc] = useState(false)
    const [mascote, setMascote] = useState('none')

    function EscolherMasc(masc) {
        setEscolhermasc(false)

        if (masc == 0) {
            setBackgroundColor('linear-gradient(to bottom, rgba(206, 165, 60, 1), rgba(175, 64, 49, 1))')
            setMascote('none')
        }
        else if(masc == 1) {
           setMascote('/assets/videos/mascotes/sonic.mp4')
           setBackgroundColor('linear-gradient(to bottom, black, black)')
        }
        else if(masc == 2) {
           setMascote('/assets/videos/mascotes/leao.mp4')
           setBackgroundColor('linear-gradient(to bottom, black, black)')
        }
        else if(masc == 3) {
           setMascote('/assets/videos/mascotes/thanos.mp4')
           setBackgroundColor('linear-gradient(to bottom, black, black)')
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
                        <h1>Não quero!</h1>
                    </SwiperSlide>

                </Swiper>
            </section>
            }

            <nav className='Change-fundo' style={{"background": backgroundColor}}>
                <main className='img'>
                    <img src={imguser} />
                </main>
                {mascote != "none" &&
                <div className='videofoda'>
                    <video src={mascote} autoPlay loop></video>
                </div>}
            </nav>

            <main className='informacoes'>
                <section className='dados'>
                    {/* <section className='name'>
                        <h1>{nome}</h1>
                    </section>
                    <section className='desc'>
                        <p>Olá, seja bem-vindo a sua pagina do usuário, aqui você pode fazer diversas modificações no seu perfil, como escolher um mascote para te definir, alterar dados pessoais, e saber o status de algumas ações sua perante a GameSync</p>
                    </section> */}
                </section>
                <section onClick={() => (setEscolhermasc(true))} className='dados-perfil'>
                    <button>Escolher mascote</button>
                </section>
            </main>
           

        </div>
    )
}