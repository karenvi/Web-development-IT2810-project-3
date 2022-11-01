import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS_BY_COUNTRY_NAME } from '../graphql/queries';
import { IReview } from "../types"
import PaginationReviews from "./PaginationReviews";

function Reviews() {
  const location = useLocation();
  const { loading, error, data, refetch } = useQuery(GET_REVIEWS_BY_COUNTRY_NAME, { variables: { country: location.state.country.Country } });
  // Fetches any new reviews before displaying reviews section
  refetch();

  if (loading) return <p>Loading reviews ...</p>;
  if (error) return <p>Could not get reviews</p>;

  // Order reviews from new-old
  const sortReviews = () => {
    if (data.countryByName.Reviews) {
      let reviews = [...data?.countryByName?.Reviews];
      reviews.sort((firstReview: IReview, nextReview: IReview) => Date.parse(nextReview.Date) - Date.parse(firstReview.Date));
      return reviews
    }
    return [];
  }

  return (
    <>
      <PaginationReviews sortReviews={sortReviews()} country={location.state.country.Country} />
    </>
  );
}
export default Reviews;