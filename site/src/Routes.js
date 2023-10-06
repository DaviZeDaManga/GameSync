import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'

import Descobrir from './pages/web/descobrir'
import Produto from './pages/web/produto'
import Planos from './pages/web/planos'
import Conquistas from './pages/web/conquistas'
import MudarPerfil from './pages/web/changes'
import Navegar from './pages/web/navegar'
import GameSync from './pages/web/GameSync'
import Cadastro from './pages/web/cadastro'
import EscolherLogin from './pages/web/escolherconta'

import CadastroAdmin from './pages/admin/authentication'
import HomeAdmin from './pages/admin/home'

import NotFound from './errors'
export default function Routess(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Descobrir/>} />
                <Route path="/produto/:id" element={<Produto/>} />
                <Route path='/planos' element={<Planos/>} />
                <Route path='/conquistas/:id' element={<Conquistas/>} />
                <Route path='/perfil' element={<MudarPerfil/>} />
                <Route path='/procurar' element={<Navegar/>} />
                <Route path='/sobregamesync' element={<GameSync/>} />
                <Route path='/login' element={<Cadastro/>} />
                <Route path='/escolherlogin' element={<EscolherLogin/>} />

                <Route path='/admin/home' element={<HomeAdmin/>} />
                <Route path='/admin' element={<CadastroAdmin/>} />

                <Route path='*' element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}