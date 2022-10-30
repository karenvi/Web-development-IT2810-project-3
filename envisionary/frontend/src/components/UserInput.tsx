import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { categoryState, searchQueryState } from '../states/states';

// This component takes in a search query from user and what category the user has picked to search in.
function UserInput() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  const labelSearch = "Search after " + category.toLowerCase();
  
  return (
      <Box
        sx={{
          m: 5, p: '35px', width: '40%', maxWidth: '450px', minWidth: '330px', backgroundColor: 'white', display: 'flex', justifyContent: 'center',
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
          borderRadius: '10px'
        }}
      >
        <form>
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
        <FormControl fullWidth sx={{ width: '150px', ml: "10px" }}>
          <InputLabel id="demo-simple-select-label">Category:</InputLabel>
          <label htmlFor="header-search">
            <span className="visually-hidden">Select what to search category to search in</span>
          </label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category:"
            onChange={(e) => { setCategory(e.target.value as string)}}
          >
            <MenuItem value='Country'>Country</MenuItem>
            <MenuItem value='Continent'>Continent</MenuItem>
          </Select>
        </FormControl>
      </Box>
  )
}
export default UserInput;