import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import AdmBarraUp from '../../../components/AdminBarraUp';

import storage from 'local-storage';
import { ListarTodosJogos, ExcluirProduto, BuscarJogoNome } from '../../../connection/productAPI';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

export default function EditarExcluir(){
    
    let [filtro, setFiltro] = useState('');
    var [jogos, setJogos] = useState([]);

    async function filtrar(){  
        const resposta = await BuscarJogoNome(filtro);
        setJogos(resposta)
    }

    async function Enter(event) {
        if (event.key === "Enter") {
            const resposta = await BuscarJogoNome(filtro);
            if (resposta.length === 0) {
                // ausência de resultados, mostra uma mensagem de erro.
                toast.error("Nenhum jogo encontrado com esse nome.");
            } else {
                // Caso contrário, atualize a lista de jogos.
                setJogos(resposta);
            }
        }
    }    
    console.log(Enter)
    async function CarregarTodosJogos(){
        const resposta = await ListarTodosJogos();
        setJogos(resposta)
    }

    useEffect(() => {
        CarregarTodosJogos();
    }, [])

    async function RemoverJogo(id, nome) {
        confirmAlert({
            title: 'Remover Jogo',
            message: `Você tem certeza que quer fazer isso? Excluir o jogo ${nome}.`,
            buttons: [
                {
                    label: 'Sim!',
                    onClick: async () => {
                        await ExcluirProduto(id, nome);
                        if (filtro === "") {
                            CarregarTodosJogos();
                        } else {
                            CarregarTodosJogos();
                            toast.dark("Jogo Removido💀");
                        }
                    }
                },
                {
                    label: 'Não'
                }
            ]
        });
    }
    

    return(
        <main id='EditarExcluir'>
        
        <div className='container'>
        <AdmBarraUp jogos={jogos} setJogos={setJogos} />
        <AdmBarraLateral selecionado='MudarProduto'/>

            <div className='pesquisa'>
                <input type="text" placeholder='Pesquise o nome do Jogo' value={filtro} onChange={e => setFiltro(e.target.value)} onKeyDown={Enter}/>
            </div>

            <div className='conteudo'>
        
                <div className='card-container'>
                {jogos.map(item =>

                    <div className='comp-card'>
                        <div className='card' key={item.id} >{/*onclik para abrir detalhes depois/*/}
                            <div className='acoes'>

                                <img src='/assets/images/adm/pencil.png' alt='editar' />
                                
                                <img src='/assets/images/adm/trash.png' alt='remover' onClick={e => {e.stopPropagation(); RemoverJogo(item.id, item.nome)}}/>
                                
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