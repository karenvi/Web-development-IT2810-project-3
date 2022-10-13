import './App.css';
import { testRecoilState } from './states/states';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';

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
    </div>
  );
}

export default App;
