import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import MenuBar from './componentes/layout/MenuBar';

import Home from './componentes/pages/Home'
import Gerenciar from './componentes/pages/Gerenciar';
import Tabela from './componentes/pages/Tabela'
import CaixaDeMensagem from './componentes/pages/CaixaDeMensagem';
function App() {
  return (
    <Router>

      
      <MenuBar/>
      <Routes>
        <Route exact path='/' element ={<Home/>} />
        <Route exact path='/gerenciar' element ={<Gerenciar/>} />
        <Route exact path='/tabela' element={<Tabela/>}/>
        <Route exact path='/mensagens/*' element={<CaixaDeMensagem/>}/>
      </Routes>
  </Router>
  );
}

export default App;
