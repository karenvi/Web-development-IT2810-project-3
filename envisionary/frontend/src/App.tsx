import './App.css';
import { testRecoilState } from './states/states';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
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

  return data.books.map(({ title, author }) => (
      <div>
      <h3>{title}</h3>
      <br />
      <b>About this location:</b>
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
      ENVISIONARY... 
      <br/>
      <Button onClick={handleChange} variant="contained">CLICK ME</Button>
      <br/>
      Result of recoil state:
      {testRecoil}
      <DisplayLocations />
    </div>
  );
}

export default App;
