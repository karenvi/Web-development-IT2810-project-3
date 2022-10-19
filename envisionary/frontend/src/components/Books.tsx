import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import booksJson from './books.json'
import { useNavigate } from 'react-router-dom';

function Books() {
  const [books, setBooks] = useState<IBook[]>([]);
  const navigate = useNavigate()

  interface IBook {
    id: string;
    title: string;
    description: string;
    author: string;
  }

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    setBooks(booksJson)
  }

  const toBookPage = () => {
    navigate('/book', {state: {
      // id: "1",
      // title: "Building Data-Intensive Applications",
      // description: "The big ideas behind reliable, scalable and maintainable systems",
      // author: "Martin Kleppmann"
      
        _id: {
          $oid: "634d51042d68bfbb82171082"
        },
        Rank: "34",
        CCA3: "DZA",
        Country: "Algeria",
        Capital: "Algiers",
        Continent: "Africa",
        Population2022: "44903225",
        Population2020: "43451666",
        Population2015: "39543154",
        Population2010: "35856344",
        Population2000: "30774621",
        Population1990: "25518074",
        Population1980: "18739378",
        Population1970: "13795915",
        Area: "2381741",
        Density: "18.8531",
        GrowthRate: "1.0164",
        WorldPopulationPercentage: "0.56"
    }})
  }

  return (
    <TableContainer sx={{ width: '50%', m: '10px' }} component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Book</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((row: IBook) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => {toBookPage()}}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Books