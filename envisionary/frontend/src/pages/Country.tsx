import '../App.css'
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import PopulationChart from '../components/PopulationChart';

function Country() {
  const location = useLocation()
  // console.log(location)

  return (
    <Card sx={{m: '3%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', p: 3}}>
      <Typography variant="h3" sx={{m: 2}}>{location.state.country.Country}</Typography>
      <Box sx={{width: '45vw', height: '25vw', border: 1}}><PopulationChart /></Box>
      <Container sx={{width: '45vw', display: 'flex', flexDirection: 'row', m: 4}}>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Typography variant="overline">Population rank: {location.state.country.Rank}</Typography>
          <Typography variant="overline">Country code: {location.state.country.CCA3}</Typography>
          <Typography variant="overline">Capital: {location.state.country.Capital}</Typography>
          <Typography variant="overline">Continent: {location.state.country.Continent}</Typography>
        </Container>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Typography variant="overline">Area: {parseInt(location.state.country.Area).toLocaleString()} km&#178;</Typography>
          <Typography variant="overline">Density: {location.state.country.Density} per km&#178;</Typography>
          <Typography variant="overline">GDP growth rate: {location.state.country.GrowthRate}</Typography>
          <Typography variant="overline" align='left'>Percentage of world population: {location.state.country.WorldPopulationPercentage}%</Typography>
        </Container>
      </Container>
    </Card>
  );
}

export default Country;
