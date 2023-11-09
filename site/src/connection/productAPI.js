import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000'   
});

export async function CadastrarProduto(produto) {
    const resposta = await api.post('/produto', produto);
    if (resposta.status === 200) {
        //console.log("Resposta do servidor:", resposta.data);
        // Certifique-se de que a resposta inclui o ID do produto
        if (resposta.data.id) {
            return resposta.data.id; // Retorna o ID do produto
        } else {
            throw new Error('O servidor não retornou o ID do produto.');
        }
    } else {
        throw new Error('Erro ao cadastrar o produto.');
    }
}

export async function InserirCategoriaProduto(tabela){
    const resposta = await api.post('/produto/categoria', tabela)
    return resposta.data
}

export async function EnviarImagens(id, imagem){

    const formData = new FormData();
    formData.append('imagens', imagem);

    const resposta = await api.put(`/produto/${id}/imagens`, formData,{
        headers:{
            "Content-Type": "multipart/form-data", 
        },
    });
    return resposta.status //não tem conteudo ele retorna 204
}


export async function InserirVideo(produto, url) {
    try {
        const resposta = await api.post('/produto/video/url', {
            produto: produto,
            url: url
        });
        return resposta.data; // Retorne apenas os dados da resposta.
    } catch (erro) {
        throw erro; // Rejeite a promessa em caso de erro.
    }
}

///                           buscar

export function BuscarImagem(imagem){
    console.log(api.getUri())
    return `${api.getUri()}/${imagem}`
    // http://localhost:5000/tools\\capasFilmes\\07824752478hh0yfbfy3uhyhyfuh
}

export async function BuscarJogoNome(nome) {
    try {
        const resposta = await api.get(`/produto/buscar?nome=${nome}`);
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

export async function BuscarJogoID(id){
    try{
        const resposta = await api.get(`/produto/buscar/${id}`);
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

export async function ListarTodosJogos(){
    const resposta = await api.get('/produtos');
    return resposta.data
}


/////                      alterar

export async function ExcluirProduto(id){
    try {
        console.log(`Tentando excluir produto com ID: ${id}`);
        const resposta = await api.delete(`/produto/${id}`);
        console.log(`Resposta da exclusão: ${resposta.status}`);
        return resposta.status;
    } catch (erro) {
        console.error(`Erro ao excluir produto: ${erro}`);
        throw erro;
    }
}


export async function AlterarProduto(id, nome, preco, precoPro, destaque, promocao, disponivel, qtd, descricao, classificacao, lancamento, tamanho, empresa, desenvolvedor, categoria, admin ){
    const resposta = await api.put(`/produto/${id}`, {
        nome: nome,
        preco: preco,
        precoPro: precoPro,
        destaque: destaque,
        promocao: promocao,
        disponivel: disponivel,
        qtd: qtd,
        descricao: descricao,
        classificacao: classificacao,
        lancamento: lancamento,
        tamanho: tamanho,
        empresa: empresa,
        desenvolvedor: desenvolvedor,
        categoria: categoria,
        admin: admin
    }) 
    return resposta.data 
}

export async function AlterarVideo(id, url){
    const resposta = await api.put(`/produto/${id}/url`, {
        url: url
    })
    return resposta.status
}

export async function AlterarCategoriaEmP(id, idcategoria){
    const resposta = await api.put(`/produto/${id}/P`, {
        idcategoria: idcategoria
    })
    return resposta.status
}

export async function AlterarCategoriaEmCP(id, idcategoria){
    const resposta = await api.put(`/produto/${id}/CP`, {
        idcategoria: idcategoria
    })
    return resposta.status
}

export async function AlterarImage(id, image){
    const formData = new FormData();
    formData.append('imagens', image);

    const linhas = await api.put(`/mudar/${id}/imagens`, formData,{
        headers:{
            "Content-Type": "multipart/form-data", 
        },
    });
    return linhas.status
}



