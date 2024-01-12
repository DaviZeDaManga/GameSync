import { Router } from "express";
const server = Router()





import { BuscarBatepapo, BuscarBatepapos, BuscarMensagensBatepapo, CriarNovoBatepapo, InserirClientesBatepapo } from "../Repository/batepapoRepository.js";


// server.get('/batepapos/buscar', async (req, resp) => {
//     try {
//         const {nome} = req.query
//         if (!nome) {
//             throw new Error("O parametro nome é obrigatório!")
//         }

//         const resposta = await BuscarClientesNome(nome)

//         if (resposta.length == 0) {
//             resp.status(404).send()
//         }
//         else {
//             resp.send(resposta)
//         }
//     }
//     catch (err) {
//         resp.status(404).send({
//             erro: err.message
//         })
//     }
// })
















//criar batepapo
server.post('/batepapos/novo', async (req, resp) => {
    try {
        const contatos = req.body

        if (!contatos.id_batepapo) {
            throw new Error("Precisa ser informado o id do batepapo!")
        }

        if (!contatos.tema) {
            throw new Error("Precisa ser informado um tema do batepapo!")
        }

        await CriarNovoBatepapo(contatos.id_batepapo, contatos.tema)

        if (!resposta) {
            resp.status(404).send()
        }
        else {
            resp.status(200).send()
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

//escolher o id do batepapo e depois o cliente q tera acesso
server.post('/batepapo/novo/clientes', async (req, resp) => {
    try {
        const dados = req.body

        if (!dados.id_batepapo) {
            throw new Error("Precisa ser informado o id do batepapo!")
        }

        if (!dados.id_cliente) {
            throw new Error("Precisa ser informado o id do cliente!")
        }

        if (!dados.id_outro) {
            throw new Error("Precisa ser informado o id do outro cliente!")
        }

        await InserirClientesBatepapo(dados.id_batepapo, dados.id_cliente, dados.id_outro)

        if (!resposta) {
            resp.status(404).send()
        }
        else {
            resp.status(200).send()
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

//aparecer meus batepapos
server.get('/batepapos/:id/meus', async (req, resp) => {
    try{
        const { id } = req.params;

        if (!id) {
            resp.status(400).send({ erro: 'O parâmetro "id" é obrigatório.' });
            return;
        }

        const resposta = await BuscarBatepapos(id);

        if (!resposta) {
            resp.status(404).send([]);
        } else {
            resp.send(resposta);
        }
    }
    catch(err){ 
        resp.status(400).send({
            erro: err.message
        })
    }
})

//buscar dados de um batepapo
server.get('/batepapos/:id', async (req, resp) => {
    try {
        const {id} = req.params

        if (!id) {
            throw new Error("O parametro id é obrigatório!")
        }

        const resposta = await BuscarBatepapo(id)

        if (!resposta) {
            resp.status(404).send()
        }
        else {
            resp.send(resposta)
        }
    }
    catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

//buscar mensagens de um batepapo
server.get('/batepapos/:id/mensagens', async (req, resp) => {
    try {
        const {id} = req.params

        if (!id) {
            throw new Error("O parametro id é obrigatório!")
        }

        const resposta = await BuscarMensagensBatepapo(id)

        if (!resposta) {
            resp.status(404).send()
        }
        else {
            resp.send(resposta)
        }
    }
    catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

export default server;