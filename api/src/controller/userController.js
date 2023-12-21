import { Router } from "express";
const server = Router();

import multer from 'multer'; //img DB
const upload = multer({dest: 'tools/image'});
const uploadN = multer({dest: 'tools/now'})




import { AdicionarAvaliacaoJogo, AdicionarAvaliacaoProd, AlterarDadosUser, AlterarFotoPerfil, BuscarMascoteCliente, CadastrarCliente, DadosCliente, DeletarAvaliacaoProd, DeletarMascoteCliente, ExcluirCarrinho, ExcluirFavorito, InserirCarrinho, InserirFavorito, InserirFotoPerfil, InserirMascoteCliente, LoginCliente } from "../Repository/userRepository.js";

import passwordValidator from 'password-validator';//import
var schema = new passwordValidator(); // cria uma instância de um objeto chamado schema, Esse objeto schema é usado para definir e aplicar regras de validação personalizadas a senhas.

schema
    .is().min(10, 'Para a mudar a senha tem que ter no mínimo 10 caracteres!') // Mínimo de 10 caracteres
    .is().max(300,'Limite de 300 caracteres') 
    .has().uppercase(1, 'Para a mudar a senha tem que ter no mínimo 1 letra maiúscula!') // Pelo menos uma letra maiúscula
    .has().digits(1, 'Para a mudar a senha tem que ter no mínimo 1 número!') // Pelo menos um dígito numérico
    .has().not().spaces(true, 'Não pode haver espaços na senha!') //Sem espaços            
    .has().symbols(1, 'Para a mudar a senha tem que ter no mínimo 1 caractere especial'); // Pelo menos um caractere especial     
    //console.log(schema.validate(''));
    //console.log(schema.validate('K@1BHBHBH', { details: true }));
   // console.log(schema.validate('', { list: true }));





   
////acoes de login

