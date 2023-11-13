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
                            <div className='title'><input  type="text" placeholder='Titulo' /> </div>
                            <div className='subtitle'> <input type="text"placeholder='subtitulo'/> </div>
                            <div className='Text'> <input type="text" placeholder='Texto'/> </div>
                        </div>
                        <div className='add-news-images'>aa</div>
                    </div>
                    
                </div>
            </div>

        </div>
    )






















}