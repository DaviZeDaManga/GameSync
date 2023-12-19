import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
})

////login adm

//login
export async function LoginAdm(email, senha, codigo){
    try {
        const r = await api.post('/admin/login', {
            email: email,
            senha: senha,
            codigo: codigo
        });
        return r.data;
    } catch (err) {
        // O código aqui é executado quando ocorre um erro na solicitação
        console.error(err); 
        throw err; // Lança o erro para que ele possa ser tratado fora desta função
    }
}

//mudar senha
export async function MudarSenha(id, senha){
    try{
        const r = await api.put(`/admin/${id}/alter/senha`, {
            senha: senha
        });
        return r.data // ou status???
    }
    catch(err){
        console.log(err)
        throw(err)
    }
}




///acoes adm Produto

//inserir 
export async function InserirProduto(produto) {
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

//inserir imagem
export async function InserirImagemProd(id, imagem){

    const formData = new FormData();
    formData.append('imagens', imagem);

    const resposta = await api.put(`/produto/${id}/imagem`, formData,{
        headers:{
            "Content-Type": "multipart/form-data", 
        },
    });
    return resposta.status //não tem conteudo ele retorna 204
}

//inserir video
export async function InserirVideoProd(produto, url) {
    try {
        const resposta = await api.post('/produto/video', {
            produto: produto,
            url: url
        });
        return resposta.data; // Retorne apenas os dados da resposta.
    } catch (erro) {
        throw erro; // Rejeite a promessa em caso de erro.
    }
}

//inserir produto a tabela intermediaria
export async function InserirCategoriaProd(tabela){
    const resposta = await api.post('/produto/categoria', tabela)
    return resposta.data
}

//alterar informacoes
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

//alterar imagem
export async function AlterarImageProd(id, image){
    const formData = new FormData();
    formData.append('imagens', image);

    const linhas = await api.put(`/produto/${id}/imagem`, formData,{
        headers:{
            "Content-Type": "multipart/form-data", 
        },
    });
    return linhas.status
}

//alterar video
export async function AlterarVideoProd(id, url){
    const resposta = await api.put(`/produto/${id}/video`, {
        url: url
    })
    return resposta.status
}

//alterar categoria
export async function AlterarCategoriaProd(id, idcategoria){
    const resposta = await api.put(`/produto/${id}/categoria`, {
        idcategoria: idcategoria
    })
    return resposta.status
}

//deletar produto
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








////acoes noticias

//inserir noticia
export async function InserirNoticia(titulo, subtitulo, texto) {
    try {
        const resposta = await api.post(`/noticia`, {
            titulo: titulo,
            subtitulo: subtitulo,
            texto: texto
        });
        console.log(resposta.data)
        return resposta.data;
    } catch (erro) {
        throw erro;
    }
}

//inserir imagem
export async function InserirImagemNot(id, imagem) {
    const formData = new FormData();
    formData.append('imagens', imagem);

    const resposta = await api.put(`/noticia/${id}/imagem`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return resposta.status;
}