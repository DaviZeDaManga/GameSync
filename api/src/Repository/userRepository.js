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
