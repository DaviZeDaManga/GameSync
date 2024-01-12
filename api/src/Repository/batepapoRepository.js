import { conx } from "./connecion.js";

// export async function BuscarClientesNome(nome) {
//     const comando = `
//     SELECT
//     id_cliente 				cliente,
//     nm_cliente 				nome,
//     ds_cor					cor 
//     FROM tb_clientes
//     where nm_cliente LIKE ?`

//     const [resposta] = await conx.query(comando, [`%${nome}%`])
//     return resposta
// }












//criar batepapo
export async function CriarNovoBatepapo(id_batepapo, tema) {
    const comando = `
    INSERT INTO tb_batepapo (id_batepapo, dt_criacao, ds_tema)
    values(?, CURDATE(), ?)`

    const [linhas] = await conx.query(comando, [id_batepapo, tema])
    return linhas.affectedRows
}

//escolher o id do batepapo e depois o cliente q tera acesso
export async function InserirClientesBatepapo(id_batepapo, id_cliente, id_outro) {
    const comando = `
    INSERT INTO tb_batepapo_clientes (id_batepapo, id_cliente, id_outro)
    values(?, ?, ?)`

    const [linhas] = await conx.query(comando, [id_batepapo, id_cliente, id_outro])
    return linhas.affectedRows
}

//aparecer meus batepapos
export async function BuscarBatepapos(id_cliente) {
    const comando = `
    select 
    bc.id_batepapo				,
    c.id_cliente				,
    c.nm_cliente 				nome,
    c.ds_cor					cor,
    ci.img_cliente				img
    from tb_batepapo_clientes bc
    LEFT JOIN tb_clientes c ON bc.id_outro = c.id_cliente
    LEFT JOIN tb_cliente_imagem ci ON c.id_cliente = ci.id_cliente
    where bc.id_cliente = ?`

    const [linhas] = await conx.query(comando, id_cliente)
    return linhas
}

//buscar dados de um batepapo
export async function BuscarBatepapo(id_batepapo) {
    const comando = `
    select 
    c.id_cliente				id,
    c.nm_cliente 				nome,
    c.ds_cor					cor,
    ci.img_cliente				img
    from tb_batepapo_clientes bc
    LEFT JOIN tb_clientes c ON bc.id_cliente = c.id_cliente
    LEFT JOIN tb_cliente_imagem ci ON c.id_cliente = ci.id_cliente
    where bc.id_batepapo = ?`

    const [linhas] = await conx.query(comando, id_batepapo)
    return linhas
}

//buscar mensagens de um batepapo
export async function BuscarMensagensBatepapo(id_batepapo) {
    const comando = `
    SELECT * FROM tb_mensagem
    where id_batepapo = ?`

    const [linhas] = await conx.query(comando, id_batepapo)
    return linhas
}