import { conx } from "./connecion.js";





//retornar produtos

//todos os produtos
export async function BuscarProdutos(){
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


//produtos por nome
export async function BuscarProdutosNM(nome){
    const comando = `
   SELECT 
    p.id_produto AS id,
    p.id_categoria,
    p.id_admin,
    p.nm_produto AS nome,
    p.vl_preco AS preco,
    p.vl_preco_promocional AS preco_promocional,
    p.bt_destaque AS destaque,
    p.bt_promocao AS promocao,
    p.bt_disponivel AS disponivel,
    p.qtd_estoque AS quantidade_estoque,
    p.ds_descricao AS descricao,
    pi.img_produto AS img_produto,
    c.nm_categoria AS nm_categoria
FROM 
    tb_produto p
    LEFT JOIN tb_produto_imagem pi ON p.id_produto = pi.id_produto
    LEFT JOIN tb_categoria c ON p.id_categoria = c.id_categoria
WHERE 
    p.nm_produto LIKE ?;`
      const [linhas] = await conx.query(comando, [`%${nome}%`]);
      return linhas
    }


//jogo por id
export async function BuscarProdutosID(id){
    const comando = `
    SELECT  
      p.id_produto					    id,
      p.nm_produto       				nome, 
      p.ds_descricao	   				descricao, 
      p.vl_preco						preco, 
      p.vl_preco_promocional			vlPromo, 
      p.bt_destaque  					destaque, 
      p.bt_promocao					promocao, 
      p.bt_disponivel					disponivel, 
      p.qtd_estoque					estoque, 
      p.ds_classificacao				classificacao, 
      p.dt_lancamento					lancamento, 
      p.ds_tamanho					tamanho, 
      p.ds_empresa_publi				publi, 
      p.ds_desenvolvedor				desenvolvedor,
      pi.img_produto					img,
      pv.url_video					video
    FROM tb_produto p
    LEFT JOIN tb_produto_imagem pi ON p.id_produto = pi.id_produto
    LEFT JOIN tb_produto_video pv ON p.id_produto = pv.id_produto
    where p.id_produto = ?`
  const [linhas] = await conx.query(comando, [id])
  return linhas
  }

//buscar categoria
export async function BuscarCategoria(id) {
    const comando = `
    SELECT 
    nm_categoria		categoria
    FROM tb_categoria
    where id_categoria = ?`

    const [linhas] = await conx.query(comando, [id])
    return linhas;
}

//buscar por categoria
export async function BuscarProdutosCT(id){
    const comando = `
    SELECT  
      p.id_produto					id,
      p.nm_produto       				nome, 
      p.ds_descricao	   				descricao, 
      p.vl_preco						preco, 
      p.vl_preco_promocional			vlPromo, 
      p.bt_destaque  					destaque, 
      p.bt_promocao					promocao, 
      p.bt_disponivel					disponivel, 
      p.qtd_estoque					estoque, 
      p.ds_classificacao				classificacao, 
      p.dt_lancamento					lancamento, 
      p.ds_tamanho					tamanho, 
      p.ds_empresa_publi				publi, 
      p.ds_desenvolvedor				desenvolvedor,
      pi.img_produto					img,
      pv.url_video					video
  FROM tb_produto p
  LEFT JOIN tb_produto_imagem pi ON p.id_produto = pi.id_produto
  LEFT JOIN tb_produto_video pv ON p.id_produto = pv.id_produto
  where id_categoria = ?`;
  
  const [linhas] = await conx.query(comando, [id])
  return linhas
}

//buscar carrinho
export async function BuscarItensCarrinho(id) {
    const comando = `
    SELECT 
    pi.id_pedido_item				,

    p.id_produto					,
    p.nm_produto       				nome, 
    p.ds_descricao	   				descricao, 
    p.vl_preco						preco, 
    p.vl_preco_promocional			vlPromo,

    c.id_cliente,

    i.img_produto					
    FROM tb_pedido_item pi
    LEFT JOIN tb_produto p ON pi.id_produto = p.id_produto
    LEFT JOIN tb_clientes c ON pi.id_cliente = c.id_cliente
    LEFT JOIN tb_produto_imagem i ON p.id_produto = i.id_produto
    where c.id_cliente = ?`

    const [linhas] = await conx.query(comando, [id])
    return linhas
}

//buscar comentarios dos produtos
export async function BuscarComentariosProd(id){
    const comando = `SELECT * FROM tb_comentarios_avaliacoes_produtos WHERE id_produto = ?`
  
    const [linhas] = await conx.query(comando, [id])
    return linhas
}

//produtos por favoritos
export async function BuscarProdutosFV(id){
    const comando = `
    SELECT 
    s.id_favoritos				   ,

    p.id_produto					,
    p.nm_produto       				nome, 
    p.ds_descricao	   				descricao, 
    p.vl_preco						preco, 
    p.vl_preco_promocional			vlPromo,

    c.id_cliente,

    i.img_produto					
    FROM tb_favoritos s
    LEFT JOIN tb_produto p ON s.id_produto = p.id_produto
    LEFT JOIN tb_clientes c ON s.id_cliente = c.id_cliente
    LEFT JOIN tb_produto_imagem i ON p.id_produto = i.id_produto
    where c.id_cliente = ?`
  
    const [linhas] = await conx.query(comando, [id])
    return linhas
}