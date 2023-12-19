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

//produtos por categoria
export async function BuscarProdutosCT(id){
    const resposta = await api.get(`/categorias/${id}`);
    return resposta.data
}

//buscar comentarios dos produtos
export async function BuscarComentariosProd(id){
    const resposta = await api.get(`/produtos/${id}/comentarios`)
    return resposta.data
}

//produtos favoritos
export async function TodosFaBuscarProdutosFVvoritos(id){
    try{
        const resposta = await api.get(`/favoritos/${id}`);
        return resposta.data
    }
    catch (erro){
        throw erro;
    }
}

export function BuscarImagem(imagem){
    console.log(api.getUri())
    return `${api.getUri()}/${imagem}`
    // http://129.148.42.252:5012/tools\\capasFilmes\\07824752478hh0yfbfy3uhyhyfuh
}