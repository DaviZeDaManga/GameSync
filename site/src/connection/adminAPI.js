import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://129.148.42.252:5012'
    baseURL: 'http://localhost:5000'
})

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

///new
export async function MudarSenha(id, senha){
    try{
        const r = await api.put(`/admin/NewSenha/${id}`, {
            senha: senha
        });
        return r.data // ou status???
    }
    catch(err){
        console.log(err)
        throw(err)
    }
}