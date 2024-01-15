import axios from "axios";

const api = axios.create({  
    baseURL: 'http://localhost:5000'
});

//retornar produtos

//todos os produtos
export async function BuscarProdutos(){
    const resposta = await api.get('/produtos');
    return resposta.data
}

//produtos por nome
export async function BuscarProdutosNM(nome) {
    try {
        const resposta = await api.get(`/produtos/buscar?nome=${nome}`);
        return resposta.data;
    } 
    catch (error) {
        if (error.response && error.response.status === 404) {
            // Tratar a situação em que nenhum resultado foi encontrado.
            return [];
        } else {
            // Tratar outros erros, como erros na solicitação ou no servidor.
            throw error;
        }
    }
}

//produto por id
export async function BuscarProdutosID(id){
    try{
        const resposta = await api.get(`/produto/${id}`);
        return resposta.data;
    }   
    catch (error) {
        if (error.response && error.response.status === 404) {
            // Tratar a situação em que nenhum resultado foi encontrado.
            return [];
        } else {
            // Tratar outros erros, como erros na solicitação ou no servidor.
            throw error;
        }
    }
}

//buscar categoria
export async function BuscarCategoria(id) {
    try {
        const resposta = await api.get(`/categorias/${id}`)
        return resposta.data

    } catch(erro) {
        throw erro;
    }
}

//produtos por categoria
export async function BuscarProdutosCT(id){
    try {
        const resposta = await api.get(`/produto/categoria/${id}`);
        return resposta.data

    } catch(erro) {
        throw erro;
    }
}

//buscar itens carrinho
export async function BuscarItensCarrinho(id) {
    try {
        const resposta = await api.get(`/usuario/${id}/carrinho`)
        return resposta.data
    }
    catch(erro) {
        throw erro;
    }
}

//produtos favoritos
export async function BuscarItensSalvos(id){
    try{
        const resposta = await api.get(`/usuario/${id}/favoritos`);
        return resposta.data
    }
    catch (erro){
        throw erro;
    }
}

//buscar comentarios dos produtos
export async function BuscarComentariosProd(id){
    try {
        const resposta = await api.get(`/produto/${id}/comentarios`)
        return resposta.data

    } catch(erro) {
        throw erro;
    }
}

export function BuscarImagem(imagem){
    
    return (`${api.getUri()}/${imagem}`)    
    // http://129.148.42.252:5012/tools\\capasFilmes\\07824752478hh0yfbfy3uhyhyfuh
}