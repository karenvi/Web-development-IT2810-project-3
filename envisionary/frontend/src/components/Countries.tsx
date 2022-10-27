import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { categoryState, searchQueryState } from '../states/states';
import { Stack } from '@mui/material';

function Countries() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  // const [countries, setCountries] = useState<ICountry[]>([]);
  const navigate = useNavigate()
  const [category, setCategory] = useRecoilState(categoryState);

  // Code for the searchbar
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  if (query) {
    setSearchQuery(query);
  }
  // Code for displaying data from the database
  const GET_COUNTRIES = gql`
    query Countries {
      countries {
        _id,
        Rank,
        CCA3,
        Country,
        Capital,
        Continent,
        Population2022,
        Population2020,
        Population2015,
        Population2010,
        Population2000,
        Population1990,
        Population1980,
        Population1970,
        Area,
        Density,
        GrowthRate,
        WorldPopulationPercentage
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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

  const toCountryPage = (country: ICountry) => {
    navigate('/country', {state: {country}})
  }

  const tableHeadStyling = {fontWeight: 'bold'}

  const filterCountries = (countries: any, query: String | null) => {
    if (!query) {
      return countries;
    } 

    // Make sure query is valid even though user types it without big capital letters etc.
    if (query) {
      const modifiedQuery = query.toLowerCase();
      query = modifiedQuery;
    } 

    return countries.filter((country: any) => {
      if (category != "") {
        const countryName = country[category];
        if (countryName != null) {
          const countryNameNotNull = countryName.toLowerCase();
          if (countryNameNotNull.includes(query)) {
            return countryNameNotNull.includes(query)
          }
        }
      }
    })
  }

  const queryFilteredCountries = filterCountries(data.countries, searchQuery);

  return (
    <TableContainer sx={{ width: '50%', m: '10px', minWidth: '520px'}} component={Paper}>
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
export default Countries