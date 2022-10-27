import '../App.css'
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Rating, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Reviews from '../components/Reviews';
import PopulationChart from '../components/PopulationChart';
import StarIcon from '@mui/icons-material/Star';

function Country() {
  const location = useLocation()

  return (
    <Card sx={{m: '3%', width: '50%', minWidth: '520px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', p: 5}}>
      <Typography variant="h3" sx={{m: 2}}>{location.state.country.Country}</Typography>
      <Box sx={{width: '45vw', minWidth: '500px', height: '30vw', minHeight: '350px'}}><PopulationChart /></Box>
      <Container sx={{width: '670px', display: 'flex', flexDirection: 'column', m: 4, alignItems: 'flex-start'}}>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', px: '48px', mb: 1}}>
          <Rating name="read-only" value={3.5 /* Putt averagerating her*/} precision={0.5} readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Typography variant="overline" sx={{ml: 1}}>3.5 {/* Putt averagerating her*/}</Typography>
        </Box>
        <Container sx={{display: 'flex', flexDirection: 'row'}}>
          <Container sx={{width: '220px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <Typography variant="overline">Population rank: {location.state.country.Rank}</Typography>
            <Typography variant="overline">Country code: {location.state.country.CCA3}</Typography>
            <Typography variant="overline">Capital: {location.state.country.Capital}</Typography>
            <Typography variant="overline" align='left'>Continent: {location.state.country.Continent}</Typography>
          </Container>
          <Container sx={{width: '350px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <Typography variant="overline">Area: {parseInt(location.state.country.Area).toLocaleString()} km&#178;</Typography>
            <Typography variant="overline">Density: {location.state.country.Density} per km&#178;</Typography>
            <Typography variant="overline">GDP growth rate: {location.state.country.GrowthRate}</Typography>
            <Typography variant="overline" align='left'>Percentage of world population: {location.state.country.WorldPopulationPercentage}%</Typography>
          </Container>
        </Container>
      </Container>
      <Reviews/>
    </Card>
  );
}

export default Country;
