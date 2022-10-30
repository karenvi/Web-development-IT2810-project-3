import { Button, Grid, SelectChangeEvent, TableContainer } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { categoryState, pageState, searchQueryState } from '../states/states';
import { ICountry } from '../types';
import UserInput from './UserInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES_PAGINATION } from '../graphql/queries';

const PAGE_SIZE = 10;

// Styling of the table headers
const tableHeadStyling = { fontWeight: 'bold' };


function Countries() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [page, setPage] = useRecoilState(pageState);
  // This state takes in the value from the dropdown
  const [sortingCategory, setSortingCategory] = useState("Country-asc");
  // A clean "value" from the dropdown, default country and ascending order
  const [finalSortingCategory, setFinalSortingCategory] = useState("Country");
  const [sortDescending, setSortDescending] = useState(false);
 
  const navigate = useNavigate()

  const { loading, error, data, fetchMore } = useQuery(GET_COUNTRIES_PAGINATION, {
    variables: {
      limit: PAGE_SIZE,
      offset: page,
      sortOn: finalSortingCategory,
      sortDesc: sortDescending,
      filterField: category,
      query: searchQuery,
    }
  });

  //if (loading) return <p>Loading...</p>; TODO: ADD ANOTHER SOLUTION FOR COMMUNICATING "LOADING" TO USER
  if (error) return <p>Error - could not load data.</p>;

  // Routing to each country
  const toCountryPage = (country: ICountry) => {
    navigate('/country', { state: { country } })
  }

  // TODO: Disable the next button if the user is on the last page (the solution right now is not really acceptable :/)
  const checkIfPageInvalid = () => {
    if (data?.paginatedCountries.length < 10) {
      return true;
    }
    return false;
  }

  // Passes in values for the parameters used to sort the data in the database
  const sortData = (event: SelectChangeEvent<string>) => {
    setSortingCategory(event.target.value);
    setFinalSortingCategory(event.target.value.split("-")[0]);
    if (event.target.value.split("-")[1] === 'desc') {
      setSortDescending(true);
    } else if (event.target.value.split("-")[1] === 'asc') {
      setSortDescending(false);
    }
    setPage(0);
  }

  return (
    <>
    <UserInput />
      <TableContainer sx={{ width: '50%', m: '10px' }} component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
        <TableRow>
          {/* Let user pick what the data displayed should be sorted on */}
        <TableCell colSpan={4} sx={tableHeadStyling}>
        <label htmlFor="header-search">
        <span className="visually-hidden">Sort by:</span>
        </label>
        <FormControl fullWidth sx={{ width: '300px', ml: "10px" }}>
        <InputLabel id="select-filter-category">Sort by:</InputLabel>
        <Select
        labelId="select-filter-category"
        id="filter-category"
        value={sortingCategory}
        label="Sort by:"
        onChange={sortData}
        >
        <MenuItem value='Country-asc'>Ascending country</MenuItem>
        <MenuItem value='Continent-asc'>Ascending continent</MenuItem>
        <MenuItem value='Country-desc'>Descending country</MenuItem>
        <MenuItem value='Continent-desc'>Descending continent</MenuItem>

        </Select>
        </FormControl>
        </TableCell>
        </TableRow>

        {/* Displaying fetched data */}
        <TableRow>
        <TableCell sx={tableHeadStyling}>Country</TableCell>
        <TableCell sx={tableHeadStyling} align="right">Continent</TableCell>
        <TableCell sx={tableHeadStyling} align="right">Population (2022)</TableCell>
        <TableCell sx={tableHeadStyling} align="right">Area (km&#178;)</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          
        {data?.paginatedCountries.length === 0 ? <TableRow><TableCell colSpan={4}>Sorry, no results matched your search</TableCell></TableRow> :
        data?.paginatedCountries.map((row: ICountry) => (
        <TableRow
        key={row._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        onClick={() => { toCountryPage(row) }}
        hover={true}
        >
        <TableCell component="th" scope="row">{row.Country}</TableCell>
        <TableCell align="right">{row.Continent}</TableCell>
        <TableCell align="right">{parseInt(row.Population2022).toLocaleString()}</TableCell>
        <TableCell align="right">{parseInt(row.Area).toLocaleString()}</TableCell>
        </TableRow>
        ))}
        {/* Pagination */}
        <TableRow>
          <TableCell colSpan={4}>
                  {data?.paginatedCountries.length === 0 ? <></> :
      <Grid container  direction="row" justifyContent="space-between" alignItems="flex-end" sx={{mt: '10px', mb: '20px'}}>
        <Grid sx={{ml: "20px"}}>
      <Button variant="contained" disabled={!page} onClick={() => setPage(prev => prev - 1)}>Previous</Button>
      </Grid>
      <Grid sx={{mb: "5px"}}>
      Page {page + 1}
      </Grid>
      <Grid sx={{mr: "20px"}}>
      <Button variant="contained" disabled={checkIfPageInvalid()} onClick={() => setPage(prev => prev + 1)}>Next</Button>
      </Grid>
      </Grid>}
          </TableCell>
        </TableRow>
        </TableBody>
        </Table>
       

      </TableContainer>
    </>
  );
}
export default Countries