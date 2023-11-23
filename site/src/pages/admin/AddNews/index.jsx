import React, { useState } from 'react';
import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import { toast } from 'react-toastify';
import storage, { set } from 'local-storage';

import { InserirNoticia, ImgNoticia } from '../../../connection/productAPI';
export default function Addnews() {

    const [imagem, setImagem] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [subtitulo, setSubTitulo] = useState('');
    const [texto, setTexto] = useState('')
    const [noticia, setnoticia] = useState(null)
    let IDadmin
  
    async function AdicionarNoticia() {
        try{
            const admLogado = storage('admin-logado');
            if(admLogado && admLogado.id){
                IDadmin = admLogado.id;

                if (IDadmin) {
                    if (!imagem) {
                        throw new Error('Imagem não selecionada!');
                    }
                    if (!titulo) {
                        throw new Error('O titulo não foi escrito');
                    }
                    if (subtitulo) {
                        throw new Error('O sub-titulo não foi escrito')
                    }
                    if (texto) {
                        throw new Error('O texto do corpo da nóticia não foi escrito')
                    }

                    const Noticia = {
                        titulo,
                        subtitulo,
                        texto,
                    }

                    const Add = await InserirNoticia(Noticia);
                    setnoticia(Add)
                }
            }
        }
        catch(err){

        }
    }
    
    return(
        <div id='add-main-addnews'>
            <AdmBarraLateral selecionado='NEWS' />

            <div className='add-news'>
                <div className='add-news2'>
                    <div className='add-news-cont'>
                        <div className='add-news-texts'>
                           <input className='Tittle'  type="text" placeholder='Titulo' /> 
                            <input className='SubTittle' type="text"placeholder='subtitulo'/> 
                             <input className='Text' type="text" placeholder='Texto'/> 
                        </div>
                        <div className='add-news-images'>
                            <label className='picture'>
                                {!imagem && 
                                <img src="/assets/images/adm/addimage.png"  className='imagem-capa' alt="" />
                                }
                                {
                                imagem && 
                                <img id='imagem-capa' src='' alt="" />
                                }
                                <input type="file" id="file" onChange={e => setImagem(e.target.files[0])}/>
                           
                            </label>
                            <footer className='botao'>
                               
                            </footer>
                        </div>
    
                     
                        
                    </div>
                    
                </div>
            </div>

        </div>
    )

}