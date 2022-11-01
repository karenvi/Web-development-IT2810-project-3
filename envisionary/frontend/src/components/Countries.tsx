import { Box, Button, Checkbox, Grid, SelectChangeEvent, TableContainer } from '@mui/material';
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

const pageSize = 10;

// Styling of the table headers
const tableHeadStyling = { fontWeight: 'bold' };

// Styling of next and prev buttons
const buttonStyling = { backgroundColor: '#31597a', '&:hover': { backgroundColor: '#172A3A' } }


function Countries() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [page, setPage] = useRecoilState(pageState);
  // This state takes in the value from the dropdown
  const [sortingCategory, setSortingCategory] = useState("Country-asc");
  // A clean "value" from the dropdown, default country and ascending order
  const [finalSortingCategory, setFinalSortingCategory] = useState("Country");
  const [sortDescending, setSortDescending] = useState(false);
  const [hideUnreviewedCountries, setHideUnreviewed] = useState(false);

  const navigate = useNavigate()

  const { loading, error, data, refetch } = useQuery(GET_COUNTRIES_PAGINATION, {
    variables: {
      limit: pageSize,
      offset: page,
      sortOn: finalSortingCategory,
      sortDesc: sortDescending,
      filterOn: category,
      searchFieldValue: searchQuery,
      hideUnreviewed: hideUnreviewedCountries,
    }
  });
  refetch();

  //if (loading) return <p>Loading...</p>; TODO: ADD ANOTHER SOLUTION FOR COMMUNICATING "LOADING" TO USER
  if (error) return <p>Error - could not load data.</p>;

  // Routing to each country
  const toCountryPage = (country: ICountry) => {
    navigate('/country', { state: { country } });
    setPage(0);
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
    <Box component="main" sx={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', width: '100%'
    }}>
      <UserInput />
      <TableContainer sx={{ width: { xs: '95%', sm: '85%', md: '75%', lg: '65%' }, m: '10px', mb: "200px" }} component={Paper}>
        <Table aria-label="Table of countries">
          <TableHead>
            <TableRow>
              {/* Let user pick what the data displayed should be sorted on */}
              <TableCell colSpan={2} sx={tableHeadStyling}>
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
              <TableCell colSpan={2} sx={tableHeadStyling} align="right">
                Hide unreviewed countries<Checkbox
                  checked={hideUnreviewedCountries}
                  onChange={(event) => {
                    setHideUnreviewed(event.target.checked);
                    setPage(0);
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
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

            {data?.paginatedCountries.length === 0
              ? <TableRow><TableCell colSpan={4}>Sorry, no results matched your search</TableCell></TableRow>
              : data?.paginatedCountries.map((row: ICountry) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => { toCountryPage(row) }}
                  hover={true}
                >
                  <TableCell component="th" scope="row" className="pointer">{row.Country}</TableCell>
                  <TableCell align="right" className="pointer">{row.Continent}</TableCell>
                  <TableCell align="right" className="pointer">{parseInt(row.Population2022).toLocaleString()}</TableCell>
                  <TableCell align="right" className="pointer">{parseInt(row.Area).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            {/* Pagination */}
            <TableRow>
              <TableCell colSpan={4}>
                {data?.paginatedCountries.length !== 0
                  && <Grid container direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mt: '10px', mb: '20px' }}>
                    <Grid sx={{ ml: "20px" }}>
                      <Button variant="contained" disabled={!page} onClick={() => setPage(prev => prev - 1)} sx={buttonStyling}>Previous</Button>
                    </Grid>
                    <Grid sx={{ mb: "5px" }}>
                      Page {page + 1}
                    </Grid>
                    <Grid sx={{ mr: "20px" }}>
                      <Button variant="contained" disabled={checkIfPageInvalid()} onClick={() => setPage(prev => prev + 1)} sx={buttonStyling}>Next</Button>
                    </Grid>
                  </Grid>}
                {(page >= 1 && data?.paginatedCountries.length === 0)
                  && <Button variant="contained" disabled={!page} onClick={() => setPage(prev => prev - 1)} sx={buttonStyling}>Previous page</Button>}
              </TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}
export default Countries