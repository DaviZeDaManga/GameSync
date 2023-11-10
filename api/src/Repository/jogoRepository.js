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
    -- Tabela tb_produto
    p.id_produto AS produto_id,
    p.nm_produto AS nome,
    p.ds_descricao AS descricao,
    p.vl_preco AS valor,
    p.vl_preco_promocional AS promocao,
    p.bt_destaque AS destaque,
    p.bt_promocao AS EmPromocao,
    p.bt_disponivel AS disponivel,
    p.qtd_estoque AS estoque,
    p.ds_classificacao AS classificacao,
    p.dt_lancamento AS lancamento,
    p.ds_tamanho AS tamanho,
    p.ds_empresa_publi AS empresa,
    p.ds_desenvolvedor AS desenvolvedor,
    
    -- Tabela tb_categoria
    c.id_categoria AS categoria_id,
    c.nm_categoria AS categoria_nome,
    
    -- Tabela tb_produto_imagem
     pi.id_produto_img  AS imagem_id,
    pi.img_produto AS imagem_produto,
    
    -- Tabela tb_produto_video
    pv.id_produto_video AS video_id,
    pv.url_video AS video_url,
    
    -- Tabela tb_categoria_produto
    cp.id_tb_categoria_produto AS categoria_produto_id,
    cp.id_categoria AS categoria_produto_categoria_id,
    cp.id_produto AS categoria_produto_produto_id,
    cp.data_associacao AS categoria_produto_data_associacao
FROM tb_produto p
LEFT JOIN tb_categoria c ON p.id_categoria = c.id_categoria
LEFT JOIN tb_produto_imagem pi ON p.id_produto = pi.id_produto
LEFT JOIN tb_produto_video pv ON p.id_produto = pv.id_produto
LEFT JOIN tb_categoria_produto cp ON p.id_produto = cp.id_produto;
`

    const [linhas] = await conx.query(comando);
    return linhas;
}

export async function deletarProduto(id){
    const comando =`
    DELETE FROM tb_produto
    WHERE id_produto = ?;`;
    const [resposta] = await conx.query(comando, [id]);
    return resposta.affectedRows;
};

////////////////////////////////////////////////////////////////////////////////

export async function InserirImagem(imagem, id){
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

export async function MudarImagem(id, image){
  const comando = `
  UPDATE tb_produto_imagem
  SET img_produto = ? 
  WHERE id_produto = ?;  
  `
  const [linhas] = await conx.query(comando, [image, id])
  return linhas.affectedRows
}

export async function MudarVideo(id, video){
  const comando = `
  UPDATE tb_produto_video
SET url_video = ?
WHERE id_produto = ?;`
const [linhas] = await conx.query(comando, [video, id])
return linhas.affectedRows
}

export async function MudarCproduto(categoria, id){
  const comando = `
  UPDATE tb_produto
SET id_categoria = ?  
WHERE id_produto = ?;`
const [linhas] = await conx.query(comando, [categoria, id])
return linhas.affectedRows
}

export async function MudarCcategoriap(categoria, id){
  const comando = `
  UPDATE tb_categoria_produto
SET id_categoria = ?,
    data_associacao = CURDATE()
WHERE id_produto = ?;`

const [linhas] = await conx.query(comando, [categoria, id])
return  linhas.affectedRows 
}