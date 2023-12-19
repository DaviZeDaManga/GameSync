import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000'
})

//retornar jogos

//todos os jogos
export async function BuscarGames(){
    const resposta = await api.get('/games');
    return resposta.data
}

//jogo por id
export async function BuscarGamesID(id){
    const resposta = await api.get(`/games/${id}`);
    return resposta.data
}