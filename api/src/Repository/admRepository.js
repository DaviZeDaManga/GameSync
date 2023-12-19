import { conx } from "./connecion.js";






////login adm

//login
export async function LoginAdmin(email, senha, codigo){

  const comando = 
  `SELECT id_admin id,
      ds_email     email,
      ds_senha    senha
  FROM tb_admin
  WHERE   ds_email = ?
  AND     ds_senha = ?
  AND    vl_codigo = ?`

  const [linhas] = await conx.query(comando, [email, senha, codigo]);
  return linhas[0]
}

//mudar senha
export async function MudarSenhaAdm(NewSenha, id) {
  const comando = `
  UPDATE tb_admin
  SET ds_senha = ?
  WHERE id_admin = ?;`

  const [resposta] = await conx.query(comando, [NewSenha, id]);

  return resposta.affectedRows;
}







///acoes adm Produto

//inserir
export async function InserirProduto(produto) {
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

//inserir imagem
export async function InserirImagemProd(imagem, id){
    const comando = `
    INSERT INTO tb_produto_imagem (id_produto, img_produto)
    VALUES (?, ?) `;

    const [resposta] = await conx.query(comando, [id, imagem]);
    return resposta.affectedRows
}

//inserir video
export async function InserirVideoProd(video) {
  try {
    const comando = `
    INSERT INTO tb_produto_video (id_produto, url_video) 
    VALUES (?, ?)`;
    
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

//para adicionar na tabela intermediaria 
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

//alterar innformacoes
export async function AlterarProduto(id, produto){
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

//alterar imagem
export async function AlterarImagemProd(id, image){
  const comando = `
  UPDATE tb_produto_imagem
  SET img_produto = ? 
  WHERE id_produto = ?;  
  `
  const [linhas] = await conx.query(comando, [image, id])
  return linhas.affectedRows
}

//alterar video
export async function AlterarVideoProd(id, video){
  const comando = `
  UPDATE tb_produto_video
SET url_video = ?
WHERE id_produto = ?;`
const [linhas] = await conx.query(comando, [video, id])
return linhas.affectedRows
}

//alterar categoria
export async function AlterarCategoriaProd(categoria, id){
  const comando = `
  UPDATE tb_categoria_produto
SET id_categoria = ?,
    data_associacao = CURDATE()
WHERE id_produto = ?;`

const [linhas] = await conx.query(comando, [categoria, id])
return  linhas.affectedRows 
}

//deletar produto
export async function DeletarProduto(id){
  const comando =`
  DELETE FROM tb_produto
  WHERE id_produto = ?;`;
  const [resposta] = await conx.query(comando, [id]);
  return resposta.affectedRows;
};










////acoes noticias

//inserir noticia
export async function InserirNoticia(noticia){
  const comando = `INSERT INTO tb_noticia (ds_titulo, ds_subtitulo, ds_texto)
  VALUES (?, ?, ?);`

  const [resposta] = await conx.query(comando, [noticia.titulo, noticia.subtitulo, noticia.texto])
  return resposta.affectedRows
}

//insirir imagem da noticia
export async function InserirImagemNot(imagem, id){
  const comando = `
  INSERT INTO tb_noticia_imagem (id_noticia, img_produto)
  VALUES (?, ?);`

  const [resposta] = await conx.query(comando, [id, imagem]);
  return resposta.affectedRows
}