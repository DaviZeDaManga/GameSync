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
export async function CadastrarCliente(nome, telefone, cpf, email, senha){
    try{
        const r = await api.post('/usuario/cadastrar', {
            nome: nome,
            telefone: telefone,
            cpf: cpf,
            email: email,
            senha: senha
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
    return resposta
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
export async function AdicionarAvaliacaoProd(id, avaliacao, comentario, id_cliente){
    try{
        const resposta = await api.post(`/usuario/avaliacao/${id}`, {
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

//avaliar jogo

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
    const resposta = await api.delete(`/usuario/favorito/${id}`);
    return resposta.status
}