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
import Dashboard from './pages/admin/build'
import AddProduct from './pages/admin/AddProducts'
import EditarExcluir from './pages/admin/changes'
import Addnews from './pages/admin/AddNews'
import Game from './pages/web/game'
import Engine from './pages/web/engine'
import PayCard from './pages/web/PayCard'
import Pesquisa from './pages/web/pesquisar'
import Gamespage from './pages/web/gamespage'

import AddProductTest from './test/test'

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
                <Route path='/games' element={<Gamespage/>} />
                <Route path='/games/jogar/:id' element={<Game/>} />
                <Route path='/planos/engine' element={<Engine/>} />
                <Route path='/PayCard' element={<PayCard/>} />
                <Route path='/pesquisar' element={<Pesquisa/>} />

                <Route path='/escolherlogin' element={<EscolherLogin/>} />
                <Route path="/login" element={<LoginUsuario/>} />
                <Route path="/noticias" element={<Noticias/>} />
                <Route path='/gamegrupos/:id' element={<Grupos/>} />
                <Route path='/produto/:id/jogosparecidos' element={<JogosParecidos/>} />
                <Route path='/' element={<Home/>} />

                <Route path='/admin/dashboard' element={<Dashboard/>} />
                <Route path='/admin' element={<CadastroAdmin/>} />
                <Route path='/admin/addproduts' element={<AddProduct/> }/>
                <Route path='/admin/MudarProduto' element={<EditarExcluir/>} />
                <Route path='/admin/AddNews' element={<Addnews/>} />

                <Route path='*' element={<NotFound/>} />
               <Route path='/teste' element={<AddProductTest/>} />
            </Routes>
        </BrowserRouter>
    )
}