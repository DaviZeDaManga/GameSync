import { conx } from "./connecion.js";



////acoes de login

//login
export async function LoginCliente(email, senha){

    const comando =
    `SELECT id_cliente id,
        nm_cliente  nome,
        ds_email    email
    FROM tb_clientes
    WHERE ds_email = ?
    AND   ds_senha = ?`

    const [linhas] = await conx.query(comando, [email, senha]);
    return linhas[0];
}

//cadastrar
export async function CadastrarCliente (cliente){
    const comando = `INSERT INTO tb_cliente (nm_cliente, ds_telefone, ds_cpf, ds_email, ds_senha, ds_cor)
    VALUES (?, ?, ?, ?, ?, ?);`

    const [resposta] = await conx.query(comando, [cliente.nome, cliente.telefone, cliente.cpf, cliente.email, cliente.senha]);
    cliente.id = resposta.insertId;

    return cliente
}




////acoes no perfil

//retornar dados do cliente
export async function DadosCliente(id){
    const comando = `
    SELECT 
    tb_clientes.id_cliente					id,
    tb_clientes.nm_cliente					nome,
    tb_clientes.ds_email						email,
    tb_clientes.ds_telefone					telefone,
    tb_clientes.ds_cor						cor,
    tb_clientes.ds_cpf						cpf,
    tb_cliente_imagem.id_cliente_img,
    tb_cliente_imagem.img_cliente			imagem
FROM tb_clientes
LEFT JOIN tb_cliente_imagem ON tb_clientes.id_cliente = tb_cliente_imagem.id_cliente
WHERE tb_clientes.id_cliente = ?
`
const [linhas] = await conx.query(comando, [id])
return linhas
}

//alterar dados cliente
export async function AlterarDadosUser(New, id) {
    const comando = `
    UPDATE tb_clientes
    SET nm_cliente = ?,
        ds_email = ?,
        ds_senha = ?,
        ds_telefone = ?,
        ds_cor = ?
    WHERE id_cliente = ?`

    if (!New) {
        throw new Error('Os dados do usuário não foram fornecidos.');
    }

    const { nome, email, senha, telefone } = {
        nome: New.nome,
        email: New.email ? New.email.toString() : undefined,
        senha: New.senha,
        telefone: New.telefone,
    };
    //{"erro": "O campo de e-mail deve ser uma string válida."}

    if (email === undefined) {
        throw new Error('O campo de e-mail deve ser uma string válida.');
    }

    const [resposta] = await conx.query(comando, [nome, email, senha, telefone, id]);

    return resposta.affectedRows;
}

//inserir imagem perfil
export async function InserirFotoPerfil(imagem, id){
    const comando = `
    INSERT INTO tb_cliente_imagem (id_cliente, img_cliente)
    VALUES (?, ?) `;
  
    const [resposta] = await conx.query(comando, [id, imagem]);
    return resposta.affectedRows
}

//alterar imagem perfil
export async function AlterarFotoPerfil(imagem, id){
    const comando = `
    UPDATE tb_cliente_imagem
SET img_cliente = ?
WHERE id_cliente = ?;`

const [resposta] = await conx.query(comando, [id, imagem]);
return resposta.affectedRows
}







////acoes externar

////avaliacao

//avaliar produto
export async function AdicionarAvaliacaoProd(idProduto, avaliacao){
    const comando = `
    INSERT INTO tb_comentarios_avaliacoes_produtos (id_cliente, comentario, avaliacao, data_comentario, id_produto)
    VALUES (?, ?, ?, CURDATE(), ?);`
  
    const parametros = [avaliacao.id_cliente, avaliacao.comentario, avaliacao.avaliacao, idProduto];
  
    const [resposta] = await conx.query(comando, parametros);
    return resposta.affectedRows;
}

//avaliar jogo
export async function AdicionarAvaliacaoJogo(idJogo, avaliacao){
    const comando = `
    INSERT INTO tb_comentarios_avaliacoes_jogos (id_cliente, comentario, avaliacao, data_comentario, id_jogo)
    VALUES (?, ?, ?, CURDATE(), ?)`
  
    const parametros = [avaliacao.id_cliente, avaliacao.comentario, avaliacao.avaliacao, idJogo];
  
    const [resposta] = await conx.query(comando, parametros);
    return resposta.affectedRows;
}

////favoritos

//inserir favorito
export async function InserirFavorito(favorito){
    const comando = `INSERT INTO tb_favoritos(id_cliente, id_produto, data_adicao)
    VALUES (?, ?, CURDATE());`;
  
    const [resposta] = await conx.query(comando, [favorito.cliente, favorito.produto])
    
    return resposta.affectedRows
}

//remover favorito
export async function ExcluirFavorito(id){
    const comando = `DELETE FROM tb_favoritos
    WHERE id_favoritos = ?;`
  
    const [resposta] = await conx.query(comando, [id])
    return resposta.affectedRows
}

