import { conx } from './connecion.js';

export async function loginCliente(email, senha){

    const comando =
    `SELECT id_cliente id,
        nm_cliente  nome,
        ds_email    email
    FROM tb_cliente
    WHERE ds_email = ?
    AND   ds_senha = ?`

    const [linhas] = await conx.query(comando, [email, senha]);
    return linhas[0];
}

export async function loginAdmin(email, senha, codigo){

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

export async function Novocliente (cliente){
    const comando = `INSERT INTO tb_cliente (nm_cliente, ds_telefone, ds_cpf, ds_email, ds_senha)
    VALUES (?, ?, ?, ?, ?);`

    const [resposta] = await conx.query(comando, [cliente.nome, cliente.telefone, cliente.cpf, cliente.email, cliente.senha]);
    cliente.id = resposta.insertId;

    return cliente
}

export async function MudarSenhaAdm(NewSenha, id) {
    const comando = `
    UPDATE tb_admin
    SET ds_senha = ?
    WHERE id_admin = ?;`

    const [resposta] = await conx.query(comando, [NewSenha, id]);

    return resposta.affectedRows;
}

export async function MudarSenhaUser(New, id) {
    const comando = `
    UPDATE tb_cliente
    SET nm_cliente = ?,
        ds_email = ?,
        ds_senha = ?,
        ds_telefone = ?
    WHERE id_cliente = ?;`

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

