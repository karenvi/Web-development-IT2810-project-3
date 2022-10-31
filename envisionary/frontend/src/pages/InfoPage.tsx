import { Card } from "@mui/material";

export const cardStyling = { m: '3%', width: {xs: '70%', sm: '60%', lg:'50%'}, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 5, mb: '200px'}


function InfoPage() {

  return (
    <Card sx={cardStyling}>
      Information!
    </Card>
  );
}

export default InfoPage;