//login
server.post('/usuario/login', async (req, resp) => {
    try{
        const { email, senha } = req.body;

        const resposta = await LoginCliente(email, senha);

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

//cadastrar
server.post('/usuario/cadastrar', async (req, resp) => {
    try{
        const usuarioInserir = req.body;

        const Inserindo = await CadastrarCliente(usuarioInserir)

        resp.send(Inserindo);
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})








////acoes no perfil

//retornar dados do cliente
server.get('/usuario/:id', async (req, resp) => {
    try{
        const { id } = req.params

        if (!id) {
            resp.status(400).send({ erro: 'O parâmetro "id" é obrigatório.' });
            return;
        }

        const resposta = await DadosCliente(id);

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

//alterar dados cliente
server.put('/usuario/:id/alterardados', async (req, resp) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, telefone } = req.body;

        if (!id) {
            throw new Error('O usuário não está logado!');
        }

        const resposta = await AlterarDadosUser({ nome, email, senha, telefone }, id);

        if (!resposta) {
            resp.status(400).send({ erro: 'A alteração dos campos não foi executada!' });
        } else {
            resp.sendStatus(204);
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

//inserir imagem perfil
server.put('/usuario/:id/add/imagem', upload.array('imagens', 5), async (req, resp) => {
    try{
        const {id} = req.params;
        const imagens = req.files.map(file => file.path);

        if (!imagens || imagens.length === 0){
            throw new Error('Escolha sua foto de perfil!')
        }

        if (id === 0 || id === null) {
            throw new Error('Você não está logado!')
        }

        const resposta = await InserirFotoPerfil(imagens[0], id);
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

//alterar imagem perfil
server.put('/usuario/:id/alter/imagem', upload.array('imagens', 5), async (req, resp) => {
    try{
        const {id} = req.params;
        const imagens = req.files.map(file => file.path); // Array de arquivos de imagem, por isso files

        if (!imagens || imagens.length === 0){
            throw new Error('Precisa escolher pelo menos uma imagem!')
        }

        const resposta = await AlterarFotoPerfil(id, imagens[0]);
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








////acoes externar

////avaliacao

//avaliar produto
server.post('/usuario/avaliacao/produto/:id', async(req, resp) => {
    try{
        const { id } = req.params
        const avaliacao = req.body;

        if (isNaN(id)) {
            throw new Error('ID do produto não é válido.');
        }

        if (!avaliacao.id_cliente){
            throw new Error('ID cliente está vazio');
        }

        if (!avaliacao.nome){
            throw new Error('O nome do cliente esta vazio');
        }

        if(!avaliacao.comentario){
            throw new Error('Comentario está vazio');
        }

        if(!avaliacao.avaliacao){
            throw new Error('Avaliação está vazio');
        }

        const resposta = await AdicionarAvaliacaoProd(id, avaliacao);

        if (resposta !== 1) {
            throw new Error('Produto não pode ser alterado.');
        } else {
            resp.status(204).send();
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

//deletar avaliacao produto
server.delete('/usuario/delete/avaliacao/produto/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error('O id do comentario nao foi informado!')
        }

        let resposta = await DeletarAvaliacaoProd(id)

        if (resposta !== 1) {
            throw new Error('Comentario não pode ser alterado.');
        } else {
            resp.status(204).send()
        }
    } catch(err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

//avaliar jogo
server.post('/usuario/avaliacao/jogo/:id', async(req, resp) => {
    try{
        const { id } = req.params
        const avaliacao = req.body;

        if (isNaN(id)) {
            throw new Error('ID do jogo não é válido.');
        }

        if (!avaliacao.id_cliente){
            throw new Error('ID cliente está vazio');
        }

        if(!avaliacao.comentario){
            throw new Error('Comentario está vazio');
        }

        if(!avaliacao.avaliacao){
            throw new Error('Avaliação está vazio');
        }

        const resposta = await AdicionarAvaliacaoJogo(id, avaliacao);

        if (resposta !== 1) {
            throw new Error('Produto não pode ser alterado.');
        } else {
            resp.status(204).send();
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

////favoritos

//inserir favorito
server.post('/usuario/favoritar', async(req, resp) => {
    try{
        const favoritar = req.body

        if (!favoritar.produto)
        throw new Error ('O id do produto é obrigatorio');

        if (!favoritar.cliente)
        throw new Error ('O id do cliente é obrigatorio');

        const Favoritacao = await InserirFavorito(favoritar)

        resp.status(200).send({ Favoritacao }); //status HTTP 200 junto com o corpo da resposta no formato JSON.
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

//remover favorito
server.delete('/usuario/:id/favorito', async(req, resp) => {
    try{
        const { id } = req.params;

        const resposta = await ExcluirFavorito(id);

        if(resposta != 1)
        throw new Error('Produto favoritado não pode ser removido!');

        resp.status(204).send();
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

////carrinho

//inserir carrinho
server.post('/usuario/carrinho', async(req, resp) => {
    try{
        const carrinho = req.body

        if (!carrinho.produto)
        throw new Error ('O id do produto é obrigatorio');

        if (!carrinho.cliente)
        throw new Error ('O id do cliente é obrigatorio');

        const Favoritacao = await InserirCarrinho(carrinho)

        resp.status(200).send({ Favoritacao }); //status HTTP 200 junto com o corpo da resposta no formato JSON.
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

//remover carrinho
server.delete('/usuario/:id/carrinho', async(req, resp) => {
    try{
        const { id } = req.params;

        const resposta = await ExcluirCarrinho(id);

        if(resposta != 1)
        throw new Error('Produto no carrinho não pode ser removido!');

        resp.status(204).send();
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})














//adicionar mascotes a sua conta
server.post('/usuario/mascote', async (req, resp) => {
    try {
        const dados = req.body

        const resposta = await InserirMascoteCliente(dados)

        if (resposta !== 1) {
            throw new Error('Mascote não pode ser alterado.');
        } else {
            resp.status(204).send();
        }
    }
    catch(err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

//retornar mascote do usuario
server.get('/usuario/mascote/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error("Voce precisa informar o id do cliente!")
        }

        const resposta = await BuscarMascoteCliente(id)

        if (!resposta) {
            resp.status(404).send([]);
        } else {
            resp.send(resposta);
        }
    }
    catch(err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

//deletar mascote
server.delete('/usuario/mascote/:id', async (req, resp) => {
    try {
        const { id } = req.params

        if (!id) {
            throw new Error("Voce nao informou o id da vinculacao do mascote com o usuario!")
        }

        const resposta = await DeletarMascoteCliente(id)

        if(resposta != 1)
        throw new Error('Mascote selecionado não pode ser removido!');

        resp.status(204).send();
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})




export default server;