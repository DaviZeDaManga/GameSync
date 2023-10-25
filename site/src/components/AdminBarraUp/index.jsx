import './index.scss';
import storage from 'local-storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdmBarraUp(props){

    const [Admin, setAdmin] = useState('');
    const [nome, setNome] = useState('');
    let [pesquisar, setPesquisar] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        if(!storage('admin-logado')){
            navigate('/admin')
        }
        else{
            const NomeAdm = storage('admin-logado');
            setAdmin(NomeAdm.email);

            // Dividido a string e definimos o nome aqui
            const nomeUsuario = NomeAdm.email.split('@')[0];
            setNome(nomeUsuario);
        }
    }, [])

    async function Enter(event) {
        if (event.key === "Enter") {
            if (navigate && navigate('/admin/MudarProduto')) {
                // Redirecionar apenas se não estiver na página /admin/MudarProduto
                navigate('/admin/MudarProduto');
            }
        }
    }    

    // Verifica se Admin está definido antes de usá-lo
    const primeiraLetra = Admin ? Admin[0].toUpperCase() : '';

    return(
        <article className="pesquisar">
            <div className="pesquisar-barra">
                <input type="text" placeholder='Pesquise o nome do Jogo' value={pesquisar} onChange={e => setPesquisar(e.target.value)} onKeyDown={Enter}/>
            </div>

            <div className="adm-logado">
                <h1>Bem-Vindo👾{nome}</h1>
                <span>{primeiraLetra}</span>
            </div>
        </article>
    )
}
