import React, { useState } from 'react';
import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import { CadastrarProduto, EnviarImagens, InserirCategoriaProduto, InserirVideo, BuscarImagem } from '../../../connection/productAPI';
import storage from 'local-storage';
import { toast } from 'react-toastify';

export default function AddProduct() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [precoPro, setPrecoPro] = useState(0);
  const [destaque, setDestaque] = useState(false);
  const [promocao, setPromocao] = useState(false);
  const [disponivel, setDisponivel] = useState(false);
  const [qtd, setQtd] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [lancamento, setLancamento] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [desenvolvedor, setDesenvolvedor] = useState('');
  const [imagem, setImagem] = useState(null);
  const [video, setVideo] = useState('');
  const [categoria, setCategoria] = useState(1);
  const [idJogo, setIdJogo] = useState(null);
  let IDadmin;

  async function SalveClik() {
    try {
      const usuarioLogado = storage('admin-logado');
      if (usuarioLogado && usuarioLogado.id) {
        IDadmin = usuarioLogado.id;

        if (IDadmin) {
          if (!imagem) {
            throw new Error('Imagem não selecionada!');
          }

          if (!video) {
            throw new Error('URL do trailer não inserida!');
          }

          if (preco <= 0) {
            throw new Error('Preço do jogo inserido é obrigatório. Certifique-se de que o preço seja maior que zero.');
          }

          const produto = {
            nome,
            preco: parseFloat(preco),
            precoPro: parseFloat(precoPro),
            destaque: destaque ? 1 : 0,
            promocao: promocao ? 1 : 0,
            disponivel: disponivel ? 1 : 0,
            qtd: parseInt(qtd, 10),
            descricao,
            categoria: parseInt(categoria, 10),
            classificacao,
            lancamento,
            tamanho,
            empresa,
            desenvolvedor,
            admin: IDadmin
          };

          const jogo = await CadastrarProduto(produto);
          setIdJogo(jogo);

          const tbCategoriaProduto = {
            categoria: categoria,
            produto: jogo
          };

          await InserirCategoriaProduto(tbCategoriaProduto);

          await EnviarImagens(jogo, imagem);
          await InserirVideo(jogo, video);

          toast.success('Produto Gamer adicionado com SUCESSO!');
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

  function NovoClick() {
    window.location.reload();
  }

  return (
    <div id='add-main-addproduct'>
      <AdmBarraLateral selecionado='addproduts' />
      <section className='add-produt'>
        <figure className='add-part1'>

          <div className='add-part1-nome'>
            <h3>Nome do Produto</h3>
            <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className='add-part1-valores'>
            <h1>Valor do Produto</h1>
            <div className='add-part1-valores-vl'>
              <input type='number' placeholder='Preço Padrão' value={preco} onChange={(e) => setPreco(e.target.value)} />
              <input type='number' placeholder='Preço Promocional' value={precoPro} onChange={(e) => setPrecoPro(e.target.value)} />
            </div>
          </div>

          <div className='add-part1-negocio'>
                <h1>Opções de Negócio</h1>

                <section className='add-part1-negocio-checks'>

                    <div className='add-part1-negocio-msm'>
                        <input type='checkbox' value={1} onChange={(e) => setPromocao(parseInt(e.target.value))} />
                        <p>Promoção?</p>
                    </div>

                    <div className='add-part1-negocio-msm'>
                       
                        <p>Disponível?</p> <input type='checkbox' value={1} onChange={(e) => setDisponivel(parseInt(e.target.value))} />
                    </div>

                    <div className='add-part1-negocio-msm'>
                        <input type='checkbox' value={1} onChange={(e) => setDestaque(parseInt(e.target.value))} />
                        <p>Destaque?</p>
                    </div>

                </section>

                <section className='add-part1-negocio-jogos'>
                    <h1>Sobre o Jogo</h1>

                    <figure className='sobre-jogo'> 
                    <div className='add-part1-negocio-nr'>
                        <select value={categoria} onChange={e => setCategoria(parseInt(e.target.value, 10))}>
                        <option>Selecionar</option>
                        <option value={1}>Ação</option>
                        <option value={2}>Terror</option>
                        <option value={3}>FPS</option>
                        <option value={4}>RPG</option>
                        <option value={5}>Souls Like</option>
                        <option value={6}>Aventura</option>
                        <option value={7}>Tiro</option>
                        <option value={8}>Estratégia</option>
                        <option value={9}>Esportes</option>
                        <option value={10}>Corrida</option>
                        <option value={11}>Quebra-cabeça</option>
                        <option value={12}>Plataforma</option>
                        <option value={13}>Simulação</option>
                        <option value={14}>Luta</option>
                        <option value={15}>Sobrevivência</option>
                        <option value={16}>RTS</option>
                        <option value={17}>Cartas</option>
                        <option value={18}>Música</option>
                        <option value={19}>MMO</option>
                        <option value={20}>Mundo Aberto</option>
                        <option value={21}>Sandbox</option>
                        <option value={22}>História Interativa</option>
                        <option value={23}>Educacional</option>
                        <option value={24}>Visual Novel</option>
                        <option value={25}>Battle Royale</option>
                        <option value={26}>Rogue-like</option>
                        <option value={27}>Construção</option>
                        </select>
                    </div>
                    
                    <div className='add-part1-negocio-nr'>
                        <input type='number' placeholder='Estoque?' value={qtd} onChange={(e) => setQtd(e.target.value)} />
                    </div>

                    <div className='add-part1-negocio-nr'>
                        <input type='text' placeholder='Classificação?' value={classificacao} onChange={(e) => setClassificacao(e.target.value)} />
                    </div>

                    <div className='add-part1-negocio-nr'>
                        <input type='date' placeholder='Data de Lançamento' value={lancamento} onChange={(e) => setLancamento(e.target.value)} />
                    </div>

                    <div className='add-part1-negocio-nr'>
                        <input type='text' placeholder='Em GB ou MB?' value={tamanho} onChange={(e) => setTamanho(e.target.value)} />
                    </div>

                    <div className='add-part1-negocio-nr'>
                        <input type='text' placeholder='Empresa que Publicou?' value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
                    </div>

                    <div className='add-part1-negocio-nr'>
                        <input type='text' placeholder='Desenvolvedor?' value={desenvolvedor} onChange={(e) => setDesenvolvedor(e.target.value)} />
                    </div>

                    <div className="add-part1-video">
                        <input type="url" value={video} onChange={e => setVideo(e.target.value)}/>
                    </div>

                    </figure>
                </section>
          </div>

          <div className='texto-area'>
            <textarea cols='40' rows='4' value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder='Descrição do Produto'></textarea>
          </div>

        </figure>

        <figure className="add-part2">
            <div className="add-part2-imagem1" onClick={EscolherImagemDIV}>
                {!imagem && 
                    <img src="/assets/images/adm/photo.png"  id='imagem-capa' alt="" />
                }
                {
                imagem && 
                <img id='imagem-capa' src={mostarImagem()} alt="" />
                }
                <input type="file" id="file" onChange={e => setImagem(e.target.files[0])}/>

            </div>
        </figure>
      </section>

        <footer className='botao'>
            <button onClick={SalveClik}>Adicionar produto</button>
            <button onClick={NovoClick}>Limpar Formulario</button>
        </footer>

    </div>
  );
}
