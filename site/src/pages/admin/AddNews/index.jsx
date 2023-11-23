import React, { useState } from 'react';
import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import { toast } from 'react-toastify';






export default function Addnews() {

    const [imagem, setImagem] = useState(null);
    
  
    
    
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