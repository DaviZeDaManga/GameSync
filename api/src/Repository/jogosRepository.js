import { conx } from "./connecion.js";





//retornar games
export async function BuscarGames(){
    const comando = `SELECT * FROM tb_jogos;`
    
    const [linhas] = await conx.query(comando)
    return linhas
}

//jogo por id
export async function BuscarGamesID(id){
    const comando = `SELECT * FROM tb_jogos WHERE id_jogos = ?;`
  
    const [linhas] = await conx.query(comando, [id])
    return linhas
  }