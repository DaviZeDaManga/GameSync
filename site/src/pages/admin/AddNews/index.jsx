import React, { useState } from 'react';
import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import { toast } from 'react-toastify';


export default function Addnews() {




     return(

        <div id='add-main-addnews'>
            <AdmBarraLateral selecionado='NEWS' />

            <div className='add-news'>
                <div className='add-news2'>
                    <div className='add-news-cont'>
                        <div className='add-news-texts'>

                            <div className='border-addnews'>
                                <input className='text-1'  type="text" placeholder='Titulo' />
                                
                            </div>
                            <div className='spaceline-addnews'></div>

                            <div className='border-addnews'>
                                <input className='text-1' type="text"placeholder='subtitulo'/>
                                
                            </div>
                            <div className='spaceline-addnews'></div>

                            <div className='border-addnews'>
                                <input className='text-addnews' type="text" placeholder='Texto da Notícia'/>
                                
                            </div>
                            
                        </div>
                        <div className='add-news-images'>
                            <h1>adicione imagem da noticia</h1>
                            <img src="/assets/images/adm/addimg.png"  id='imagem-capa'/>   
                            <input className='addnews1' type="file" id="file"/>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>

    )






















}