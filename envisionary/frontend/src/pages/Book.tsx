import Books from '../components/Books';
import '../App.css'
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

function Book() {
  const location = useLocation()
  // console.log(location)

  const infoStyling = {

  }

  return (
    <Card sx={{m: '3%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', p: 3}}>
      <Typography variant="h3" sx={{m: 2}}>
        {location.state.Country}
      </Typography>
      <Box sx={{width: '45vw', height: '25vw', border: 1}}>Graph</Box>
      <Container sx={{width: '45vw', display: 'flex', flexDirection: 'row', m: 4}}>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Typography variant="overline">Population rank: {location.state.Rank}</Typography>
          <Typography variant="overline">Capital: {location.state.Capital}</Typography>
          <Typography variant="overline">Continent: {location.state.Continent}</Typography>
          <Typography variant="overline">Area: {location.state.Area} km&#178;</Typography>
        </Container>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Typography variant="overline">Density: {location.state.Density} per km&#178;</Typography>
          <Typography variant="overline">GDP growth rate: {location.state.GrowthRate}</Typography>
          <Typography variant="overline" align='left'>Percentage of world population: {location.state.WorldPopulationPercentage}%</Typography>
        </Container>
      </Container>
    </Card>
  );
}

export default Book;
