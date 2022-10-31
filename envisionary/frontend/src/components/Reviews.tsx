import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Rating, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS_BY_COUNTRY_NAME } from '../graphql/queries';
import { IReview } from "../types"

function Reviews() {

  let number = 0;
  const location = useLocation();
  const { loading, error, data, refetch } = useQuery(GET_REVIEWS_BY_COUNTRY_NAME, { variables: { country: location.state.country.Country } });

  // Fetches any new reviews before displaying reviews section
  refetch();

  if (loading) return <p>Loading reviews ...</p>;
  if (error) return <p>Could not get reviews</p>;

  return (
    <>
      {!data.countryByName.Reviews ? <Typography>Nobody has reviewed {location.state.country.Country} yet</Typography> :
        <Accordion sx={{width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Reviews of {location.state.country.Country}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {data.countryByName.Reviews.map((row: IReview) => (
              <Paper variant="outlined" key={number++} aria-label="Review" sx={{ mb: 2 }}>
                <Grid container spacing={2} p={2}>
                  <Grid item md={8} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Typography fontWeight='bold'>{row.Name}</Typography>
                    <Typography mx={0.5}>rated it</Typography>
                    <Rating name="read-only"
                      value={row.Rating}
                      precision={0.5}
                      readOnly
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                  </Grid>
                  <Grid item md={4} sx={{ display: 'flex', flexDirection: 'row', width: "100%", justifyContent: {xs: 'start', sm: 'start', md: 'end'}}}>
                    <Typography color='gray' align="right" sx={{ fontSize: "14px" }}>
                      {new Date(row.Date).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography>
                  </Grid>
                  {row.ReviewText.length === 0 ? <></> 
                  : <Grid item xs={12}>
                      <Typography align="left">{row.ReviewText}</Typography>
                    </Grid>}
                </Grid>
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>}
    </>
  );
}
export default Reviews