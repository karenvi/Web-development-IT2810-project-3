import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { testRecoilState } from './states/states';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import Header from './components/Header/Header';
import Feed from './pages/Feed'
import Book from './pages/Book'
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(({ title, author }: {title: string, author: string}) => (
      <div>
      <h3>{title}</h3>
      <br />
      <b>Author: </b>
      <p>{author}</p>
      </div>
  ));
}

function App() {
  const [testRecoil, setTestRecoil] = useRecoilState(testRecoilState);

  const handleChange = () => {
    setTestRecoil(testRecoil+1);
  }

  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/book' element={<Book/>}/>
          {/* ENVISIONARY... 
          <br/>
          <Button onClick={handleChange} variant="contained">CLICK ME</Button>
          <br/>
          Result of recoil state:
          {testRecoil} */}
        </Routes>
      </Router>
      <DisplayLocations />
    </div>
  );
}

export default App;
