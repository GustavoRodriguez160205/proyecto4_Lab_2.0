// BrowserRoutes : Gestiona todas las rutas
// Routes : Contiene las rutas
// Route : Componente Pagina Asociado

import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './paginas/Home'
import Registro from './paginas/Registro'
import NavBar from './Components/Navbar'
import Login from './paginas/Login'
import UserLog  from './paginas/UserLog'
import Contacts from './paginas/Contacts'
import Footer from './Components/Footer'

function App() {

  return (
  
    < BrowserRouter>
          
        <NavBar></NavBar>
        <div className='main'>
        <Routes>

                <Route path='/' element = {<Home></Home>} ></Route>
                <Route path='/Registro' element = {<Registro></Registro>} ></Route>
                <Route path='/Usuario' element = {<UserLog></UserLog>}></Route>
                <Route path='/Login' element = {<Login></Login>}></Route>
                <Route path='/Contactos' element = {<Contacts/>}></Route>

        </Routes>
        </div>
        <Footer></Footer>

    </BrowserRouter>
  )
}

export default App
