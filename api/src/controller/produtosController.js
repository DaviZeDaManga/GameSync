import { Router } from "express";
const server = Router()





import { BuscarCategoria, BuscarCategorias, BuscarComentariosProd, BuscarItensCarrinho, BuscarProdutos, BuscarProdutosCT, BuscarProdutosFV, BuscarProdutosID, BuscarProdutosNM } from "../Repository/produtoRepository.js";

//retornar produtos

//todos os produtos
server.get('/produtos', async (req, resp) => {
    try{
        const resposta = await BuscarProdutos();
        resp.send(resposta)
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

//produtos por nome
server.get('/produtos/buscar', async (req, resp) => {
    try {
        const { nome } = req.query; 
        if (!nome) {
            throw new Error('O parâmetro "nome" é obrigatório!');
        }

        const resposta = await BuscarProdutosNM(nome);

        if (resposta.length === 0) {
            resp.status(404).send([]);
        } else {
            resp.send(resposta);
        }
    } catch (err) {
        resp.status(500).send({
            erro: err.message
        });
    }
});

//produto por id
server.get('/produto/:id', async (req, resp) => {
    try{
        const { id } = req.params;

        if (!id) {
            resp.status(400).send({ erro: 'O parâmetro "id" é obrigatório.' });
            return;
        }

        const resposta = await BuscarProdutosID(id);

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
});

//buscar categorias
server.get('/categorias', async (req, resp) => {
    try {
        const resposta = await BuscarCategorias()
        resp.send(resposta)
    }
    catch(err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

//buscar categoria
server.get('/categorias/:id', async (req, resp) => {
    try{
        const { id } = req.params;

        if (!id) {
            resp.status(400).send({ erro: 'O parâmetro "id" é obrigatório.' });
            return;
        }

        const resposta = await BuscarCategoria(id);

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
});

//buscar por categoria
server.get('/produto/categoria/:id', async(req, resp) => {
    try{
        const { id } = req.params;

        if (!id) {
            resp.status(400).send({ erro: 'O parâmetro "id" é obrigatório.' });
            return;
        }

        const resposta = await BuscarProdutosCT(id);

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

//buscar itens carrinho
server.get('/usuario/:id/carrinho', async (req, resp) => {
    try {
        const {id} = req.params

        if (!id) {
            throw new Error('Voce precisa informar o id do cliente')
        }

        const resposta = await BuscarItensCarrinho(id)

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

//produtos por favoritos
server.get('/usuario/:id/favoritos', async(req, resp) => {
    try{
        const { id } = req.params;

        if (!id) {
            resp.status(400).send({ erro: 'O parâmetro "id" é obrigatório.' });
            return;
        }

        const BuscarFavoritos = await BuscarProdutosFV(id);

        if (!BuscarFavoritos) {
            resp.status(404).send([]);
        } else {
            resp.send(BuscarFavoritos);
        }
    }
    catch (err) {
        resp.status(500).send({
            erro: err.message
        });
    }
})

//buscar comentarios dos produtos
server.get(`/produto/:id/comentarios`, async(req, resp) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            throw new Error('ID do produto não é válido.');
        }

        const resposta = await BuscarComentariosProd(id);

        resp.status(200).send(resposta);
    } catch (err) {
        console.error('Erro na rota /comentario/:id:', err.message);
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default server;