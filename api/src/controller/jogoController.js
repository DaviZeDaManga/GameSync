import { inserirProduto, todosJogos, alterarProduto, deletarProduto, InserirImagem, TBcategoriaProduto, 
        BuscarJogoNM, BuscarJogoID, InserirVideo, MudarImagem, MudarVideo, MudarCproduto, MudarCcategoriap } from "../Repository/jogoRepository.js"

import { Router } from 'express';
const server = Router();

import multer from 'multer'; //img DB
const upload = multer({dest: 'tools/image'});

server.post('/produto', async (req, resp) => {
    try {
        const produtoParaInserir = req.body;

        // Valide se todos os campos obrigatórios estão presentes
        const camposObrigatorios = [
            'nome', 'preco', 'precoPro', 'qtd', 'descricao', 'categoria', 'classificacao',
            'lancamento', 'tamanho', 'empresa', 'desenvolvedor'
        ];

        for (const campo of camposObrigatorios) {
            if (!produtoParaInserir[campo]) {
                throw new Error(`O campo "${campo}" é obrigatório.`);
            }
        }

        if (!produtoParaInserir.admin) {
            throw new Error('Administrador não logado!');
        }

        // Defina o campo 'disponivel' como false se não estiver presente no corpo da solicitação
        if (produtoParaInserir.disponivel === undefined) {
            produtoParaInserir.disponivel = false;
        }

        // Defina os campos 'promocao' e 'destaque' como false se não estiverem definidos
        if (produtoParaInserir.promocao === undefined) {
            produtoParaInserir.promocao = false;
        }

        if (produtoParaInserir.destaque === undefined) {
            produtoParaInserir.destaque = false;
        }

        
        await inserirProduto(produtoParaInserir);

         resp.status(200).send(produtoParaInserir);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
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
        const resposta = await InserirImagem(imagens[0], id);
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

server.post('/produto/video/url', async(req, resp) => {
    try{
        const video = req.body

        if(!video.produto)
        throw new Error ('id do produto não vilculado ao video')

        if (!video.url)
        throw new Error ('url tem que ser inserida')

        const EnviarUrl = await InserirVideo(video)

        resp.send(EnviarUrl)

    }
    catch(err){
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

server.get('/produto/buscar', async (req, resp) => {
    try {
        const { nome } = req.query; 
        if (!nome) {
            throw new Error('O parâmetro "nome" é obrigatório!');
        }

        const resposta = await BuscarJogoNM(nome);

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


server.get('/produto/:id', async (req, resp) => {
    try {
        const { id } = req.params; // parametro na url

        if (!id) {
            resp.status(400).send({ erro: 'O parâmetro "id" é obrigatório.' });
            return;
        }

        const resposta = await BuscarJogoID(id);

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
});

server.put('/produto/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const produto = req.body;

        // Verificar se o ID do produto é um número válido
        if (isNaN(id)) {
            throw new Error('ID do produto não é válido.');
        }

        // Verificar se pelo menos um dos campos a serem atualizados foi fornecido no corpo da solicitação
        if (!produto.nome && !produto.preco && !produto.precoPro && produto.destaque === undefined && produto.promocao === undefined && produto.disponivel === undefined && !produto.qtd && !produto.descricao && !produto.classificacao && !produto.lancamento && !produto.tamanho && !produto.empresa && !produto.desenvolvedor && !produto.categoria && !produto.admin) {
            throw new Error('Nenhum campo a ser atualizado foi fornecido.');
        }

        const resposta = await alterarProduto(id, produto);

        if (resposta !== 1) {
            throw new Error('Produto não pode ser alterado.');
        } else {
            resp.status(204).send();
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

server.put('/produto/:id/url', async (req, resp) => {
    try {
        const { id } = req.params;
        const { url } = req.body;

        if (!url) {
            throw new Error('A URL do vídeo é necessária para a alteração.');
        }

        const change = await MudarVideo(id, url);

        if (change === 1) {
            resp.status(204).send();
        } else {
            throw new Error('Produto não encontrado ou a URL não pode ser atualizada.')
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

server.put('/produto/:id/P', async (req, resp) => {
    try{
        const {id} = req.params;
        const {idcategoria} = req.body;

        if(!idcategoria){
            throw new Error('Inserir a categoria é necessario para a alteração!')
        }

        const change = await MudarCproduto(id, idcategoria)

        if (change === 1) {
            resp.status(204).send();
        } else {
            throw new Error('Produto não encontrado ou a categoria não pode ser atualizada')
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/produto/:id/CP', async (req, resp) => {
    try {
        const { id } = req.params;
        const { idcategoria } = req.body;

        if (!idcategoria) {
            throw new Error('Inserir a categoria é necessário para a alteração!');
        }

        const change = await MudarCcategoriap(idcategoria, id);  

        if (change === 1) {
            resp.status(204).send();
        } else {
            throw new Error('Produto não encontrado ou a categoria não pode ser atualizada');
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


server.put('/mudar/:id/imagens', upload.array('imagens', 5), async (req, resp) => {
    try{
        const {id} = req.params;
        const imagens = req.files.map(file => file.path); // Array de arquivos de imagem, por isso files

        if (!imagens || imagens.length === 0){
            throw new Error('Precisa escolher pelo menos uma imagem!')
        }

        console.log({imagem: imagens[0], id: id});

        // Lógica para salvar as imagens no banco de dados ou armazenamento
        const resposta = await MudarImagem(id, imagens[0]);
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

export default server;