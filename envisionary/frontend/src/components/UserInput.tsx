import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { categoryState, searchQueryState } from '../states/states';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ICountry } from '../types';
import PaginationFunctions from '../utils/PaginationFunctions';
import { Pagination, Stack, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

interface Props {
  queryFilteredCountries: Array<ICountry>;
}

function UserInput({ queryFilteredCountries }: Props) {
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [onPage, setOnPage] = useState(1);
  // const [orderCountryAlphabetically, setOrderCountryAlphabetically] = useState(false);
  const [orderDescPopulation, setOrderDescPopulation] = useState(false);
  const [orderAscendingPopulation, setOrderAscendingPopulation] = useState(false);
  const [orderContinentAlphabetically, setOrderContinentAlphabetically] = useState(false);
  
  


  const navigate = useNavigate()
  const elementsPerPage = 7;

  // Routing to each country
  const toCountryPage = (country: ICountry) => {
    navigate('/country', { state: { country } })
  }

  // Styling of the table headers
  const tableHeadStyling = { fontWeight: 'bold' }

  // Skips/goes and goes to next page 
  const handlePagination = (e: ChangeEvent<unknown>, p: number) => {
    dataPage.skip(p);
    setOnPage(p);
  }

  const history = useNavigate();

  const labelSearch = "Search after " + category.toLowerCase();

  // Sets category based on user input
  const handleChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value as string);
  };

  // To ensure that the SPA requirement is achieved in the search (doesnt change url on search)
  async function onSubmit(e: React.FormEvent) {
    history(`?=${searchQuery}`, { replace: true });
    e.preventDefault();
  }

  // Make pagination go back to page 1 whenever user changes input
  const detectAnyChanges = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { value }
    } = e;

    handlePagination(e, 1);
  }

  // TODO: må fikse any verdien her UFF
  const newArray: any[] = []
  for (let i = 0; i < queryFilteredCountries.length; i++) {
    if (queryFilteredCountries[i].Population2022 != null) {
      newArray.push(queryFilteredCountries[i]);
    }
  }
    
  function checkFilters() {
    if (orderDescPopulation) {
      newArray.sort((a, b) => {return parseInt(b.Population2022) - parseInt(a.Population2022);})
    } else if (orderAscendingPopulation) {
      newArray.sort((a, b) => {return parseInt(a.Population2022) - parseInt(b.Population2022);})
    } else if (orderContinentAlphabetically) {
      newArray.sort((a, b) => {return a.Continent.localeCompare(b.Continent)});
    }
  }


  const numberOfPages = Math.ceil(newArray.length / elementsPerPage);
  const dataPage = PaginationFunctions(newArray, elementsPerPage);

  checkFilters();

  function checkValue(value: Boolean) {
    if (value) {
      return false;
    }
    return true;
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
    <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
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
      onChange={detectAnyChanges}
      />
    </form>
      <FormControl fullWidth sx={{width: '150px', ml: "10px"}}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
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
                 <TableCell sx={tableHeadStyling}>Country<SortIcon /></TableCell>
                 <TableCell sx={tableHeadStyling} align="right">Continent<SortIcon onClick={(e) => {setOrderContinentAlphabetically(checkValue(orderContinentAlphabetically))}}/></TableCell>
                 <TableCell sx={tableHeadStyling} align="right">Population (2022)<SortIcon onClick={(e) => {setOrderAscendingPopulation(checkValue(orderAscendingPopulation))}}/></TableCell>
                 <TableCell sx={tableHeadStyling} align="right">Area (km&#178;)<SortIcon /></TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {dataPage.dataDisplaying().length == 0 ? <TableRow><TableCell colSpan={4}>Sorry, no results matched your search</TableCell></TableRow> :
               dataPage.dataDisplaying().map((row: ICountry ) => (
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
                       size='small'
                       page={onPage}
                       onChange={handlePagination}
                       className="pagination"
                   />
                   <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto', fontSize: '16px'}}>{onPage} of {numberOfPages == 0 ? "1" : numberOfPages}</Typography>
           </Stack>}
         </TableContainer>
         </>
  )
}
export default UserInput