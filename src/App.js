import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import MenuBar from './componentes/layout/MenuBar';

import Home from './componentes/pages/Home'
import Gerenciar from './componentes/pages/Gerenciar';
function App() {
  return (
    <Router>

      
      <MenuBar/>
      <Routes>
        <Route exact path='/' element ={<Home/>} />
        <Route exact path='/gerenciar' element ={<Gerenciar/>} />
      </Routes>
  </Router>
  );
}

export default App;
