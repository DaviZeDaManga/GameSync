import React, { useState } from 'react';
import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import { toast } from 'react-toastify';
import storage, { set } from 'local-storage';
import { InserirImagemNot, InserirNoticia } from '../../../connection/admAPI';
import { BuscarImagem } from '../../../connection/produtosAPI';

export default function Addnews() {

    const [imagem, setImagem] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [subtitulo, setSubTitulo] = useState('');
    const [texto, setTexto] = useState('')
    let IDadmin
  
async function AdicionarNoticia() {
    try {
        const admLogado = storage('admin-logado');
        if (admLogado && admLogado.id) {
            IDadmin = admLogado.id;

            if (IDadmin) {
                if (!imagem) {
                    throw new Error('Imagem não selecionada!');
                }
                if (!titulo.trim()) {
                    throw new Error('O título não foi escrito');
                }
                if (!subtitulo.trim()) {
                    throw new Error('O sub-título não foi escrito');
                }
                if (!texto.trim()) {
                    throw new Error('O texto do corpo da notícia não foi escrito');
                }
                //passando os parâmetros separadamente
                const Add = await InserirNoticia(titulo, subtitulo, texto);
                const idNoticia = Add.id;

                await InserirImagemNot(idNoticia, imagem);
                toast.success('Nóticia adicionada com SUCESSO!');
            } else {
                toast.warning('Usuário logado não é um administrador.');
            }
        } else {
            toast.error('Usuário não está logado.');
        }
    } catch (err) {
        if (err.response) {
            toast.error(err.response.data.erro);
            console.log(err.response.data.erro);
        } else {
            toast.error(err.message);
            console.log();
        }
    }
}

            function EscolherImagemDIV() {
                document.getElementById('file').click();
              }

              function mostarImagem() {
                if (typeof imagem === 'object') {
                  return URL.createObjectURL(imagem);
                } else {
                  return BuscarImagem(imagem);
                }
              }
    
    return(
        <div id='add-main-addnews'>
            <AdmBarraLateral selecionado='NEWS' />

            <div className='add-news'>
                <div className='add-news2'>
                    <div className='add-news-cont'>
                        <div className='add-news-texts'>
                        <input
                        className='Tittle'
                        type="text"
                        placeholder='Titulo'
                        value={titulo}
                        onChange={(e) => setTitulo(() => e.target.value)}
                        />

                        <input
                        className='SubTittle'
                        type="text"
                        placeholder='subtitulo'
                        value={subtitulo}
                        onChange={(e) => setSubTitulo(() => e.target.value)}
                        />

                        <textarea
                        cols='40'
                        rows='4'
                        value={texto}
                        onChange={(e) => setTexto(() => e.target.value)}
                        placeholder='Descrição do Produto'
                        ></textarea>
                        </div>
                        <div className='add-news-images' >
                            <label className='picture' onClick={EscolherImagemDIV}>
                                {!imagem && 
                                <img src="/assets/images/adm/addimage.png"  className='imagem-capa' alt="" />
                                }
                                {
                                imagem && 
                                <img id='imagem-capa' src={mostarImagem()} alt="" />
                                }
                                <input type="file" id="file" onChange={e => setImagem(e.target.files[0])}/>
                           
                            </label>
                            <footer className='botao'>
                               <button onClick={AdicionarNoticia}>Adicionar Noticia</button>
                            </footer>
                        </div>
    
                     
                        
                    </div>
                    
                </div>
            </div>

        </div>
    )

}