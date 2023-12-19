import { Router } from "express";
const server = Router()





import { BuscarNoticias, BuscarNoticiasId } from "../Repository/noticiasRepository.js";

////retornar noticias

//todas as noticias
server.get(`/noticia`, async (req, resp) => {
    try{
        const resposta = await BuscarNoticias();
        resp.send(resposta)
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

//noticia por id
server.get(`/noticia/:id`, async (req, resp) => {
    try{
        const { id } = req.params;

        if (isNaN(id)) {
            throw new Error('ID do noticia não é válido.');
        }

        const resposta = await BuscarNoticiasId(id);

        resp.status(200).send(resposta);
    }
    catch(err){

    }
})

export default server;