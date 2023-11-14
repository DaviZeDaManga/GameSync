import React, { useState } from 'react';
import './index.scss';
import AdmBarraLateral from '../../components/AdminBarraL';
import { CadastrarProduto, EnviarImagens, InserirCategoriaProduto, InserirVideo, BuscarImagem } from '../../connection/productAPI';
import storage from 'local-storage';
import { toast } from 'react-toastify';

export default function AddProductTest() {
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
        

        <footer className='botao'>
            <button onClick={SalveClik}>Adicionar produto</button>
            <button onClick={NovoClick}>Limpar Formulario</button>
        </footer>

    </div>
  );
}
