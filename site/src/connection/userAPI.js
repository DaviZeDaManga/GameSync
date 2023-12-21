import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

////acoes de login

//login
export async function LoginCliente(email, senha){
    try{
        const r = await api.post('/usuario/login', {
            email: email,
            senha: senha
        });
        return r.data;
    }
    catch (err){
        console.error(err)
        throw err
    }
}

//cadastrar
export async function CadastrarCliente(nome, telefone, cpf, email, senha, cor){
    try{
        const r = await api.post('/usuario/cadastrar', {
            nome: nome,
            telefone: telefone,
            cpf: cpf,
            email: email,
            senha: senha,
            cor: cor
        });
        return r.data
    }
    catch(err){
        console.log(err);
        throw err
    }
}








////acoes no perfil

//retornar dados do cliente
export async function DadosCliente(id){
    const resposta = await api.get(`/usuario/${id}`)
    return resposta.data
}

//alterar dados cliente
export async function AlterarDadosUser(nome, email, senha, telefone, id){
    try{
        const r = await api.put(`/usuario/${id}/alterardados`, {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone
        })
        return r.data // ou status?
    }
    catch(err){
        console.log(err)
        throw err
    }
}

//inserir imagem perfil
export async function InserirFotoPerfil(id, imagem){

    const formData = new FormData();
    formData.append('imagens', imagem);

    const resposta = await api.put(`/usuario/${id}/add/imagem`, formData,{
        headers:{
            "Content-Type": "multipart/form-data", 
        },
    })
    return resposta.status
}

//alterar imagem perfil
export async function AlterarFotoPerfil(id, imagem){
    const formData = new FormData();
    formData.append('imagens', imagem);

    const resposta = await api.put(`/usuario/${id}/alter/imagem`, formData,{
        headers:{
            "Content-Type": "multipart/form-data", 
        },
    })
    return resposta.status
}








////acoes externar

////avaliacao

//avaliar produto
export async function AdicionarAvaliacaoProd(id, nome, avaliacao, comentario, id_cliente){
    try{
        const resposta = await api.post(`/usuario/avaliacao/produto/${id}`, {
            id_cliente: id_cliente,
            nome: nome,
            comentario: comentario,
            avaliacao: avaliacao
        });
        return resposta.data
    }
    catch(erro){
        throw erro;
    }
}

//deletar avaliacao produto
export async function DeletarAvaliacaoProd(id) {
    try {
        console.log(`Tentando excluir o comentario de id: ${id}`)
        const resposta = await api.delete(`/usuario/delete/avaliacao/produto/${id}`)

        console.log(`Resposta da exclusão: ${resposta.status}`)
        return resposta.status

    } catch(erro) {
        console.error(`Erro ao excluir produto: ${erro}`)
        throw erro
    }
}

//avaliar jogo
export async function AdicionarAvaliacaoJogo(id, avaliacao, comentario, id_cliente){
    try{
        const resposta = await api.post(`/usuario/avaliacao/jogo/${id}`, {
            id_cliente: id_cliente,
            comentario: comentario,
            avaliacao: avaliacao
        });
        return resposta.data
    }
    catch(erro){
        throw erro;
    }
}

////favoritos

//inserir favorito
export async function InserirFavorito(produto, cliente){
    try{
        const resposta = await api.post('usuario/favoritar', {
            produto: produto,
            cliente: cliente
        });
        return resposta.data;
    }
    catch(erro){
        throw erro;
    }
}

export async function ExcluirFavorito(id){
    const resposta = await api.delete(`/usuario/${id}/favorito`);
    return resposta.status
}

////carrinho

//inserir carrinho
export async function InserirCarrinho(produto, cliente){
    try{
        const resposta = await api.post('usuario/carrinho', {
            produto: produto,
            cliente: cliente
        });
        return resposta.data;
    }
    catch(erro){
        throw erro;
    }
}

//remover carrinho
export async function ExcluirCarrinho(id){
    const resposta = await api.delete(`/usuario/${id}/carrinho`);
    return resposta.status
}







export async function InserirMascoteCliente(idmascote, idcliente) {
    try {
        const resposta = await api.post('/usuario/mascote', {
            idmascote: idmascote,
            idcliente: idcliente
        })
        return resposta.data
    }
    catch(erro){
        throw erro
    }
}

export async function BuscarMascoteCliente(id) {
    try {
        const resposta = await api.get(`/usuario/mascote/${id}`)
        return resposta.data
    }
    catch(error) {
        if (error.response && error.response.status === 404) {
            return [];
        } else {
            throw error;
        }
    }
}

export async function DeletarMascoteCliente(id) {
    const resposta = await api.delete(`/usuario/mascote/${id}`)
    return resposta.status
}