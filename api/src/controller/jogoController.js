import { inserirProduto, todosJogos, alterarProduto, deletarProduto, AlterarImagem, TBcategoriaProduto, BuscarJogoNM } from "../Repository/jogoRepository.js"

import { Router } from 'express';
const server = Router();

import multer from 'multer'; //img DB
const upload = multer({dest: 'tools/image'});

server.post('/produto', async(req, resp) => {
    try{
        const produtoParaInserir = req.body  
        console.log(produtoParaInserir);

        if(!produtoParaInserir.nome)
            throw new Error('Nome do jogo inserido é obrigatorio');

        if(!produtoParaInserir.preco)
        throw new Error('Preço do jogo inserido é obrigatorio');

        if(!produtoParaInserir.precoPro)
            throw new Error('Preço Promocional inserido é obrigatorio');

        if(!produtoParaInserir.destaque === undefined)
         throw new Error('Lançamento do jogo inserido é obrigatorio');

         if(!produtoParaInserir.promocao === undefined)
         throw new Error('Disponivel do jogo inserido é obrigatorio');
        
         if(!produtoParaInserir.disponivel === undefined)
         throw new Error('Disponivel do jogo inserido é obrigatorio');
        
         if(!produtoParaInserir.qtd)
         throw new Error('Disponivel do jogo inserido é obrigatorio');

         if(!produtoParaInserir.details)
         throw new Error('Disponivel do jogo inserido é obrigatorio');

         if(!produtoParaInserir.categoria)
        throw new Error('Categoria não registrada')

        if(!produtoParaInserir.admin)
        throw new Error('Adiministrador não logado!')

        const RepositoryInseridoP = await inserirProduto(produtoParaInserir);

        resp.send(RepositoryInseridoP);
    }
    
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/produtos', async (req, resp) => {
    try{
        const resposta = await todosJogos();
        resp.send(resposta)
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/produto/:id', async (req, resp) => {
    try{
        const { id } = req.params;
        const produto = req.body;

        if(!produto.nome)
        throw new Error('Nome do produto inserido é obrigatorio');

        if (!produto.preco)
        throw new Error('Preço do produto inserido é obrigatório');

        if (!produto.precoPro)
        throw new Error('Preço promocional do produto inserido é obrigatório');

        if (produto.destaque === undefined)
        throw new Error('Campo destaque do produto inserido é obrigatório');

        if (produto.promocao === undefined)
        throw new Error('Campo promoção do produto inserido é obrigatório');

        if (produto.disponivel === undefined)
        throw new Error('Campo disponível do produto inserido é obrigatório');

        if (!produto.qtd)
        throw new Error('Quantidade em estoque do produto inserido é obrigatória');

        if (!produto.details)
        throw new Error('Detalhes do produto inserido são obrigatórios');

        if(!produto.categoria)
        throw new Error('Categoria não registrada')

        if (!produto.admin)
        throw new Error('O adiministrador não existe');

        const resposta = await alterarProduto(id, produto);

        if (resposta !== 1)
        throw new Error('Produto não pode ser alterado!')

        else
            resp.status(204).send();
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.delete('/produto/:id', async (req, resp) => {
    try{
        
        const { id } = req.params;

        const resposta = await deletarProduto(id);

        if(resposta != 1)
            throw new Error('Produto não pode ser removido!');

        resp.status(204).send();
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/produto/:id/imagens', upload.array('imagens', 5), async (req, resp) => {
    try{
        const {id} = req.params;
        const imagens = req.files.map(file => file.path); // Array de arquivos de imagem, por isso files

        if (!imagens || imagens.length === 0){
            throw new Error('Precisa escolher pelo menos uma imagem!')
        }

        console.log({imagem: imagens[0], id: id});

        // Lógica para salvar as imagens no banco de dados ou armazenamento
        const resposta = await AlterarImagem(imagens[0], id);
        console.log({resposta});

        if(resposta != 1)
            throw new Error('A imagem não pode ser salva!')

        resp.status(204).send();
    }
    catch(err){
        console.log(err);
        resp.status(400).send({
            erro: err.message
        })
    }
})

///para adicionar na tabela intermediaria 
server.post('/produto/categoria', async(req, resp) => {
    try{
        const IDcategoriaPro = req.body

        if(!IDcategoriaPro.categoria)
        throw new Error ('ID da Categoria não pode ser inserida no sistema')

        if(!IDcategoriaPro.produto)
        throw new Error ('ID do produto não pode ser inserida no sistema')

        const InsertCategoriaProduto = await TBcategoriaProduto(IDcategoriaPro)

        resp.send(InsertCategoriaProduto)
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })  
    }
})

server.get('/produto/buscar', async (req, res) => {
    try {
        const { nome } = req.query; // Usar req.query para obter os parâmetros da URL

        if (!nome) {
            res.status(400).send({ erro: 'O parâmetro "nome" é obrigatório.' });
            return;
        }

        const resposta = await BuscarJogoNM(nome);

        if (resposta.length === 0) {
            res.status(404).send([]);
        } else {
            res.send(resposta);
        }
    } catch (err) {
        res.status(500).send({
            erro: err.message
        });
    }
});


export default server;