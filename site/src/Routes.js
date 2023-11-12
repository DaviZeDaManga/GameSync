import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'

import Descobrir from './pages/web/descobrir'
import Produto from './pages/web/produto'
import Planos from './pages/web/planos'
import Conquistas from './pages/web/conquistas'
import MudarPerfil from './pages/web/changes'
import GameSync from './pages/web/GameSync'
import CadastroUser from './pages/web/authentication'
import LoginUsuario from './pages/web/log'
import EscolherLogin from './pages/web/escolherconta'
import Noticias from './pages/web/noticias'
import Grupos from './pages/web/grupos'
import Home from './pages/web/Home'
import JogosParecidos from './pages/web/jogosparecidos'
import Planosacess from './pages/web/planosacess'
import CadastroAdmin from './pages/admin/authentication'
import HomeAdmin from './pages/admin/home'
import AddProduct from './pages/admin/AddProducts'
import EditarExcluir from './pages/admin/changes'


import NotFound from './errors'
export default function Routess(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/descobrir" element={<Descobrir/>} />
                <Route path="/produto/:id" element={<Produto/>} />
                <Route path='/planos' element={<Planos/>} />
                <Route path='/conquistas/:id' element={<Conquistas/>} />
                <Route path='/perfil' element={<MudarPerfil/>} />
                <Route path='/planos/gamesync' element={<Planosacess/>} />
                <Route path='/gamesync' element={<GameSync/>} />
                <Route path='/cadastro' element={<CadastroUser/>} />

                <Route path='/escolherlogin' element={<EscolherLogin/>} />
                <Route path="/login" element={<LoginUsuario/>} />
                <Route path="/noticias" element={<Noticias/>} />
                <Route path='/gamegrupos/:id' element={<Grupos/>} />
                <Route path='/produto/:id/jogosparecidos' element={<JogosParecidos/>} />
                <Route path='/' element={<Home/>} />

                <Route path='/admin/home' element={<HomeAdmin/>} />
                <Route path='/admin' element={<CadastroAdmin/>} />
                <Route path='/admin/addproduts' element={<AddProduct/> }/>
                <Route path='/admin/MudarProduto' element={<EditarExcluir/>} />
                <Route path='*' element={<NotFound/>} />
               
            </Routes>
        </BrowserRouter>
    )
}