function saudacao(nome: string): string {
  return `Olá, ${nome}!`;
}

const nomeUsuario = "Davi_Chupa_Manga";
const mensagem = saudacao(nomeUsuario);

console.log(mensagem);
