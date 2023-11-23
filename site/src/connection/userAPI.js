import axios from "axios";

const api = axios.create({
    baseURL: 'http://129.148.42.252:5012'
     //baseURL: 'http://localhost:5000'
});

export async function LoginUser(email, senha){
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

export async function CadastroUsuario(nome, telefone, cpf, email, senha){
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

export async function MudarDadosUser(nome, email, senha, telefone, id){
    try{
        const r = await api.put(`/usuario/New/${id}`, {
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

export async function DadosUser(id){
    const resposta = await api.get(`/usuario/${id}`)
    return resposta
}

export async function FotoUsuario(id, imagem){

    const formData = new FormData();
    formData.append('imagens', imagem);

    const resposta = await api.put(`/usuario/${id}/imagens`, formData,{
        headers:{
            "Content-Type": "multipart/form-data", 
        },
    })
    return resposta.status
}

export async function FotoNova(id, imagem){
    const formData = new FormData();
    formData.append('imagens', imagem);

    const resposta = await api.put(`usuario/${id}/mudar`, formData,{
        headers:{
            "Content-Type": "multipart/form-data", 
        },
    })
    return resposta.status
}///usuario/:id/mudar