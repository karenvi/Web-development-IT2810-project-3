import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import countriesJson from './countries.json'
import { useNavigate } from 'react-router-dom';

function Countries() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const navigate = useNavigate()

  // Code for the searchbar
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');

  interface ICountry {
    _id: {
      $oid: string
    },
    Rank: string,
    CCA3: string,
    Country: string,
    Capital: string,
    Continent: string,
    Population2022: string,
    Population2020: string,
    Population2015: string,
    Population2010: string,
    Population2000: string,
    Population1990: string,
    Population1980: string,
    Population1970: string,
    Area: string,
    Density: string,
    GrowthRate: string,
    WorldPopulationPercentage: string
  }

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    setCountries(countriesJson)
  }

  const toCountryPage = (country: ICountry) => {
    navigate('/country', {state: {country}})
  }

  const tableHeadStyling = {fontWeight: 'bold'}

  const filterCountries = (countries: any, query: String | null) => {
    if (!query) {
      return countries;
    }
    return countries.filter((country: any) => {
      const countryName = country.Country.toLowerCase();
      return countryName.includes(query);
    })
  }

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
          {filterCountries(countries, query).map((row: any ) => (
            <TableRow
              key={row._id.$oid}
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
export default Countries