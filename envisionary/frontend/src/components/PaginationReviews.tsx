import { Accordion, AccordionDetails, AccordionSummary, Grid, Pagination, Paper, Rating, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS_BY_COUNTRY_NAME } from '../graphql/queries';
import { IReview } from "../types"
import { ChangeEvent, useState } from "react";
import PaginationFunctions from "../utils/PaginationFunctions";

interface Props {
    sortReviews: Array<IReview>;
    country: string;
    showReviews: boolean | null;
}

function PaginationReviews({sortReviews, country, showReviews}: Props) {
    const [onPage, setOnPage] = useState(1);
    let number = 0;

  
    // Pagination logic
    const handlePagination = (e: ChangeEvent<unknown>, p: number) => {
        dataPage.skip(p);
        setOnPage(p);
    }

    const elementsPerPage = 3; // How many commits to show on each page in the pagination
    const numberOfPages = Math.ceil(sortReviews.length / elementsPerPage); // How many pages to display in the pagination bar
    const dataPage = PaginationFunctions(sortReviews, elementsPerPage); // What data to display in the pagination

    return (
        <>
        {showReviews ? <Typography>Nobody has reviewed {country} yet</Typography> :
            <Accordion sx={{ width: '100%' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Reviews of {country}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {dataPage.dataDisplaying().map((row: IReview) => (
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
                    <Grid item md={4} sx={{ display: 'flex', flexDirection: 'row', width: "100%", justifyContent: { xs: 'start', sm: 'start', md: 'end' } }}>
                        <Typography color='gray' align="right" sx={{ fontSize: "14px" }}>
                        {new Date(row.Date).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography>
                    </Grid>
                    {row.ReviewText.length == 0 ? <></>
                        : <Grid item xs={12}>
                        <Typography align="left">{row.ReviewText}</Typography>
                        </Grid>}
                    </Grid>
                </Paper>
                ))}
            </AccordionDetails>
            {sortReviews.length > 3 ?
            <Stack alignItems='center'>
                <Pagination
                    count={numberOfPages}
                    variant='outlined'
                    page={onPage}
                    size="small"
                    onChange={handlePagination}
                    className="pagination"
                    aria-details="Pagination to see reviews"
                />
                <Typography variant="body1" sx={{m: '10px'}}>{onPage} of {numberOfPages}</Typography>
            </Stack> : <></>}
            </Accordion>}
        </>
    );
}
export default PaginationReviews;