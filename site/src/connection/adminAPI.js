import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export async function LoginAdm(email, senha, codigo){

    const r = await api.post('/admin/login', {
        email: email,
        senha: senha,
        codigo: codigo
    });
    return r.data
}