import { Observable, useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { categoryState, searchQueryState } from '../states/states';
import { GET_COUNTRIES } from '../graphql/queries';
import { ICountry } from '../types';
import UserInput from './UserInput';

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

  const filterCountries = (countries: Array<ICountry>, query: string) => {
    if (!query) {
      return countries;
    }

    // Make sure query is valid even though user types it without big capital letters etc.
    if (query) {
      const modifiedQuery = query.toLowerCase();
      query = modifiedQuery;
    }

    return countries.filter((country: ICountry) => {
      if (category == "Continent" || category == "Country") {
        const categoryValue = country[category];
        if (categoryValue !== null) {
          const countryValueNotNull = categoryValue.toLowerCase();
          if (countryValueNotNull.includes(query)) {
            return countryValueNotNull.includes(query)
          }
        }
      }
    })
  }

  const queryFilteredCountries = filterCountries(data.countries, searchQuery);

  return (
    <UserInput queryFilteredCountries={queryFilteredCountries} />
  );
}
export default Countries