import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import booksJson from './books.json'

function Books() {
  const [books, setBooks] = useState<IBook[]>([]);

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