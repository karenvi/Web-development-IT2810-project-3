import '../App.css'
import Card from '@mui/material/Card';
import { Autocomplete, Button, Rating, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { ICountry } from '../components/CountriesQuery'

function GiveReview() {
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [validForm, setValidForm] = useState<validForm>({validCountry: false, validAuthor: false, validReviewText: false});
  const [errors, setErrors] = useState<errors>({countryError: " ", nameError: " ", reviewTextError: " "});

  interface validForm {
    validCountry: boolean,
    validAuthor: boolean,
    validReviewText: boolean
  }

  interface errors {
    countryError: string,
    nameError: string,
    reviewTextError: string
  }

  // TODO: Move queries to its own file for more tidy code
  const getCountryNames = gql`query getCountryNames {
    countries {
      _id,
      Country
    }
  }`;

  const { loading, error, data } = useQuery(getCountryNames);

  let countryNames: Array<{ label: string }> = [];

  const getCountries = () => {
    if (loading) return [{ label: "Loading available countries ... " }];
    if (error) return [{ label: "Could not find any countries to review" }];

    data.countries.map((country: ICountry) => { // TODO: make interface for country instead of any
      if (country.Country !== null) { // some countries currently have null values. Do not include them
        countryNames.push({ label: country.Country })
      }
    })
    return countryNames;
  };

  // TODO: Move me to query file
  const addReviewMutation = gql`mutation AddReview($country: String, $name: String, $reviewText: String, $date: String, $rating: Float) {
    addReview(Country: $country, Name: $name, ReviewText: $reviewText, Date: $date, Rating: $rating) {
      Name
      ReviewText
      Date
      Rating
    }
  }`;

  // Write code for adding the review to the database here
  const [addReview] = useMutation(addReviewMutation);

  

  const validateCountry = (countryName: string) => {
    const countries = data.countries.filter((country: ICountry) => country.Country == countryName)
    if (countryName === "") {
      setValidForm({...validForm, validCountry: true})
      setErrors({...errors, countryError: "Empty field."})
    } else if (countries.length == 0){
      setValidForm({...validForm, validCountry: true})
      setErrors({...errors, countryError: "Country doesn't exist."})
    } else {
      setValidForm({...validForm, validCountry: false})
      setErrors({...errors, countryError: " "})
    }
  }

  const validateName = (name: string) => {
    if (name === "") {
      setValidForm({...validForm, validAuthor: true})
      setErrors({...errors, nameError: "Empty field."})
    } else {
      setValidForm({...validForm, validAuthor: false})
      setErrors({...errors, nameError: " "})
    }
  }

  const validateReviewText = (reviewText: string) => {
    if (reviewText === "") {
      setValidForm({...validForm, validReviewText: true})
      setErrors({...errors, reviewTextError: "Empty field."})
    } else {
      setValidForm({...validForm, validReviewText: false})
      setErrors({...errors, reviewTextError: " "})
    }
  }


  const submit = () => {

    // if (isFormValid()){
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
      setCountry(""); // TODO: this does nothing, ideally we want to unselect country in dropdown too
      setAuthor("");
      setReviewText("");
      setRating(0);
  // }

  }

  const reviewHeaderStyling = { mt: 3, fontSize: '18px' }

  // TODO: Tilbakemelding til brukeren ved feil input
  return (
    <Card sx={{
      m: '3%', width: '50%', maxWidth: 700, display: 'flex', justifyContent: 'center',
      alignItems: 'center', p: 6
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="h4">Give review</Typography>
        <Typography variant="h6" sx={reviewHeaderStyling}>Choose a country</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={getCountries()}
          sx={{ width: 250 }}
          inputValue={country}
          onInputChange={(event, newInputValue) => {
            setCountry(newInputValue);
            console.log([newInputValue, rating, author, reviewText]); // TODO: Remove this when development is done
          }}
          renderInput={(params) => 
            <TextField 
              {...params} 
              label="" 
              placeholder="Country" 
              required={true}
              error={validForm.validCountry}
              onBlur={(e) => validateCountry(e.target.value)}
              helperText={errors.countryError}
            />}
          isOptionEqualToValue={(option, value) => option.label === value.label}
        />

        <Typography variant="h6" sx={reviewHeaderStyling}>Name</Typography>
        <TextField id="outlined-basic"
          required
          label=""
          placeholder="Name"
          variant="outlined"
          value={author}
          error={validForm.validAuthor}
          onBlur={(e) => validateName(e.target.value)}
          helperText={errors.nameError}
          // onChange={(e) => setAuthor(e.target.value)}
        />

        <Typography variant="h6" sx={reviewHeaderStyling}>Rating</Typography>
        <Rating
          name="hover-feedback"
          value={rating}
          precision={0.5}
          // getLabelText={getLabelText}
          onChange={(event, newValue) => {
            newValue === null ? setRating(0) : setRating(newValue);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />

        <Typography variant="h6" sx={reviewHeaderStyling}>Review Content</Typography>
        <TextField
          id="outlined-multiline-static"
          label=""
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
            // country && addReview({
            //   variables:
            //   {
            //     country: country,
            //     name: author,
            //     reviewText: reviewText,
            //     date: new Date().toISOString(),
            //     rating: rating
            //   }
            // });
            
          }}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
}

export default GiveReview;
