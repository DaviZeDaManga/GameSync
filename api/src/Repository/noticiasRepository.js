import { conx } from "./connecion.js";



//todas as noticias
export async function BuscarNoticias(){
    const comando = `SELECT * FROM tb_noticia
    LEFT JOIN tb_noticia_imagem ON tb_noticia.id_noticia = tb_noticia_imagem.id_noticia;`
  
    const [linhas] = await conx.query(comando);
    return linhas;
}
  
//noticia por id
export async function BuscarNoticiasId(id){
    const comando = `SELECT * FROM tb_noticia
    LEFT JOIN tb_noticia_imagem ON tb_noticia.id_noticia = tb_noticia_imagem.id_noticia
    WHERE tb_noticia.id_noticia = ?;`
  
    const [linhas] = await conx.query(comando, [id]);
    return linhas;
}
