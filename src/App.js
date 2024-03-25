import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import MenuBar from './componentes/layout/MenuBar';

import Home from './componentes/pages/Home'
import Gerenciar from './componentes/pages/Gerenciar';
import Tabela from './componentes/pages/Tabela'
import CaixaDeMensagem from './componentes/pages/CaixaDeMensagem';


import ImportanteSemiPagina from './componentes/semiPaginas/ImportanteSemiPagina';
import LidoSemiPagina from './componentes/semiPaginas/LidosSemiPagina';
function App() {
  return (
    <Router>

      
      <MenuBar/>
      <Routes>
        <Route exact path='/' element ={<Home/>} />
        <Route exact path='/gerenciar' element ={<Gerenciar/>} />
        <Route exact path='/tabela' element={<Tabela/>}/>
        <Route exact path='/mensagens/*' element={<CaixaDeMensagem/>}/>
    
        <Route exact path='/mensagens' element={<CaixaDeMensagem/>} />
        <Route exact path='/mensagens/importante' element ={<ImportanteSemiPagina/>} />
        <Route exact path='/mensagens/lido' element={<LidoSemiPagina/>}/>
                        
            
      </Routes>
  </Router>
  );
}

export default App;
