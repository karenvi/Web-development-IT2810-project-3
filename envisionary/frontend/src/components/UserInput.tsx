import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useState } from 'react';

function UserInput () {
  const [category, setCategory] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <Box
      component="form"
      sx={{
         m: 5, p: '35px', width: '45%', maxWidth: '500px', backgroundColor: 'white', display: 'flex', justifyContent: 'center',
         boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
         borderRadius: '10px'
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search" variant="outlined" />
      <FormControl fullWidth sx={{width: '150px'}}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value='Country'>Country</MenuItem>
          <MenuItem value='Continent'>Continent</MenuItem>
          <MenuItem value='Population'>Population</MenuItem>
          <MenuItem value='Area'>Area</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" sx={{backgroundColor: '#172A3A', '&:hover': {backgroundColor: '#172A3A'}}}>
        Search
      </Button>
    </Box>
  )
}
export default UserInput