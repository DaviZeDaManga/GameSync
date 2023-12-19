import { Router } from "express";
const server = Router()





import { BuscarGames, BuscarGamesID } from "../Repository/jogosRepository.js";

//retornar jogos

//todos os jogos
server.get('/games', async (req, resp) => {
    try{
        const resposta = await BuscarGames();
        resp.send(resposta)
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

//jogo por id
server.get(`/games/:id`, async(req, resp) => {
    try {
        const { id } = req.params; // parametro na url

        if (!id) {
            resp.status(400).send({ erro: 'O parâmetro "id" é obrigatório.' });
            return;
        }

        const resposta = await BuscarGamesID(id);

        if (!resposta) {
            resp.status(404).send([]);
        } else {
            resp.send(resposta);
        }
    } catch (err) {
        resp.status(500).send({
            erro: err.message
        });
    }
})

export default server;