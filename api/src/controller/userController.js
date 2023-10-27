import { loginCliente, loginAdmin, Novocliente } from '../Repository/userRepository.js';

import { Router } from "express";
const server = Router();

server.post('/usuario/login', async (req, resp) => {
    try{
        const { email, senha } = req.body;

        const resposta = await loginCliente(email, senha);

        if (!resposta){
            throw new Error('Credenciais invalidas');
        }
        
        resp.send(resposta)
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.post(`/admin/login`, async (req, resp) => {
    try{
        const { email, senha, codigo } = req.body;

        const resposta = await loginAdmin(email, senha, codigo);

        if (!resposta){
            throw new Error('Credenciais invalidas');
        }

        resp.send(resposta)
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.post('/usuario/cadastrar', async (req, resp) => {
    try{
        const usuarioInserir = req.body;




        const Inserindo = await Novocliente(usuarioInserir)

        resp.send(Inserindo);
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;