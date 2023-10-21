import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import AdmBarraUp from '../../../components/AdminBarraUp';

import storage from 'local-storage';
import { ListarTodosJogos } from '../../../connection/productAPI';

import { useState, useEffect } from 'react';
import {toast} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

export default function EditarExcluir(){

    var [jogos, setJogos] = useState([])
    
    async function CarregarTodosJogos(){
        const resposta = await ListarTodosJogos();
        setJogos(resposta)
    }

    useEffect(() => {
        CarregarTodosJogos();
    }, [])

    return(
        <main id='EditarExcluir'>
        
        <div className='container'>
        <AdmBarraUp/>
        <AdmBarraLateral/>

            <div className='conteudo'>
        
                <div className='card-container'>
                {jogos.map(item =>

                    <div className='comp-card'>
                        <div className='card' key={item.id} >{/*onclik para abrir detalhes depois/*/}
                            <div className='acoes'>

                                <img src='/assets/images/adm/pencil.png' alt='editar' />
                                
                                <img src='/assets/images/adm/trash.png' alt='remover' />
                                
                            </div>
                            <div>
                                <div className='sigla'>{item.nome.substr(0, 1)}</div>
                                <div className='filme'>{item.nome}</div>
                                <div className='lancamento'>{item.valor}</div>
                            </div>
                            <div>
                                <div className='avaliacao'>ESTOQUE: {item.estoque}</div>
                                <div className='disponivel'>DISPONÍVEL: {item.disponivel ? 'Sim' : 'Não'}</div>
                            </div>
                        </div>
                    </div>
                    )}

                    
                    
                    
                </div>


                
            </div>
        </div>
    </main>
    )
}