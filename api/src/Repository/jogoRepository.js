import { conx } from "./connecion.js";

///Parte do Produto
export async function inserirProduto(produto) {
  const comando = `
    INSERT INTO tb_produto (
      id_admin, id_categoria, nm_produto, vl_preco, vl_preco_promocional, bt_destaque, bt_promocao, bt_disponivel,
      qtd_estoque, ds_descricao, ds_classificacao, dt_lancamento, ds_tamanho, ds_empresa_publi, ds_desenvolvedor
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

const valores = [
  produto.admin, produto.categoria, produto.nome, produto.preco, produto.precoPro, produto.destaque,
  produto.promocao, produto.disponivel, produto.qtd, produto.descricao, 
  produto.classificacao, produto.lancamento, produto.tamanho, produto.empresa, produto.desenvolvedor
];

const [resposta] = await conx.query(comando, valores);
produto.id = resposta.insertId;

return resposta
}

export async function todosJogos(){
    const comando = `
    SELECT
    p.id_produto,
    p.nm_produto    nome,
    p.ds_descricao  descricao,
    p.vl_preco      valor,
    p.vl_preco_promocional  promocao,
    p.bt_destaque   destaque,
    p.bt_promocao   EmPromocao,
    p.bt_disponivel disponivel,
    p.qtd_estoque   estoque,
    p.ds_classificacao    classificacao,
    p.dt_lancamento   lancamento,
    p.ds_tamanho      tamanho,
    p.ds_empresa_publi    empresa,
    p.ds_desenvolvedor    desenvolvedor,
    c.nm_categoria    categoria,
    pi.img_produto    imagem,
    pv.url_video    video
FROM tb_produto p
LEFT JOIN tb_categoria c ON p.id_categoria = c.id_categoria
LEFT JOIN tb_produto_imagem pi ON p.id_produto = pi.id_produto
LEFT JOIN tb_produto_video pv ON p.id_produto = pv.id_produto;
`

    const [linhas] = await conx.query(comando);
    return linhas;
}

export async function alterarProduto(id, produto){
    const comando =`
    UPDATE tb_produto
SET nm_produto = ?,
    vl_preco = ?,
    vl_preco_promocional = ?,
    bt_destaque = ?,
    bt_promocao = ?,
    bt_disponivel = ?,
    qtd_estoque = ?,
    ds_descricao = ?,
    ds_classificacao = ?,
    dt_lancamento = ?,
    ds_tamanho = ?,
    ds_empresa_publi = ?,
    ds_desenvolvedor = ?,
    id_categoria = ?, 
    id_admin = ?
WHERE id_produto = ?;
    `
    const [resposta] = await conx.query(comando, [produto.nome, produto.preco, produto.precoPro, produto.destaque, produto.promocao, 
      produto.disponivel, produto.qtd, produto.descricao,produto.classificacao, produto.lancamento, produto.tamanho, produto.empresa, 
      produto.desenvolvedor, produto.categoria, produto.admin, id])
    return resposta.affectedRows;
}

export async function deletarProduto(id){
    const comando =`
    DELETE FROM tb_produto
    WHERE id_produto = ?;`;
    const [resposta] = await conx.query(comando, [id]);
    return resposta.affectedRows;
};

////////////////////////////////////////////////////////////////////////////////

export async function AlterarImagem(imagem, id){
    const comando = `
    INSERT INTO tb_produto_imagem (id_produto, img_produto)
    VALUES (?, ?) `;

    const [resposta] = await conx.query(comando, [id, imagem]);
    return resposta.affectedRows
}

export async function InserirVideo(video) {
  try {
    const comando = 'INSERT INTO tb_produto_video (id_produto, url_video) VALUES (?, ?)';
    const [resposta] = await conx.query(comando, [video.produto, video.url]);

    if (resposta && resposta.insertId) {
      video.id = resposta.insertId;
      return video;
    } else {
      throw new Error('Erro ao inserir associação na tabela de video');
    }
    
  } catch (erro) {
    
    console.error('Erro ao inserir o vídeo:', erro);
    throw erro; 
  }
}

///para adicionar na tabela intermediaria 
export async function TBcategoriaProduto(tabela){
    try {
        const comando = `
          INSERT INTO tb_categoria_produto (id_categoria, id_produto, data_associacao)
          VALUES (?, ?, CURDATE());
        `;
    
        const [resposta] = await conx.query(comando, [tabela.categoria, tabela.produto]);
    
        if (resposta && resposta.insertId) {
          tabela.id = resposta.insertId;
          return tabela;
        } else {
          throw new Error('Erro ao inserir associação na tabela tb_categoria_produto');
        }
      } catch (error) {
        console.error('Erro ao inserir associação na tabela tb_categoria_produto:', error);
        throw error;
      }
    }

export async function BuscarJogoNM(nome){
    const comando = `
    SELECT id_produto id,
      id_categoria,
      id_admin,
      nm_produto  nome,
      vl_preco  preco,
      vl_preco_promocional preco_promocional,
      bt_destaque destaque,
      bt_promocao promocao,
      bt_disponivel disponivel,
      qtd_estoque quantidade_estoque,
      ds_descricao descricao
      FROM tb_produto
      WHERE nm_produto LIKE ?;`
      const [linhas] = await conx.query(comando, [`%${nome}%`]);
      return linhas
    }

export async function BuscarJogoID(id){
  const comando = `
  SELECT 
  c.nm_categoria, 
  p.id_admin, 
  p.nm_produto, 
  p.ds_descricao, 
  p.vl_preco, 
  p.vl_preco_promocional, 
  p.bt_destaque, 
  p.bt_promocao, 
  p.bt_disponivel, 
  p.qtd_estoque, 
  p.ds_classificacao, 
  p.dt_lancamento, 
  p.ds_tamanho, 
  p.ds_empresa_publi, 
  p.ds_desenvolvedor,
  pi.img_produto,
  pv.url_video
FROM tb_categoria c
INNER JOIN tb_produto p ON c.id_categoria = p.id_categoria
LEFT JOIN tb_produto_imagem pi ON p.id_produto = pi.id_produto
LEFT JOIN tb_produto_video pv ON p.id_produto = pv.id_produto
WHERE p.id_produto = ?;`
const [linhas] = await conx.query(comando, [id])
return linhas
}