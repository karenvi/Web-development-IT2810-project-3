import '../App.css'
import Card from '@mui/material/Card';
import { Autocomplete, Rating, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Box, Container } from '@mui/system';
import { useState } from 'react';

function GiveReview() {
  const [value, setValue] = useState<number | null>(0);

  const getCountries = () => [
    {label: 'Algeria', CCA3: 'DZA'},
    {label: 'Norway', CCA3: 'NOR'},
  ]

  return (
    <Card sx={{m: '3%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', p: 3}}>
      <Typography variant="h3" sx={{m: 2}}>Give review</Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={getCountries()}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        // getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <TextField
          id="outlined-multiline-static"
          label=""
          placeholder="Write your review..."
          multiline
          rows={4}
        />

    </Card>
  );
}

export default GiveReview;
