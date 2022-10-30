import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { categoryState, searchQueryState } from '../states/states';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES_PAGINATION } from '../graphql/queries';
import { ICountry } from '../types';


const PAGE_SIZE = 10;

// Styling of the table headers
const tableHeadStyling = { fontWeight: 'bold' };

function UserInput() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  // This state takes in the value from the dropdown
  const [sortingCategory, setSortingCategory] = useState("Country-asc");
  // A clean "value" from the dropdown, default country and ascending order
  const [finalSortingCategory, setFinalSortingCategory] = useState("Country");
  const [sortDescending, setSortDescending] = useState(false);
  const [page, setPage] = useState(0);
  const navigate = useNavigate()


  const { loading, error, data } = useQuery(GET_COUNTRIES_PAGINATION, {
    variables: {
      limit: PAGE_SIZE,
      offset: page,
      sortOn: finalSortingCategory,
      sortDesc: sortDescending,
      filterField: category,
      query: searchQuery,
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error - could not load data.</p>;

  // Routing to each country
  const toCountryPage = (country: ICountry) => {
    navigate('/country', { state: { country } })
  }

  const labelSearch = "Search after " + category.toLowerCase();

  const checkIfPageInvalid = (page: number) => {
    if (page === 23) {
      return true;
    } 
    return false;
  }

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
      <Box
        sx={{
          m: 5, p: '35px', width: '40%', maxWidth: '450px', minWidth: '330px', backgroundColor: 'white', display: 'flex', justifyContent: 'center',
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
          borderRadius: '10px'
        }}
      >
        <form>
          <label htmlFor="header-search">
            <span className="visually-hidden">Search by {category.toLowerCase()}</span>
          </label>
          <TextField
            label={labelSearch}
            variant="outlined"
            type="text"
            id="header-search"
            name="s"
            value={searchQuery}
            onInput={e => setSearchQuery((e.target as HTMLInputElement).value)}
          />
        </form>
        <FormControl fullWidth sx={{ width: '150px', ml: "10px" }}>
          <InputLabel id="demo-simple-select-label">Category:</InputLabel>
          <label htmlFor="header-search">
            <span className="visually-hidden">Select what to search category to search in</span>
          </label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category:"
            onChange={(e) => { setCategory(e.target.value as string)}}
          >
            <MenuItem value='Country'>Country</MenuItem>
            <MenuItem value='Continent'>Continent</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer sx={{ width: '50%', m: '10px' }} component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell colSpan={4} sx={tableHeadStyling}>
                <label htmlFor="header-search">
              <span className="visually-hidden">Sort by:</span>
            </label>
                <FormControl fullWidth sx={{ width: '400px', ml: "10px" }}>
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
            <TableRow>
              <TableCell sx={tableHeadStyling}>Country</TableCell>
              <TableCell sx={tableHeadStyling} align="right">Continent</TableCell>
              <TableCell sx={tableHeadStyling} align="right">Population (2022)</TableCell>
              <TableCell sx={tableHeadStyling} align="right">Area (km&#178;)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.paginatedCountries.length === 0 ? <TableRow><TableCell colSpan={4}>Sorry, no results matched your search</TableCell></TableRow> :
              data.paginatedCountries.map((row: ICountry) => (
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
          </TableBody>
        </Table>
        {data.paginatedCountries.length === 0 ? <></> :
          <nav>
          <button disabled={!page} onClick={() => setPage(prev => prev - 1)}>Previous</button>
          <span>Page {page + 1} </span>
          <button disabled={checkIfPageInvalid(page)} onClick={() => setPage(prev => prev + 1)}>Next</button>
        </nav>}
      </TableContainer>
    </>
  )
}
export default UserInput