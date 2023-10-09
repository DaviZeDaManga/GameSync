import axios from 'axios';

const api = axios.create({
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