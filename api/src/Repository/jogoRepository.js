import { conx } from "./connecion.js";

///Parte do Produto
export async function inserirProduto (produto){
    const comando = `INSERT INTO tb_produto (id_categoria, nm_produto, vl_preco, vl_preco_promocional, bt_destaque, bt_promocao, bt_disponivel, qtd_estoque, ds_detalhes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`

    const [resposta] = await conx.query(comando, [produto.categoria, produto.nome, produto.preco, produto.precoPro, produto.destaque, produto.promocao, produto.disponivel, produto.qtd, produto.details]);
    produto.id = resposta.insertId;

    return produto;
}

export async function todosJogos(){
    const comando = `
    SELECT id_produto     id,
    nm_produto        nome,
    vl_preco          valor,
    vl_preco_promocional     promocao,
    qtd_estoque       estoque,
    ds_detalhes       descricao
    FROM tb_produto;`

    const [linhas] = await conx.query(comando);
    return linhas;
}

export async function alterarProduto(id, produto){
    const comando =`
    UPDATE tb_produto
    SET nm_produto =    ?,
        vl_preco =      ?,
        vl_preco_promocional =  ?,
        bt_destaque =   ?,
        bt_promocao =   ?,
        bt_disponivel = ?,
        qtd_estoque =   ?,
        ds_detalhes =   ?,
        id_categoria = ?,
        id_admin     =  ?
    WHERE    id_produto = ?;
    `
    const [resposta] = await conx.query(comando, [produto.nome, produto.preco, produto.precoPro, produto.destaque, produto.promocao, produto.disponivel, produto.qtd, produto.details, produto.categoria, produto.admin, id])
    return resposta.affectedRows;
}

export async function deletarProduto(id){
    const comando =`
    SET foreign_key_checks = 0; 
    DELETE FROM tb_produto WHERE id_produto = ?;
    SET foreign_key_checks = 1;`;
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

export async function InserirVideo(video, idProduto) {
  try {
    const comando = 'INSERT INTO tb_produto_video (id_produto, url_video) VALUES (?, ?)';
    const [resposta] = await conx.query(comando, [idProduto, video]);
    
    return resposta.affectedRows;
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
      ds_detalhes detalhes
      FROM tb_produto
      WHERE nm_produto LIKE ?;`
      const [linhas] = await conx.query(comando, [`%${nome}%`]);
      return linhas
    }