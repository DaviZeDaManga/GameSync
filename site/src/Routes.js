import { BrowserRouter, Routes, Route } from 'react-router-dom'

//USER
//gamesync
import Home from './pages/web/1.Home'
import GameSync from './pages/web/1.GameSync'

//planos
import Planos from './pages/web/2.planos'
import Plano from './pages/web/2.plano'
import Engine from './pages/web/2.engine'

//produtos
import Produtos from './pages/web/3.produtos'
import Produto from './pages/web/3.produto'
import Conquistas from './pages/web/3.conquistas'
import JogosParecidos from './pages/web/3.jogosparecidos'
import Grupos from './pages/web/3.grupos'

//games
import Games from './pages/web/4.games'
import Game from './pages/web/4.game'

//do cliente
import Perfil from './pages/web/6.perfil'

//login
import CadastroUser from './pages/web/7.cadastro'
import LoginUser from './pages/web/7.login'
import LoginUserContas from './pages/web/7.loginContas'



//ADMIN
//admin
import CadastroAdmin from './pages/admin/authentication'
import Dashboard from './pages/admin/build'
import AddProduct from './pages/admin/AddProducts'
import EditarExcluir from './pages/admin/changes'
import Addnews from './pages/admin/AddNews'

//pageErros
import NotFound from './errors'

export default function Routess(){
    return(
        <BrowserRouter>
            <Routes>
                //USER
                //gamesync
                <Route path='/' element={<Home/>} />
                <Route path='/gamesync' element={<GameSync/>} />

                //planos
                <Route path='/planos' element={<Planos/>} />
                <Route path='/planos/:nomelano/:id' element={<Plano/>} />
                <Route path='/planos/:engine' element={<Engine/>} />

                //produtos
                <Route path='/produtos' element={<Produtos/>} />
                <Route path="/produtos/:nomejogo/:id" element={<Produto/>} /> 
                <Route path='/produtos/:nomejogo/:id/conquistas' element={<Conquistas/>} />
                <Route path='/produtos/:nomejogo/:id/jogosparecidos' element={<JogosParecidos/>} />
                <Route path='/gamegrupos/:id' element={<Grupos/>} />

                //games
                <Route path='/games' element={<Games/>} />
                <Route path='/games/:nomejogo/:id' element={<Game/>} />
        
                //do cliente
                <Route path='/perfil/:nomeperfil' element={<Perfil/>} />
                
                //login
                <Route path='/cadastro' element={<CadastroUser/>} />
                <Route path="/login" element={<LoginUser/>} />
                <Route path='/login/contas' element={<LoginUserContas/>} />



                //ADMIN
                //admin
                <Route path='/admin/dashboard' element={<Dashboard/>} />
                <Route path='/admin' element={<CadastroAdmin/>} />
                <Route path='/admin/addproduts' element={<AddProduct/> }/>
                <Route path='/admin/MudarProduto' element={<EditarExcluir/>} />
                <Route path='/admin/AddNews' element={<Addnews/>} />

                //pageErros
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}