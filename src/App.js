import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import MenuBar from './componentes/layout/MenuBar';

import Home from './componentes/pages/Home'
import Gerenciar from './componentes/pages/Gerenciar';
import Tabela from './componentes/pages/Tabela'
function App() {
  return (
    <Router>

      
      <MenuBar/>
      <Routes>
        <Route exact path='/' element ={<Home/>} />
        <Route exact path='/gerenciar' element ={<Gerenciar/>} />
        <Route exact path='/tabela' element={<Tabela/>}/>
      </Routes>
  </Router>
  );
}

export default App;
