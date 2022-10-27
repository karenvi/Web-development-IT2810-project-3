import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { categoryState, searchQueryState } from '../states/states';
import { useNavigate } from 'react-router-dom';

function UserInput () {
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const history = useNavigate();
  const labelSearch = "Search after " + category.toLowerCase();

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  // To ensure that the SPA requirement is achieved in the search (doesnt change url on search)
  async function onSubmit(event: any) {
    history(`?=${searchQuery}`, { replace: true });
    event.preventDefault();
  }

  return (
    <Box
      sx={{
         m: 5, p: '35px', width: '40%', maxWidth: '450px', minWidth: '330px', backgroundColor: 'white', display: 'flex', justifyContent: 'center',
         boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
         borderRadius: '10px'
      }}
    >
    <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
      <label htmlFor="header-search">
        <span className="visually-hidden">Search by {category.toLowerCase()}</span>
      </label>
      <TextField  
      label={labelSearch} 
      variant="outlined"
      type="text"
      id="header-search"
      name="s"
      value={searchQuery}
      onInput={e => setSearchQuery((e.target as HTMLInputElement).value)}
      />
    </form>
      <FormControl fullWidth sx={{width: '150px', ml: "10px"}}>
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
        </Select>
      </FormControl>
    </Box>
  )
}
export default UserInput