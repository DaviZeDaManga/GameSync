import axios from "axios";

const api = axios.create({  
    baseURL: 'http://localhost:5000'
});

// export async function BuscarClientesNome(nome) {
//     try {
//         const resposta = await api.get(`/batepapos/buscar?nome=${nome}`)
//         return resposta.data;
//     } 
//     catch (error) {
//         if (error.response && error.response.status === 404) {
//             return [];
//         } else {
//             throw error;
//         }
//     }
// }







//criar batepapo
export async function CriarNovoBatepapo(id_batepapo, tema) {
    try {
        const resposta = await api.post(`/batepapos/novo`, {
            id_batepapo: id_batepapo,
            tema: tema
        })

        return resposta.status
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        } else {
            throw error;
        }
    }
}

//escolher o id do batepapo e depois o cliente q tera acesso
export async function InserirClientesBatepapo(id_batepapo, id_cliente, id_outro) {
    try {
        const resposta = await api.post(`/batepapo/novo/clientes`, {
            id_batepapo: id_batepapo,
            id_cliente: id_cliente,
            id_outro: id_outro
        })

        return resposta.status
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        } else {
            throw error;
        }
    }
}

//aparecer meus batepapos
export async function BuscarBatepapos(id) {
    try {
        const resposta = await api.get(`/batepapos/${id}/contatos`)
        return resposta.data;
    } 
    catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        } else {
            throw error;
        }
    }
}

//buscar dados de um batepapo
export async function BuscarBatepapo(id_batepapo, id_cliente) {
    try {
        const resposta = await api.get(`/batepapos/${id_cliente}/contatos/${id_batepapo}`)
        return resposta.data;
    } 
    catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        } else {
            throw error;
        }
    }
}

//buscar mensagens de um batepapo
export async function BuscarBatepaposMensagens(id) {
    try {
        const resposta = await api.get(`/batepapos/${id}/mensagens`)
        return resposta.data;
    } 
    catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        } else {
            throw error;
        }
    }
}