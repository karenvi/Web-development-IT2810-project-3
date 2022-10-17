import Books from '../components/Books';
import '../App.css'
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';

function Book() {
  const location = useLocation()
  console.log(location)

  return (
    <Card sx={{m: '3%'}}>
      <h1>{location.state.title}</h1>
    </Card>
  );
}

export default Book;
