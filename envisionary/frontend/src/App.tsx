import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Feed from './pages/Feed'
import Country from './pages/Country'
import GiveReview from './pages/GiveReview';
import InfoPage from './pages/InfoPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/country' element={<Country />} />
          <Route path='/give-review' element={<GiveReview />} />
          <Route path='/info-page' element={<InfoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
