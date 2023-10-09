import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000'   
});

export async function CadastrarProduto(nome, preco, precoPro, destaque, promocao, disponivel, qtd, details, categoria, admin){
    const resposta = await api.post('/produto', {
        nome: nome,
        preco: preco,
        precoPro: precoPro,
        destaque: destaque,
        promocao: promocao,
        disponivel: disponivel,
        qtd: qtd,
        details: details,
        categoria: categoria,
        admin: admin
    })
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

export function BuscarJodoID(imagem){
    console.log(api.getUri())
    return `${api.getUri()}/${imagem}`
    // http://localhost:5000/tools\\capasFilmes\\07824752478hh0yfbfy3uhyhyfuh
}