import { Router } from 'express';
const server = Router();

import multer from 'multer'; //img DB
const upload = multer({dest: 'tools/imagemprodutos'});
const uploadNoticias = multer({dest: 'tools/imagemnoticias'})



import { AlterarCategoriaProd, AlterarProduto, AlterarVideoProd, DeletarProduto, InserirImagemNot, InserirImagemProd, InserirNoticia, InserirProduto, InserirVideoProd, LoginAdmin, MudarSenhaAdm, TBcategoriaProduto } from '../Repository/admRepository.js';

////login adm

//login
server.post(`/admin/login`, async (req, resp) => {
    try{
        const { email, senha, codigo } = req.body;

        const resposta = await LoginAdmin(email, senha, codigo);

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

//mudar senha
server.put('/admin/:id/alter/senha', async (req, resp) => {
    try{
        const { id } = req.params;
        const novaSenha = req.body;

        if(!id){
            resp.status(400).send({ erro: 'Adiministrador não logado'});
        }

        if(!novaSenha.senha){
            throw new Error('Senha obrigatória')
        }

        let errosSenha = schema.validate(novaSenha.senha, { list: true })

        if (errosSenha.length != 0) { //!!!!!!!!!!!!!!!!!!!!!!

            for(let item of errosSenha) {
                throw new Error(`${item.message}`)
            }
          

        }
        //[ 'min', 'uppercase', 'digits', 'spaces', 'symbols' ]
   
        const resposta = await MudarSenhaAdm(novaSenha.senha, id);

        if (resposta !== 1)
            throw new Error('senha não pode ser alterada!')

        else
        resp.sendStatus(204);
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        });
    }
})









///acoes adm Produto

//inserir
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

        
        await InserirProduto(produtoParaInserir);

         resp.status(200).send(produtoParaInserir);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

//inserir imagem
server.put('/produto/:id/imagem', upload.array('imagens', 5), async (req, resp) => {
    try{
        const {id} = req.params;
        const imagens = req.files.map(file => file.path); // Array de arquivos de imagem, por isso files

        if (!imagens || imagens.length === 0){
            throw new Error('Precisa escolher pelo menos uma imagem!')
        }

        // console.log({imagem: imagens[0], id: id});

        // Lógica para salvar as imagens no banco de dados ou armazenamento
        const resposta = await InserirImagemProd(imagens[0], id);
        // console.log({resposta});

        if(resposta != 1) 
            throw new Error('A imagem não pode ser salva!')

        resp.status(204).send();
    }
    catch(err){
        // console.log(err);
        resp.status(400).send({
            erro: err.message
        })
    }
})

//inserir video
server.post('/produto/video', async(req, resp) => {           //////////////////////////////
    try{
        const video = req.body

        if(!video.produto)
        throw new Error ('id do produto não vilculado ao video')

        if (!video.url)
        throw new Error ('url tem que ser inserida')

        const EnviarUrl = await InserirVideoProd(video)

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

//alterar informacoes
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

        const resposta = await AlterarProduto(id, produto);

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

//alterar imagem
server.put('/produto/:id/imagem', upload.array('imagens', 5), async (req, resp) => {
    try{
        const {id} = req.params;
        const imagens = req.files.map(file => file.path); // Array de arquivos de imagem, por isso files

        if (!imagens || imagens.length === 0){
            throw new Error('Precisa escolher pelo menos uma imagem!')
        }

        // console.log({imagem: imagens[0], id: id});

        // Lógica para salvar as imagens no banco de dados ou armazenamento
        const resposta = await MudarImagem(id, imagens[0]);
        // console.log({resposta});

        if(resposta != 1)
            throw new Error('A imagem não pode ser salva!')

        resp.status(204).send();
    }
    catch(err){
        // console.log(err);
        resp.status(400).send({
            erro: err.message
        })
    }
})

//alterar video
server.put('/produto/:id/video', async (req, resp) => {
    try {
        const { id } = req.params;
        const { url } = req.body;

        if (!url) {
            throw new Error('A URL do vídeo é necessária para a alteração.');
        }

        const change = await AlterarVideoProd(id, url);

        if (change === 1) {
            resp.status(204).send();
        } else {
            throw new Error('Produto não encontrado ou a URL não pode ser atualizada.')
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

//alterar categoria
server.put('/produto/:id/categoria', async (req, resp) => {
    try {
        const { id } = req.params;
        const { idcategoria } = req.body;

        if (!idcategoria) {
            throw new Error('Inserir a categoria é necessário para a alteração!');
        }

        const change = await AlterarCategoriaProd(idcategoria, id);  

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

//deletar produto
server.delete('/produto/:id', async (req, resp) => {
    try{
        
        const { id } = req.params;

        const resposta = await DeletarProduto(id);

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









////acoes noticias

//inserir noticia
server.post(`/noticia`, async (req, resp) => {
    try {
        const noticia = req.body;

        if (!noticia.titulo)
            throw new Error('O título da notícia é obrigatório');

        if (!noticia.subtitulo)
            throw new Error('O subtitulo da notícia é obrigatório');

        if (!noticia.texto)
            throw new Error('O texto da notícia é obrigatório');

        const idNoticia = await InserirNoticia(noticia.titulo, noticia.subtitulo, noticia.texto);

        resp.status(200).send({ id: idNoticia });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

//inserir imagem 
server.put(`/noticia/:id/imagem`, uploadNoticias.array('imagens', 5), async (req, resp) => {
    try{
        const {id} = req.params;
        const imagens = req.files.map(file => file.path); 

        if (!imagens || imagens.length === 0){
            throw new Error('Precisa escolher pelo menos uma imagem!')
        }

        const resposta = await InserirImagemNot(imagens[0], id);

        if(resposta != 1)
            throw new Error('A imagem não pode ser salva!')

        resp.status(204).send();
    }
    catch(err){
        // console.log(err);
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server; 