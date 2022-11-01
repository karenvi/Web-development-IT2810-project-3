import { Card, Box, Typography } from "@mui/material";

export const cardStyling = { m: '3%', width: { xs: '70%', sm: '60%', lg: '50%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 5, mb: '200px' }


function InfoPage() {

  return (
    <Card component="main" sx={cardStyling}>
      <Box sx={{textAlign: "left", m: 2}}>
        <Typography>ABOUT US</Typography>
        <Typography component="h1" variant="h4">Envision the world through the eyes of a traveller</Typography>
        <br></br>
        Humans are only given a limited amount of time to explore and experience the world. How can we spend that time wisely?
        <br></br> <br></br>
        At Envisionary, we believe that travellers should travel <Box sx={{fontStyle:"italic", display: "inline"}}>knowingly</Box>. <br></br>
        We therefore aim to facilitate the exchange of knowledge and experience between travellers.
        <br></br><br></br>
        Our concept is simple: search for the countries you are interested in and read the experiences of other travellers. <br></br>
        And if you want to enlighten other envisionaries: review the countries you have been to.
        <br></br><br></br>
        Envisionaries know that informed choices are better choices. Safe travels!
        <br></br><br></br>
        <b>- Team Envisionary</b>
      </Box>
    </Card>
  );
}

export default InfoPage;
