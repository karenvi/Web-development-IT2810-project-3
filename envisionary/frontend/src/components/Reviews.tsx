import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Rating, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  let number = 0;

  interface IReview {
    Name: string
    ReviewText: string,
    Date: string,
    Rating: number
  }

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    setReviews(
      [
        {"Name": "Sara", "ReviewText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat turpis at lorem venenatis tempor. Mauris rhoncus nulla in lectus porta, non accumsan arcu faucibus. Quisque congue venenatis orci ut ultrices. Fusce id laoreet urna. Donec libero ipsum, volutpat at maximus ac, viverra sed ante. Curabitur ut leo eu sapien vestibulum ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras varius commodo augue nec tempor. Etiam ipsum risus, ornare a imperdiet quis, porta non lorem. Morbi sem risus, dictum non felis sit amet, lacinia semper urna. Phasellus ultrices arcu ex, at efficitur lorem rutrum id.", "Date": "24-10-2022", "Rating": 4},
        {"Name": "Kari", "ReviewText": "Very warm and nice here.", "Date": "16-10-2022", "Rating": 3.5},
      ]
    )
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Reviews</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {reviews.map((row: IReview) => (
          <Paper variant="outlined" key={number++} sx={{mb: 2}}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={9} sx={{display: 'flex', flexDirection: 'row'}}>
                <Typography fontWeight='bold'>{row.Name}</Typography>
                <Typography mx={0.5}>rated it</Typography>
                <Rating name="read-only" 
                  value={row.Rating} 
                  precision={0.5}
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography color='gray' align="right">{row.Date}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="left">{row.ReviewText}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
export default Reviews