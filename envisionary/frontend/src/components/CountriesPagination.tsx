import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { ICountry } from './CountriesQuery';
import { useState } from 'react';
import PaginationFunctions from './PaginationFunctions';
import { Pagination, Stack, Typography } from '@mui/material';

interface Props {
    queryFilteredCountries: Array<any>;
}

function CountriesPagination({queryFilteredCountries}: Props) {
    const [onPage, setOnPage] = useState(1);
    const [sortByIncreasingPop, setSortByIncreasingPop] = useState(false);
    const [sortByDecreasingPop, setSortByDecreasingPop] = useState(true);
    const navigate = useNavigate();
    const elementsPerPage = 7;
    
    const toCountryPage = (country: ICountry) => {
        navigate('/country', {state: {country}})
    }

    const tableHeadStyling = {fontWeight: 'bold'}

    const handlePagination = (e: any, p: number) => {
        dataPage.skip(p);
        setOnPage(p);
    }

    const newArray: any[] = []
    for (let i = 0; i < queryFilteredCountries.length; i++) {
      if (queryFilteredCountries[i].Population2022 != null) {
        newArray.push(queryFilteredCountries[i]);
      }
    }
    
  function checkFilters() {
    if (sortByDecreasingPop) {
      newArray.sort((a: any, b: any) => {return parseInt(b.Population2022) - parseInt(a.Population2022);})  
    } else if (sortByIncreasingPop) {
      newArray.sort((a: any, b: any) => {return parseInt(a.Population2022) - parseInt(b.Population2022);})
    }
  }

  const numberOfPages = Math.ceil(newArray.length / elementsPerPage);
  const dataPage = PaginationFunctions(newArray, elementsPerPage);

  checkFilters();


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
            {dataPage.dataDisplaying().length == 0 ? <TableRow><TableCell colSpan={4}>Sorry, no results matched your search</TableCell></TableRow> :
            dataPage.dataDisplaying().map((row: any ) => (
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
        {dataPage.dataDisplaying().length == 0 ? <></> : 
        <Stack alignItems="center" sx={{pt: '10px', pb: "10px"}}>
                <Pagination
                    count={numberOfPages}
                    variant='outlined'
                    page={onPage}
                    onChange={handlePagination}
                    className="pagination"
                />
                <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto', fontSize: '16px'}}>{onPage} of {numberOfPages == 0 ? "1" : numberOfPages}</Typography>
        </Stack>}
      </TableContainer>
    );
}
export default CountriesPagination;