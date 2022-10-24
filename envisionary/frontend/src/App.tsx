import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Feed from './pages/Feed'
import Country from './pages/Country'

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/country' element={<Country/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
