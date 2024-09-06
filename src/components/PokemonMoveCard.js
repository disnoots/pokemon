import { Card, CardContent, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";


const StyledCardContent = styled(CardContent)({
  textAlign: "center",
  backgroundColor: "rgb(68, 68, 68)"
});


export default function PokemonMoveCard(props) {
  const { name } = props;

  return (
    <Grid item xs={12} sm={2} key={name}>
      <Card>
        <StyledCardContent>
          <Typography variant="h6" color={"white"}>{name}</Typography>
        </StyledCardContent>
      </Card>
    </Grid>
  );
}
