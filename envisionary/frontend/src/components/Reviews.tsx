import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Rating, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS_BY_COUNTRY_NAME } from '../graphql/queries';
import { IReview } from "../types"
import { useState } from "react";
import PaginationReviews from "./PaginationReviews";

function Reviews() {

  let number = 0;
  const location = useLocation();
  const { loading, error, data, refetch } = useQuery(GET_REVIEWS_BY_COUNTRY_NAME, { variables: { country: location.state.country.Country } });
  // Fetches any new reviews before displaying reviews section
  refetch();

  if (loading) return <p>Loading reviews ...</p>;
  if (error) return <p>Could not get reviews</p>;

  // Order reviews from new-old
  const sortReviews = () => {
    let reviews = [...data?.countryByName?.Reviews];
    reviews.sort((firstReview: IReview, nextReview: IReview) => Date.parse(nextReview.Date) - Date.parse(firstReview.Date));
    return reviews;
  }

  return (
        <>
          <PaginationReviews showReviews={!data.countryByName.Reviews} sortReviews={sortReviews()} country={location.state.country.Country} />
        </>
  );
}
export default Reviews;