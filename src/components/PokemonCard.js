import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getCardColor } from "./CardBackgroundColor";
import { Link } from "react-router-dom";

const StyledCardMedia = styled(CardMedia)({
  margin: "auto",
  width: "130px",
  height: "130px",
});

const StyledCardContent = styled(CardContent)({
  textAlign: "center",
});

const LinkStyle = styled(Link)({
  textDecoration: "none",
  color: "white",
});

export default function PokemonCard(props) {
  const { pokemon, image } = props;
  const { id, name, nickname } = pokemon;

  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const cardBackgroundColor = async () => {
      const color = await getCardColor(image);
      if (color) {
        setColor(color);
      }
    };
    cardBackgroundColor();
  }, [image]);

  const handleReleaseClick = (nameToRemove, idToRemove) => {
    const savedPokemon = JSON.parse(localStorage.getItem("myPokemon")) || [];
    const updatedPokemon = savedPokemon.filter((pokemon) => pokemon.name != nameToRemove && pokemon.id != idToRemove);
    localStorage.setItem("myPokemon", JSON.stringify(updatedPokemon));
    alert(`${nameToRemove} has been released!`);
    window.location.reload();
  };

  return (
    <>
      {!nickname ? (
        <Grid item xs={12} sm={2} key={id}>
          <LinkStyle to={"/pokemon/" + id}>
            <Card
              sx={{
                cursor: "pointer",
                backgroundColor: color,
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(90, 90, 90)",
                },
              }}
            >
              <StyledCardMedia image={image}></StyledCardMedia>
              <StyledCardContent>
                <Typography variant="h6">{nickname ? nickname : name}</Typography>
              </StyledCardContent>
            </Card>
          </LinkStyle>
        </Grid>
      ) : (
        <Grid item xs={12} sm={2} key={id} padding={0} margin={0}>
          <Card
            sx={{
              backgroundColor: color,
              color: "white"
            }}
          >
            <StyledCardMedia image={image}></StyledCardMedia>
            <StyledCardContent>
              <Typography variant="h6">{nickname ? nickname : name}</Typography>
            </StyledCardContent>
          </Card>
          {nickname && (
            <Button variant="contained" color="secondary" size="small" onClick={() => handleReleaseClick(name, id)}>
              Release
            </Button>
          )}
        </Grid>
      )}
    </>
  );
}
