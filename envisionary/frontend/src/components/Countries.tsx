import { useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { categoryState, searchQueryState } from '../states/states';
import CountriesPagination from './CountriesPagination';
import {GET_COUNTRIES} from './CountriesQuery';

function Countries() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [category, setCategory] = useRecoilState(categoryState);

  // Code for the searchbar
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  if (query) {
    setSearchQuery(query);
  }

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
    <CountriesPagination queryFilteredCountries={queryFilteredCountries} />
  );
}
export default Countries