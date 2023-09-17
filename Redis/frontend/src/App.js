import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Testpage from './components/Testpage' 
import Battlepage from './components/Battlepage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Testpage/>}/>
          <Route path='/battle' element={<Battlepage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
