import '../App.css'
import Card from '@mui/material/Card';
import { Alert, Autocomplete, Button, Rating, Snackbar, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COUNTRY_NAMES } from "../graphql/queries";
import { ADD_REVIEW } from "../graphql/mutations"
import { ICountry } from "../types";


function GiveReview() {
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [notValidForm, setNotValidForm] = useState<{country: boolean, author: boolean}>({country: false, author: false});
  const [errors, setErrors] = useState<{countryError: string, authorError: string}>({countryError: " ", authorError: " "});
  const [clear, setClear] = useState("false")
  const [open, setOpen] = useState(false)

  const { loading, error, data } = useQuery(GET_COUNTRY_NAMES);

  let countryNames: Array<{ label: string }> = [];

  const getCountryNames = () => {
    if (loading) return [{ label: "Loading available countries ... " }];
    if (error) return [{ label: "Could not find any countries to review" }];

    data.countries.map((country: ICountry) => {
      if (country.Country !== null) { // some countries might have null values. Do not include them
        countryNames.push({ label: country.Country })
      }
    })
    return countryNames;
  };

  // Use ADD_REVIEW mutation to add review to database
  const [addReview] = useMutation(ADD_REVIEW);

  const validation = () => {
    if (country !== "" && author !== "") {
      setNotValidForm({country: false, author: false})
      setErrors({countryError: " ", authorError: " "})
      return true
    } else if (country !== "" && author === ""){
      setNotValidForm({country: false, author: true})
      setErrors({countryError: " ", authorError: "Name is required"})
      return false
    } else if (country === "" && author !== "") {
      setNotValidForm({country: true, author: false})
      setErrors({countryError: "Country is required", authorError: " "})
      return false
    } else {
      setNotValidForm({country: true, author: true})
      setErrors({countryError: "Country is required", authorError: "Name is required"})
      return false
    }
  }

  const submit = () => {
    if (validation()){
      addReview({ 
        variables:
        {
          country: country,
          name: author,
          reviewText: reviewText,
          date: new Date().toISOString(),
          rating: rating
        }
      });
      setOpen(true) // Opens the success alert.

      setAuthor("");
      setReviewText("");
      setRating(0);

      // Clears the country field
      if (clear === "false") {
        setClear("true")
      } else {
        setClear("false")
      }
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const reviewHeaderStyling = { mt: 3, fontSize: '18px' }

  return (
    <Card component="main" sx={{
      m: '3%', width: {xs: '70%', sm: '50%'}, maxWidth: "700px", mb: "200px", display: 'flex', justifyContent: 'center',
      alignItems: 'center', p: 6
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="h4">Give review</Typography>
        <Typography variant="h6" sx={reviewHeaderStyling}>Choose a country *</Typography>
        <Autocomplete
          disablePortal
          id="country-box"
          options={getCountryNames()}
          sx={{ width: 250 }}
          key={clear}
          inputValue={country}
          onInputChange={(event, newInputValue) => {
              setCountry(newInputValue);
          }}
          renderInput={(params) => 
            <TextField 
              {...params} 
              label=""
              aria-label="CountryName"
              placeholder="Country" 
              required={true}
              error={notValidForm.country}
              helperText={errors.countryError}
            />}
          isOptionEqualToValue={(option, value) => option.label === value.label}
        />

        <Typography variant="h6" sx={{mt: 1, fontSize: '18px'}}>Name *</Typography>
        <TextField id="name-field"
          required
          label=""
          aria-label="Name"
          placeholder="Name"
          variant="outlined"
          value={author}
          error={notValidForm.author}
          helperText={errors.authorError}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <Typography variant="h6" sx={{mt: 1, fontSize: '18px'}}>Rating</Typography>
        <Rating
          name="hover-feedback"
          aria-label="Rating"
          value={rating}
          precision={0.5}
          onChange={(event, newValue) => {
            newValue === null ? setRating(0) : setRating(newValue);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />

        <Typography variant="h6" sx={reviewHeaderStyling}>Review Content</Typography>
        <TextField
          id="review-content-field"
          label=""
          aria-label="Review content"
          placeholder="Write your review..."
          multiline
          rows={7}
          sx={{ width: '50vw', maxWidth: 500 }}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <Button variant="contained"
          sx={{ backgroundColor: '#172A3A', '&:hover': { backgroundColor: '#172A3A' }, mt: 3, mb: 2 }}
          onClick={(event) => {
            event.preventDefault();
            submit()
          }}
        >
          Submit
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Review successfully given!
          </Alert>
        </Snackbar>
      </Box>
    </Card>
  );
}

export default GiveReview;
