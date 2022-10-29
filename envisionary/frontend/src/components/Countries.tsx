import { useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { categoryState, searchQueryState } from '../states/states';
import { GET_COUNTRIES, GET_COUNTRIES_PAGINATION } from '../graphql/queries';
import { ICountry, IPagination } from '../types';
import UserInput from './UserInput';
import { useState } from 'react';

const PAGE_SIZE = 7;

function Countries() {
  const [page, setPage] = useState(0);
  const { loading, error, data, fetchMore } = useQuery(GET_COUNTRIES_PAGINATION, {
    variables: {
      limit: PAGE_SIZE,
      offset: page,
    }
  });

  console.log(fetchMore)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const checkIfPageInvalid = (page: number) => {
    if (page == 33) {
      return true;
    } 
    return false;
  }

  return (
    <>
    <nav>
      <button disabled={!page} onClick={() => setPage(prev => prev - 1)}>Previous</button>
      <span>Page {page + 1} </span>
      <button disabled={checkIfPageInvalid(page)} onClick={() => setPage(prev => prev + 1)}>Next</button>
    </nav>
    <ul>
      {data.paginatedCountries.map((launch: IPagination) => (
        <li key={launch._id}>{launch.Country}, {launch.Continent}, {launch.Population2022}, {launch.Area}.</li>
      ))}
    </ul>
    </>
  );
}
export default Countries