import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:5000"
})

////retornar noticias

//todas as noticias
export async function todasNoticias(){
    const resposta = await api.get(`/noticia`)
    return resposta.data
}

//noticia por id
export async function NoticiasID(id){
    const resposta = await api.get(`/noticia/${id}`)
    return resposta.data
}