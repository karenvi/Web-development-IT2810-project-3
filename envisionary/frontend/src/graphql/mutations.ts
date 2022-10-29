import { gql } from "@apollo/client";

// Mutation for adding a new review to a chosen country
export const ADD_REVIEW = gql`
mutation AddReview($country: String, $name: String, $reviewText: String, $date: String, $rating: Float) {
addReview(Country: $country, Name: $name, ReviewText: $reviewText, Date: $date, Rating: $rating) {
    Reviews {
    Name,
    ReviewText,
    Date,
    Rating
    }
}
}`;