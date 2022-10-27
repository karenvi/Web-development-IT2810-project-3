import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { ICountry } from './CountriesQuery';

interface Props {
    queryFilteredCountries: any;
}

function CountriesPagination({queryFilteredCountries}: Props) {


    const navigate = useNavigate()

    const toCountryPage = (country: ICountry) => {
        navigate('/country', {state: {country}})
    }
    const tableHeadStyling = {fontWeight: 'bold'}
    return (
        <TableContainer sx={{ width: '50%', m: '10px' }} component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeadStyling}>Country</TableCell>
              <TableCell sx={tableHeadStyling} align="right">Continent</TableCell>
              <TableCell sx={tableHeadStyling} align="right">Population (2022)</TableCell>
              <TableCell sx={tableHeadStyling} align="right">Area (km&#178;)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queryFilteredCountries.length == 0 ? <TableRow><TableCell colSpan={4}>Sorry, no results matched your search</TableCell></TableRow> :
            queryFilteredCountries.map((row: any ) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => {toCountryPage(row)}}
                hover={true}
              >
                <TableCell component="th" scope="row">{row.Country}</TableCell>
                <TableCell align="right">{row.Continent}</TableCell>
                <TableCell align="right">{parseInt(row.Population2022).toLocaleString()}</TableCell>
                <TableCell align="right">{parseInt(row.Area).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
export default CountriesPagination;