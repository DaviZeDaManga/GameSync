import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Produto from './pages/produto';
import Planos from './pages/planos';
import Conquistas from './pages/conquistas';
import MudarPerfil from './pages/changes';
import Navegar from './pages/navegar';
import Admin from './pages/admin';
import GameSync from './pages/GameSync';
import Descobrir from './pages/descobrir';
import Cadastro from './pages/cadastro';
import EscolherLogin from './pages/escolherconta';

export default function Routess(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Descobrir/>} />
                <Route path="/produto" element={<Produto/>} />
                <Route path='/planos' element={<Planos/>} />
                <Route path='/conquistas' element={<Conquistas/>} />
                <Route path='/perfil' element={<MudarPerfil/>} />
                <Route path='/procurar' element={<Navegar/>} />
                <Route path='/admin' element={<Admin/>} />
                <Route path='/sobregamesync' element={<GameSync/>} />
                <Route path='/login' element={<Cadastro/>} />
                <Route path='/escolherlogin' element={<EscolherLogin/>} />
            </Routes>
        </BrowserRouter>
    )
}