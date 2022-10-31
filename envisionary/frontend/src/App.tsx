import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Feed from './pages/Feed'
import Country from './pages/Country'
import GiveReview from './pages/GiveReview';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/country' element={<Country />} />
          <Route path='/give-review' element={<GiveReview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
