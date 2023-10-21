import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000'   
});

export async function CadastrarProduto(produto){
    //console.log(produto);
    const resposta = await api.post('/produto', produto)
    return resposta.data
}

export async function InserirCategoriaProduto(tabela){
    const resposta = await api.post('/produto/categoria', tabela)
    return resposta.data
    console.log(tabela)
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

export function BuscarJodoID(imagem){
    console.log(api.getUri())
    return `${api.getUri()}/${imagem}`
    // http://localhost:5000/tools\\capasFilmes\\07824752478hh0yfbfy3uhyhyfuh
}

export  async function BuscarJogoNome(nome){
    const resposta = await api.get('') 
}

export async function ListarTodosJogos(){
    const resposta = await api.get('/produtos');
    return resposta.data
}