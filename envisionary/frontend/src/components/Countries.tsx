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

  // const fetchData = () => {
  //   setCountries(countriesJson)
  // }

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
      const lengthOfQuery = query.length;
      const modifiedQuery = query[0].toUpperCase() + query.substring(1, lengthOfQuery).toLowerCase();
      query = modifiedQuery;
    } 

    // TODO: Må finne ut hvordan man kan bare bruke category i stedet for å hardkode inn alle verdiene :,)
    return countries.filter((country: any) => {
      if (category == "Country") {
        const countryName = country.Country;
        if (countryName != null) {
          if (countryName.includes(query)) {
            return countryName.includes(query)
          }
        }
      } else if (category == "Population") {
        const countryPopulation = country.Population2022;
        if (countryPopulation != null) {
          if (countryPopulation.includes(query)) {
            return countryPopulation.includes(query)
          }
        }
      } else if (category == "Area") {
        const countryArea = country.Area;
        if (countryArea != null) {
          if (countryArea.includes(query)) {
            return countryArea.includes(query);
          }
        }
      } else if (category == "Continent") {
        const countryContinent = country.Continent;
        if (countryContinent != null) {
          if (countryContinent.includes(query)) {
            return countryContinent.includes(query);
          }
        }
      }
      
    })
  }

  const testCountries = filterCountries(data.countries, searchQuery)
  console.log(testCountries)

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
          {testCountries.map((row: any ) => (
            <TableRow
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