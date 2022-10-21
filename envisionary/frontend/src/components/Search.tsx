import { Button, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { searchQueryState } from "../states/states";

const Search = () => {
    return (
        <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden">Search countries by name</span>
            </label>
        <TextField  
            label="Search" 
            variant="outlined"
            type="text"
            id="header-search"
            name="s"
            />
            <Button type="submit">SEARCH!!</Button>
        </form>
    );
}

export default Search;